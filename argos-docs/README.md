---
description: >-
  How we can remove the Site structure page and make implicit from the content,
  and not through an explicit form.
icon: list-tree
---

# Site structure research

### tl;dr

* De aparte Site Structure-instellingenpagina kan verdwijnen.
* De content tree in de editor wordt de primaire interface voor structuurwijzigingen.
* De bestaande API ondersteunt bijna alle handelingen, maar schrijft direct naar de live site.
* De site-wide CR RFC bevestigt dat site structure een zelfstandig, immutable CR-member moet worden.
* PR #24643 en #24644 leveren het SQL-model en gedeelde create/read/member-operaties, maar nog niet de structure-snapshot store, editor mutations, diff-, rebase- en mergeflow.
* Het bestaande `docs.yaml`-model en de site-config diff-engine zijn een sterke basis, maar missen enkele productie-eigenschappen.

### Context uit de RFC en bestaande PR's

Deze analyse neemt de volgende documenten als uitgangspunt:

* [RFC: Site-wide and multi-content change requests](https://github.com/GitbookIO/gitbook-x/blob/bc758b4142a94517e60173aa8ee1b7ba71b9997b/docs/architecture/site-wide-change-requests-rfc.md#L4)
* [PR #24643: Add site change request schema foundation](https://github.com/GitbookIO/gitbook-x/pull/24643)
* [PR #24644: Add shared site change request operations](https://github.com/GitbookIO/gitbook-x/pull/24644)

De RFC definieert een site-wide Change Request als een reviewobject met meerdere onafhankelijk versioneerbare members:

```
Site Change Request
├── Site structure
├── Space A content
└── Space B content
```

Daarbij geldt:

* De site member verwijst naar een immutable site-structure snapshot.
* Space members verwijzen naar contentrevisies op een gedeelde Hive branch identity.
* De CR heeft een aggregate version.
* Een verandering aan een member kan bestaande approvals voor de volledige CR ongeldig maken.
* Updates, rebases en merges over meerdere members moeten durable, retryable en herstelbaar zijn.
* SQL, Hive en site-structure storage hoeven niet een fysieke transactie te delen.
* De app mag de CR pas als volledig bijgewerkt of merged presenteren nadat alle vereiste stappen zijn afgerond.

Dit past goed bij het ontwerpprincipe dat site structure impliciet uit editorhandelingen ontstaat.

De RFC schrijft wel over een aparte "site structure editor" binnen de CR. Voor de nieuwe UX hoeft dat geen instellingenpagina te betekenen. De reguliere editor en content tree kunnen de structure editor zijn, terwijl de reviewmodus een gefocuste structure diff toont.

### Hoofdconclusie

Het ontwerpdoel is haalbaar, met deze definitie:

> Impliciet betekent dat structuur ontstaat tijdens het organiseren van content. Het betekent niet dat iedere structurele eigenschap automatisch kan worden afgeleid.

Reorder, nesting, toevoegen en verwijderen kunnen natuurlijke editorhandelingen zijn.

Home-status, zichtbaarheid, audiences, slugs en custom home pages blijven expliciete eigenschappen. Die horen als contextuele controls naast het betreffende item te staan, niet op een aparte Site Structure-pagina.

Een drag-and-drop actie moet direct worden opgeslagen in de head-state van `Docs changes`, niet direct in de live site:

```
User dragt "API" boven "Guides"
        |
        v
Site structure head snapshot wordt bijgewerkt
        |
        v
CR aggregate version wordt verhoogd
        |
        v
Diff toont: "API moved before Guides"
        |
        v
Live site blijft ongewijzigd tot merge
```

### Volledige functiematrix

Legenda:

* **Ja**: de huidige backend kan dit al op de live site uitvoeren.
* **Deels**: de API bestaat, maar de operatie is niet atomair, niet CR-aware of niet volledig Git-representeerbaar.
* **Nee**: de benodigde CR- of Git-functionaliteit ontbreekt.

| Functionaliteit                        | Huidige API en schema                                                                                | API/backend-verdict                                                                                      | UX in de editor                                                                                                | Git- en CR-verdict                                                                                                               |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Structuur laden                        | `getSiteStructure` met `SiteStructure`, `SiteSection`, `SiteSectionGroup` en `SiteSpace`             | Live: ja. CR: een snapshot read-model ontbreekt nog                                                      | De content tree wordt de zichtbare representatie van de site structure                                         | Goed bruikbaar als basis voor een immutable base/head snapshot                                                                   |
| Flat site versus sections              | `SiteStructure` is een union van root `siteSpaces` of een `sections`-boom                            | Live: ja, maar de vorm ontstaat indirect uit mutations                                                   | Geen expliciete layoutmodus. Een eerste section of group toevoegen verandert de structuur impliciet            | Ondersteund door de boomstructuur. Validatie moet voorkomen dat root spaces en sections ongeldig gemengd worden                  |
| Items reorderen                        | `sites.sortSiteStructure` met item en relatieve `before`/`after` positie                             | Live: ja. CR-scoped variant ontbreekt                                                                    | Direct afleiden uit drag-and-drop in de editor                                                                 | Volledig representeerbaar door de volgorde van nodes in de site-config                                                           |
| Section naar group of root verplaatsen | `siteSections.updateSiteSectionById({ siteSectionGroupId })`                                         | Live: ja. Bulk moves gebruiken meerdere calls                                                            | Drag een section op een group of terug naar root                                                               | Volledig representeerbaar door parent-child nesting                                                                              |
| Groups maken                           | `siteSectionGroups.addSectionGroupToSite`                                                            | Live: ja                                                                                                 | Group ontstaat via "New group" of door geselecteerde sections te groeperen                                     | Ondersteund met stable key, titel, icon, draft en children                                                                       |
| Groups nesten                          | Parent group bij het aanmaken van een section group                                                  | Live: ja, tot een genest groupniveau                                                                     | Drag een group in een andere group waar dit geldig is                                                          | Ondersteund, inclusief validatie van de maximale nesting                                                                         |
| Group metadata                         | `updateSiteSectionGroupById` met `title`, `localizedTitle`, `icon` en `draft`                        | Live: ja                                                                                                 | Inline rename en item-inspector                                                                                | Ondersteund in het Git-schema                                                                                                    |
| Section maken                          | `siteSections.addSectionToSite`                                                                      | Deels: aanmaken, custom root page en synchroniseren van de Space-titel bestaan uit meerdere browsercalls | "New section" of content naar een nieuwe section slepen                                                        | Structuur wordt ondersteund. `section.draft` ontbreekt in het huidige Git-schema                                                 |
| Section metadata                       | `updateSiteSectionById` met titel, localized title, description, localized description, icon en path | Live: ja                                                                                                 | Inline titel, met overige eigenschappen in een compacte item-inspector                                         | Vrijwel volledig ondersteund                                                                                                     |
| Variant toevoegen                      | `siteSpaces.addSpaceToSite`                                                                          | Live: ja. Titelcustomization gebeurt als aparte call                                                     | Space naar een section slepen of "Add variant" gebruiken                                                       | Een nieuwe structure node wordt ondersteund, maar een specifieke bestaande `spaceId` is niet volledig uitdrukbaar in `docs.yaml` |
| Nieuwe Space maken tijdens toevoegen   | Space creation gevolgd door `addSpaceToSite`                                                         | Deels: dit raakt meerdere resources en API's                                                             | "New content" vanuit de content tree                                                                           | Vereist een space member als de content binnen dezelfde CR wordt gemaakt of gewijzigd                                            |
| Titel van een variant                  | `overrideSiteSpaceCustomizationById` met `title` en `localizedTitle`                                 | Live: ja                                                                                                 | Initiële titel afleiden van Space of page, daarna inline rename                                                | Ondersteund door de titelvelden van een Git site-space node                                                                      |
| Content van een variant vervangen      | `updateSiteSpaceById({ spaceId, pageId })`                                                           | Live: ja, met aanvullende Git Sync side-effects                                                          | Expliciete "Replace content"-actie met bevestiging                                                             | Niet volledig ondersteund voor het aanwijzen van een arbitraire bestaande GitBook Space                                          |
| Custom home page                       | `updateSiteSpaceById({ pageId })`                                                                    | Live: ja                                                                                                 | "Use as section home" of "Use as variant home" vanuit page-actions of de inspector                             | Niet ondersteund: `pageId` ontbreekt in het huidige Git-schema                                                                   |
| Section of variant slug                | `updateSiteSectionById({ path })` en `updateSiteSpaceById({ path })`                                 | Live: ja, inclusief bestaande URL-conflictresolutie                                                      | Initieel afleiden van titel. Daarna expliciet bewerkbaar, want rename mag een bestaande URL niet stil wijzigen | Ondersteund                                                                                                                      |
| Default section                        | `sites.updateSiteById({ defaultSiteSection })`                                                       | Live: ja                                                                                                 | Expliciete "Set as home"-actie op de section                                                                   | Ondersteund via `default: true`                                                                                                  |
| Default variant                        | `updateSiteSectionById({ defaultSiteSpace })` of `sites.updateSiteById({ defaultSiteSpace })`        | Live: ja                                                                                                 | Expliciete "Set as home"-actie op de variant                                                                   | Ondersteund via `default: true`                                                                                                  |
| Tonen in navigatie                     | `updateSiteSpaceById({ hidden })`                                                                    | Live: ja                                                                                                 | Expliciete "Show in navigation"-toggle                                                                         | Ondersteund via `hidden`                                                                                                         |
| Structureel draft/live                 | Group-, section- en site-space updates met `{ draft }`                                               | Deels: een single-variant section gebruikt twee calls met handmatige rollback                            | Niet verwarren met CR-status. Alleen behouden als expliciete eigenschap zoals "Include on published site"      | Group en Space zijn ondersteund. Section draft ontbreekt                                                                         |
| Adaptive content op section            | `updateSiteSectionById({ condition })`                                                               | Live: ja                                                                                                 | Expliciete audience-control op de section                                                                      | Ondersteund                                                                                                                      |
| Adaptive content op variant            | `updateSiteSpaceById({ condition })`                                                                 | Live: ja                                                                                                 | Expliciete audience-control op de variant                                                                      | Ondersteund                                                                                                                      |
| Taal                                   | `spaces.updateSpaceById({ language })`                                                               | Live: ja, maar dit muteert de onderliggende Space                                                        | Taal hoort bij de variant of content, niet bij een globale settingspagina                                      | Ondersteund via `content.language`, maar de Space-impact moet als member-impact zichtbaar zijn                                   |
| Section uit een group halen            | `updateSiteSectionById({ siteSectionGroupId: null })`                                                | Live: ja                                                                                                 | Drag naar root of "Move to root"                                                                               | Ondersteund door een gewijzigde parent                                                                                           |
| Group verwijderen                      | `deleteSiteSectionGroupById`                                                                         | Live: ja. Onderliggende sections blijven bestaan                                                         | "Remove group", met uitleg dat sections behouden blijven                                                       | Ondersteund als delete van de group node plus parent changes voor children                                                       |
| Section verwijderen                    | `deleteSiteSectionById`                                                                              | Live: ja                                                                                                 | "Remove section", met uitleg wat er met gekoppelde variants gebeurt                                            | Ondersteund als delete van de section node en bijbehorende structure changes                                                     |
| Variant unlinken                       | `deleteSiteSpaceById`                                                                                | Live: ja                                                                                                 | "Remove from site". Duidelijk onderscheiden van het verwijderen van de Space en content                        | Ondersteund als delete van de site-space node                                                                                    |
| Bulk remove                            | Meerdere section-, group- en site-space delete calls                                                 | Deels: niet atomair                                                                                      | Multiselect met een structure change in de UI                                                                  | Moet een durable CR-operation en een aggregate version update worden                                                             |
| Git Sync overname bij linken           | Side-effect van `updateSiteSpaceById({ spaceId })`                                                   | Ondersteund, maar complex                                                                                | De bestaande waarschuwing behouden bij add en replace                                                          | Repository- en directorymapping moeten tijdens preflight en merge gevalideerd worden                                             |
| Permissions en plans                   | Site admin-permission, Space-permissions, Sites Sections-plan en feature flags                       | Bestaand voor live mutations                                                                             | Dezelfde restrictions toepassen op inline actions                                                              | De RFC vereist toegang tot target en alle actieve members                                                                        |
| Open published item                    | Geen mutation, gebruikt gepubliceerde URL                                                            | Ja                                                                                                       | Blijft een item-action                                                                                         | Geen CR- of Git-impact                                                                                                           |
| Expand, collapse en selectie           | Lokale UI-state                                                                                      | Ja                                                                                                       | Blijft lokale editor-state                                                                                     | Geen CR- of Git-impact                                                                                                           |

### Wat op API- en backendniveau al bestaat

De bestaande productie-API ondersteunt vrijwel alle individuele live site structure mutations:

```
getSiteStructure
sortSiteStructure

addSectionGroupToSite
updateSiteSectionGroupById
deleteSiteSectionGroupById

addSectionToSite
updateSiteSectionById
deleteSiteSectionById

addSpaceToSite
updateSiteSpaceById
deleteSiteSpaceById

updateSiteById
overrideSiteSpaceCustomizationById
updateSpaceById
```

De meeste create-, update- en sort-operaties zijn publieke REST-operaties en ook opgenomen in de MCP-operation surface.

De delete-operaties zijn publieke REST-operaties, maar momenteel niet opgenomen in de MCP-operation surface. Als agents zelfstandig volledige site structure changes moeten kunnen maken, is dat een headless parity-gap.

### Wat de bestaande live API niet kan

De huidige endpoints zijn resource CRUD voor de live site. Ze accepteren geen:

```
changeRequestId
siteMemberId
baseRevisionId
headRevisionId
expectedChangeRequestVersion
idempotencyKey
```

Daardoor schrijft een editoractie vandaag direct naar MySQL.

Na een live structure mutation worden onder andere:

* site caches geïnvalideerd;
* URL-conflicten opgelost;
* analytics bijgewerkt;
* een site config export gestart als Site Git Sync actief is.

Dat model is niet geschikt voor review-first editing. Een actie in `Docs changes` moet alleen de CR-head wijzigen. De live database en externe Git Sync-export mogen pas tijdens of na merge worden bijgewerkt.

### Niet-atomaire productiehandelingen

Verschillende huidige UI-acties bestaan uit meerdere API-calls.

#### Section content vervangen

```
1. Nieuwe site-space koppeling maken
2. Oude site-space koppeling verwijderen
3. Section metadata bijwerken
4. Eventueel custom home page bijwerken
```

#### Variant aanmaken

```
1. Site-space koppeling maken
2. Titelcustomization toepassen
```

#### Single-variant section draft maken

```
1. Section draft maken
2. Site-space draft maken
3. Section terugzetten wanneer stap 2 faalt
```

#### Bulk verwijderen of verplaatsen

```
1. Operatie per geselecteerde node uitvoeren
2. Gedeeltelijk succes is mogelijk als een latere call faalt
```

Voor de nieuwe CR-flow moeten dit samengestelde, durable operaties worden. De gebruiker moet een wijziging zien en de CR aggregate version mag slechts eenmaal stijgen nadat de volledige handeling is afgerond.

### Wat PR #24643 en #24644 al oplossen

#### PR #24643

PR #24643 voegt het core SQL-model toe:

* Een Change Request heeft een immutable `site` of `space` target.
* Een Change Request heeft een target-scoped nummer.
* `change_requests.version` representeert de complete aggregate member-state.
* `change_request_members` kan `space` en `site` members bevatten.
* Members hebben base, head en merged revision- of snapshot-identiteiten.
* Verwijderde members kunnen als tombstone bewaard blijven.

#### PR #24644

PR #24644 voegt gedeelde backendoperaties toe voor:

* Site-wide en standalone-space CR's aanmaken.
* Target-scoped CR-nummers alloceren.
* Change Requests met hun actieve members lezen.
* Members aan een CR koppelen.
* Verwijderde members retry-safe reactiveren.
* Valideren dat targets en members bij dezelfde organisatie horen.
* Een gedeelde Hive branch identity afleiden voor de Space-members.
* De CR-versie eenmaal verhogen na een geslaagde member-reconciliation.
* Een toekomstige Space toestaan die wel bij de organisatie hoort, maar nog niet op de live site staat.

Dit betekent dat er meer bestaat dan alleen database-scaffolding.

Wat nog ontbreekt:

* Een immutable site-structure snapshot store.
* Operaties om een nieuwe head snapshot te maken.
* CR-scoped site structure mutation API's.
* Complete member reconciliation, inclusief verwijderen en gewijzigde head revisions.
* Durable update-, rebase-, merge- en recovery-operaties.
* Publieke target-aware CR API's.
* Site structure diff-, conflict- en mergegedrag.
* Integratie met de editor en review-UI.

### Git-model: wat al goed zit

`docs.yaml` bevat al een canonieke site-config met een geordende boom en stable keys.

De bestaande diff-engine kan semantische operaties afleiden:

```
edit_site
create_node
delete_node
update_node
sort_nodes
```

Dit past direct bij het gewenste model.

Voorbeeld:

```yaml
# Base
structure:
    - key: section-guides
      type: section
    - key: section-api
      type: section
```

Na drag-and-drop:

```yaml
# Head
structure:
    - key: section-api
      type: section
    - key: section-guides
      type: section
```

Reviewrepresentatie:

```
API moved before Guides
```

Stable keys maken het mogelijk om:

* reorders van delete plus recreate te onderscheiden;
* comments aan structurele elementen te koppelen;
* concurrente veranderingen aan hetzelfde item te herkennen;
* history over meerdere CR-versies heen te behouden.

Dit sluit aan op de RFC, die expliciet voorschrijft dat site-structure comments stable element identities gebruiken en niet repositoryregelnummers.

### Gaten in het Git-schema

Het huidige `docs.yaml`-schema representeert nog niet alle productiefunctionaliteit.

#### 1. Section draft ontbreekt

De live `SiteSection` heeft een permanente `draft`-status. `GitSyncSiteStructureSection` heeft dit veld niet.

Beslissing nodig:

* Voeg `draft` toe aan de Git-config.
* Of verwijder permanente section drafts uit het nieuwe productmodel.

Mijn aanbeveling is om de eigenschap alleen te behouden als er een echte use case bestaat voor een section die ook na merge bewust niet gepubliceerd wordt. Noem dit in de UX bijvoorbeeld "Include on published site", zodat het niet wordt verward met de draft-status van de CR.

#### 2. Custom `pageId` ontbreekt

De live API kan een specifieke page binnen een Space als root van de section of variant gebruiken.

Dit is niet aanwezig in het Git-schema.

Benodigd:

```yaml
content:
    directory: guides
    language: en
    page: getting-started
```

Een stabiele page identity of path is waarschijnlijk beter voor Git dan een intern database-ID.

#### 3. Een bestaande Space is niet ondubbelzinnig adresseerbaar

`content.directory` vertelt waar repositorycontent staat, maar wijst niet altijd ondubbelzinnig naar een bestaande GitBook Space.

Voor een nieuwe koppeling vanuit de app is een stabiele Space-reference nodig, bijvoorbeeld:

```yaml
content:
    space: space_abc123
    directory: guides
```

Of een andere identity die zowel app-created als repository-created flows kan ondersteunen.

Deze keuze moet rekening houden met portability. Een intern Space-ID in `docs.yaml` maakt een repository minder makkelijk overdraagbaar tussen organisaties of omgevingen.

### RFC-conform CR-model voor site structure

De site member van een CR verwijst naar immutable snapshots:

```
Site member
├── baseRevisionId
├── headRevisionId
└── mergedRevisionId
```

De snapshot bevat minimaal:

```
Site metadata
Structure nodes
Stable keys
Parent-child relaties
Volgorde
Space membership
Paths
Defaults
Visibility
Draft/live eigenschappen
Audience conditions
Localization
Custom home page mappings
```

De member row bewaart alleen de snapshot identity. De volledige configuratie hoort in een aparte immutable store of artifact.

### Aanbevolen editor write-flow

Een editoractie zoals drag-and-drop wordt:

```
1. Client verstuurt move_node met expected CR version
2. Backend lockt de CR of durable operation
3. Backend leest de huidige head snapshot
4. Backend valideert de volledige voorgestelde structuur
5. Backend schrijft een nieuwe immutable head snapshot
6. Backend wijzigt de site member naar deze head revision
7. Backend verhoogt de aggregate CR version eenmaal
8. Client ontvangt de nieuwe version en semantische diff
```

Een geschikte mutation bevat bijvoorbeeld:

```json
{
    "idempotencyKey": "client-generated-operation-id",
    "expectedVersion": 12,
    "operation": {
        "type": "move_node",
        "nodeKey": "section-api",
        "before": "section-guides"
    }
}
```

Semantische mutations zijn voor interactieve editing beter dan de client telkens een volledige snapshot laten vervangen:

* Minder kans op lost updates.
* Betere history en activity.
* Direct bruikbare menselijke diffs.
* Eenvoudiger conflictinformatie.
* Idempotent retrygedrag.

De backend kan na iedere operatie alsnog een volledige immutable head snapshot opslaan.

### Member reconciliation tijdens structure changes

Een structure change kan invloed hebben op de members van de CR.

#### Bestaande Space aan de site koppelen zonder contentwijziging

* De site member verandert.
* De Space hoeft niet automatisch een content member te worden als zijn content niet verandert.
* De backend moet wel organisatie, permissions en beschikbaarheid valideren.

#### Nieuwe Space met nieuwe content maken

* De site member verandert.
* Een nieuwe Space member wordt toegevoegd.
* De site snapshot en member-set moeten als een durable productoperatie worden bijgewerkt.

#### Gekoppelde Space verwijderen

* De site member verandert.
* Een bestaande Space content member mag niet stil verdwijnen als diezelfde CR nog contentwijzigingen voor de Space bevat.
* De operatie moet expliciet bepalen of de Space member actief blijft of getombstoned wordt.

#### Onderliggende Space vervangen

* De site snapshot wijst naar een andere Space.
* Permissions en Git Sync mapping moeten vooraf worden gecontroleerd.
* Een gewijzigde oude of nieuwe Space kan extra memberreconciliation vereisen.

De RFC vereist dat de voorgestelde structuur en de member-set samen worden gevalideerd voordat ze de huidige aggregate CR-version worden.

### Merge-architectuur

De mergeflow moet de RFC volgen en niet doen alsof SQL, Hive en Git een transactie delen.

Aanbevolen flow:

```
1. Lock CR en controleer expected aggregate version
2. Controleer permissions, reviews, comments en operation state
3. Preflight alle Space-members en de site member
4. Vergelijk base, head en actuele main state
5. Start of hervat een durable merge operation
6. Merge Space-members naar hun Hive main revisions
7. Pas de site snapshot toe op de live site
8. Leg merged revision IDs vast
9. Voer cache-, URL-, audit- en Git Sync side-effects uit
10. Markeer de CR pas merged wanneer alle vereiste stappen voltooid zijn
```

Binnen een SQL-stap moeten databasewijzigingen transactioneel zijn.

Over SQL, Hive, site snapshot storage en externe Git-provider heen is een durable saga nodig met:

* operation ID;
* idempotency key;
* expected aggregate version;
* immutable inputs;
* voortgang per stap;
* retryinformatie;
* compensation of herstelpad;
* terminal success of actionable failure.

### Three-way conflicts

De huidige site-config diff-engine vergelijkt twee configuraties:

```
previous -> next
```

Een CR-merge vereist drie states:

```
base
head
current live
```

Conflictvoorbeelden:

| Base              | CR head           | Current live                      | Resultaat                 |
| ----------------- | ----------------- | --------------------------------- | ------------------------- |
| A voor B          | B voor A          | A voor B                          | Clean CR reorder          |
| A voor B          | B voor A          | A voor C voor B                   | Mogelijk reorder-conflict |
| Section bestaat   | Titel gewijzigd   | Section verwijderd                | Delete-update conflict    |
| Space X gekoppeld | Space Y gekoppeld | Space Z gekoppeld                 | Content mapping conflict  |
| Niet home         | Set as home       | Andere section set as home        | Default conflict          |
| Path `/api`       | Path `/reference` | Andere node gebruikt `/reference` | Path conflict             |

Conflicten moeten op stable node identity en propertyniveau worden gerapporteerd, niet als een generiek YAML-conflict.

### UX-aanbeveling

Verwijder de Site Structure-pagina uiteindelijk volledig en maak de content tree de primaire structure editor.

Gebruik drie interactieniveaus.

#### 1. Direct gedrag

Voor handelingen waarbij intentie vanzelf uit de interactie blijkt:

* reorder;
* nesting;
* group membership;
* content toevoegen;
* unlinken of verwijderen.

#### 2. Item-actions

Voor eigenschappen die een bewuste keuze vereisen:

* Set as home;
* Show in navigation;
* Include on published site;
* Audience;
* Replace content;
* Add variant;
* Remove from site.

#### 3. Compacte inspector

Voor minder frequente of tekstuele eigenschappen:

* slug;
* custom home page;
* localized title;
* description;
* icon;
* language.

### Wat niet automatisch afgeleid moet worden

#### Home-status

De eerste node in de tree mag niet automatisch de home worden wanneer iemand reordert.

Reorder verandert navigatievolgorde. Home-status is een aparte intentie.

#### Slug na rename

Een slug kan initieel van de titel worden afgeleid.

Na publicatie mag een rename de URL niet stil wijzigen, omdat dit links kan breken.

#### Hidden versus removed

Een verborgen variant blijft bereikbaar via een directe URL.

Een verwijderde variant is niet langer aan de site gekoppeld.

Deze acties mogen niet dezelfde drag-away-interactie gebruiken zonder duidelijke bevestiging.

#### CR draft versus structure draft

Een item in een CR is vanzelf nog niet live.

Dat is iets anders dan een item dat na merge structureel draft of niet gepubliceerd moet blijven.

#### Audience conditions

Een doelgroepvoorwaarde kan niet betrouwbaar uit de positie of inhoud van een item worden afgeleid.

Dit blijft een expliciete item-eigenschap.

### Review-UX

De structure editor zit in de normale editor, maar de CR review heeft een aparte structure diff als memberweergave.

Voorbeeld:

```
Site structure

3 changes

Moved
API moved before Guides

Added
SDKs added to Resources

Changed
Internal docs hidden from navigation
```

Een reviewer moet vanuit iedere diffregel naar het betreffende item in de editor kunnen navigeren.

Comments worden gekoppeld aan:

```
member: site structure
node key: section-api
property: order
aggregate version: 13
```

Wanneer het item opnieuw verandert, kan de comment outdated worden zonder zijn history te verliezen.

### Eindverdict per niveau

#### 1. API en backend

**Verdict: technisch haalbaar, maar nog niet gereed voor de volledige UI.**

Beschikbaar:

* live structure CRUD;
* SQL CR target- en membermodel;
* target-scoped CR identity en versioning;
* gedeelde CR create/read/member-operaties;
* organisatie- en membervalidatie.

Nog nodig:

* immutable site snapshot storage;
* CR-scoped structure mutations;
* head revision updates;
* durable operations;
* target-aware publieke API's;
* rebase, conflict, merge en recovery.

#### 2. UX

**Verdict: haalbaar en wenselijk.**

De aparte instellingenpagina kan verdwijnen.

De tree kan het grootste deel van de structuur impliciet vastleggen. Eigenschappen die niet betrouwbaar uit gedrag volgen, blijven expliciet beschikbaar als item-actions of inspectorvelden.

De centrale UX-regel wordt:

> Organizing content is editing the site structure.

#### 3. Git en Change Requests

**Verdict: architectonisch goed voorbereid, maar het schema en de mergeflow zijn nog niet compleet.**

Sterke basis:

* `docs.yaml` als canonieke configuratie;
* stable structure keys;
* bestaande create/update/delete/sort diff-engine;
* site member met base/head/merged snapshot identity;
* een aggregate CR version;
* RFC-contract voor durable multi-member operations.

Blokkers:

* section draft ontbreekt;
* custom home page ontbreekt;
* bestaande Space identity is niet volledig opgelost;
* immutable snapshot store ontbreekt;
* three-way structure conflicts ontbreken;
* durable site apply en recovery ontbreken;
* publieke site-wide CR API's ontbreken.

### Aanbevolen productbeslissing

Gebruik het bestaande RFC-model als backendfundament, maar pas de beschreven app experience op een belangrijk punt aan:

> "Selecting site structure opens a focused structure editor" hoeft geen aparte structure page te betekenen.

Aanbevolen interpretatie:

* De normale editor tree is de structure editor.
* Iedere organisatiehandeling schrijft direct naar de site member head snapshot van `Docs changes`.
* De CR detailweergave biedt een gefocuste structure diff.
* Expliciete instellingen verschijnen alleen contextueel bij het betreffende item.
* De live site structure wordt pas tijdens merge aangepast.

Daarmee blijven de backendprincipes uit de RFC intact, terwijl de UI het 3.0-principe volgt dat site structure impliciet ontstaat uit hoe gebruikers content organiseren.
