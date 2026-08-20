---
icon: table-list
---

# Tables

## Tables

This page contains mock tables for rendering and diff testing.

The values are realistic on purpose.

### Compact status matrix

This table stays narrow.

| Area                  | Owner      | Status     | Last update          |
| --------------------- | ---------- | ---------- | -------------------- |
| Docs API              | Maya Chen  | Healthy    | 2026-06-22 14:18 UTC |
| Search indexing       | Idris Khan | Degraded   | 2026-06-22 13:41 UTC |
| Reusable content sync | Lena Park  | Healthy    | 2026-06-22 12:07 UTC |
| Change requests       | Owen Bell  | Healthy    | 2026-06-22 11:52 UTC |
| Public publishing     | Nora Singh | Monitoring | 2026-06-22 10:33 UTC |

### Wide request log

This table is intentionally wide.

| Request ID       | Branch                    | Actor  | Action            | Space          | Page     | Source | Target         | Region           | Runtime | Result         | Notes                                                         |
| ---------------- | ------------------------- | ------ | ----------------- | -------------- | -------- | ------ | -------------- | ---------------- | ------- | -------------- | ------------------------------------------------------------- |
| `req_01J1XK9V2A` | `feat/table-diff-pass-1`  | `maya` | `update-page`     | `sandbox-docs` | `Tables` | Web UI | Main branch    | `eu-west-1`      | `184ms` | `200 OK`       | First pass updates several narrow cells.                      |
| `req_01J1XK9W4F` | `feat/table-diff-pass-1`  | `maya` | `update-page`     | `sandbox-docs` | `Tables` | Web UI | Main branch    | `eu-west-1`      | `201ms` | `200 OK`       | Reorders two adjacent columns and tweaks punctuation.         |
| `req_01J1XK9Y0Q` | `perf/render-snapshots`   | `owen` | `render-preview`  | `sandbox-docs` | `Tables` | API    | Preview env    | `us-east-1`      | `492ms` | `200 OK`       | Wide row with mixed identifiers, codes, and short prose.      |
| `req_01J1XKA13N` | `perf/render-snapshots`   | `owen` | `compare-diff`    | `sandbox-docs` | `Tables` | Worker | Diff service   | `us-east-1`      | `811ms` | `409`          | Simulated conflict after concurrent edits to the same row.    |
| `req_01J1XKA5BW` | `qa/mock-content-refresh` | `lena` | `create-snapshot` | `sandbox-docs` | `Tables` | CLI    | Snapshot store | `ap-southeast-1` | `1.2s`  | `201 Created`  | Snapshot includes long-form text cells and repeated statuses. |
| `req_01J1XKA8TR` | `qa/mock-content-refresh` | `lena` | `publish-preview` | `sandbox-docs` | `Tables` | Web UI | CDN edge       | `ap-southeast-1` | `633ms` | `202 Accepted` | Helpful for testing both layout churn and content churn.      |

### Text-heavy review notes

This table puts most of the weight in prose columns.

| Change set | Summary                                                     | Reviewer notes                                                                                                                                                               | Follow-up                                                   |
| ---------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `cs_1042`  | Replaced a sparse fixture with denser markdown tables.      | The row structure is stable, but the longer notes cell is useful because it causes localized diffs instead of rewriting the whole row. It also helps test wrapping behavior. | Split one sentence into two sentences in the next revision. |
| `cs_1043`  | Introduced repeated labels, timestamps, and code spans.     | Repetition makes diff output easier to inspect. Small token changes should stay visible without hiding the unchanged structure around them.                                  | Change one owner name and one region value.                 |
| `cs_1044`  | Added a wide operational log with several metadata columns. | This shape is useful when horizontal overflow appears. Column order changes should produce obvious diffs, especially when two neighboring fields swap positions.             | Move `Region` beside `Runtime` in a later edit.             |
| `cs_1045`  | Added a tall deployment history to exercise row insertions. | Very tall tables are good for testing additions near the top, middle, and bottom. They also surface whether pagination or lazy rendering impacts diff readability.           | Insert a new row between build `8421` and `8422`.           |

### Environment inventory

This table mixes short labels with numeric values.

| Environment   | Cluster         | Nodes | CPU reserved | Memory reserved | Release channel     | Primary contact |
| ------------- | --------------- | ----: | -----------: | --------------: | ------------------- | --------------- |
| Local dev     | `kind-docs-a`   |     3 |     `6 vCPU` |        `12 GiB` | `canary`            | Maya Chen       |
| Preview       | `eks-preview-2` |     8 |    `24 vCPU` |        `96 GiB` | `beta`              | Owen Bell       |
| Staging       | `eks-staging-1` |    14 |    `52 vCPU` |       `208 GiB` | `release-candidate` | Lena Park       |
| Production EU | `eks-prod-eu-3` |    36 |   `144 vCPU` |       `576 GiB` | `stable`            | Idris Khan      |
| Production US | `eks-prod-us-4` |    40 |   `160 vCPU` |       `640 GiB` | `stable`            | Nora Singh      |

### Tall deployment history

This table is intentionally tall.

| Build  | Environment   | Commit    | Started              | Duration  | Result      |
| ------ | ------------- | --------- | -------------------- | --------- | ----------- |
| `8420` | Preview       | `a91d4ce` | 2026-06-20 08:02 UTC | `3m 12s`  | Success     |
| `8421` | Preview       | `ff10b67` | 2026-06-20 08:24 UTC | `3m 04s`  | Success     |
| `8422` | Preview       | `b552ca1` | 2026-06-20 09:11 UTC | `4m 18s`  | Failed      |
| `8423` | Preview       | `2ce90dd` | 2026-06-20 09:42 UTC | `3m 41s`  | Success     |
| `8424` | Staging       | `17ec4a9` | 2026-06-20 10:16 UTC | `6m 08s`  | Success     |
| `8425` | Staging       | `52c9db4` | 2026-06-20 10:51 UTC | `5m 56s`  | Success     |
| `8426` | Staging       | `76ab201` | 2026-06-20 11:32 UTC | `7m 12s`  | Failed      |
| `8427` | Staging       | `de7303f` | 2026-06-20 12:08 UTC | `6m 47s`  | Success     |
| `8428` | Production EU | `33c4af0` | 2026-06-20 13:02 UTC | `8m 26s`  | Success     |
| `8429` | Production EU | `014c7b2` | 2026-06-20 13:48 UTC | `8m 09s`  | Success     |
| `8430` | Production EU | `d942f17` | 2026-06-20 14:13 UTC | `9m 31s`  | Rolled back |
| `8431` | Production EU | `71bdca8` | 2026-06-20 14:57 UTC | `8m 02s`  | Success     |
| `8432` | Production US | `3aa6c95` | 2026-06-20 15:22 UTC | `8m 44s`  | Success     |
| `8433` | Production US | `441fd01` | 2026-06-20 15:53 UTC | `8m 57s`  | Success     |
| `8434` | Production US | `8cbe723` | 2026-06-20 16:21 UTC | `10m 14s` | Failed      |
| `8435` | Production US | `f0ec18d` | 2026-06-20 17:02 UTC | `9m 05s`  | Success     |
| `8436` | Preview       | `af0b771` | 2026-06-21 08:06 UTC | `3m 20s`  | Success     |
| `8437` | Preview       | `0d4a11b` | 2026-06-21 08:43 UTC | `3m 11s`  | Success     |
| `8438` | Preview       | `891ce35` | 2026-06-21 09:07 UTC | `4m 02s`  | Success     |
| `8439` | Staging       | `1fdd9c4` | 2026-06-21 09:36 UTC | `5m 48s`  | Success     |
| `8440` | Staging       | `24ac0ef` | 2026-06-21 10:15 UTC | `6m 33s`  | Success     |
| `8441` | Staging       | `ba61752` | 2026-06-21 10:49 UTC | `6m 51s`  | Failed      |
| `8442` | Production EU | `b9c2040` | 2026-06-21 11:24 UTC | `8m 18s`  | Success     |
| `8443` | Production EU | `0f5a8bb` | 2026-06-21 12:06 UTC | `8m 22s`  | Success     |
| `8444` | Production US | `62d4ef9` | 2026-06-21 12:44 UTC | `9m 13s`  | Success     |
| `8445` | Production US | `9581ca0` | 2026-06-21 13:27 UTC | `9m 47s`  | Success     |

### Feature flags

This table uses mixed data types and short code-like values.

| Flag                        | Default | Scope          | Rollout | Owner      | Expires    |
| --------------------------- | ------- | -------------- | ------: | ---------- | ---------- |
| `render_diff_v2`            | `true`  | Preview only   |    100% | Owen Bell  | 2026-07-15 |
| `table_virtualize_rows`     | `false` | Internal staff |     25% | Maya Chen  | 2026-08-01 |
| `md_ast_cache`              | `true`  | All spaces     |    100% | Idris Khan | 2026-09-30 |
| `snapshot_compare_fastpath` | `false` | Staging        |     50% | Lena Park  | 2026-07-22 |
| `editor_cell_selection`     | `true`  | Internal staff |     10% | Nora Singh | 2026-07-08 |

### SLA and error budget summary

This table is numeric-heavy.

| Service          |    SLO | Current | 7d avg latency | 30d avg latency | Error budget left | Incidents this month |
| ---------------- | -----: | ------: | -------------: | --------------: | ----------------: | -------------------: |
| Page render      | 99.95% |  99.97% |        `182ms` |         `196ms` |             82.4% |                    1 |
| Search API       | 99.90% |  99.88% |        `241ms` |         `233ms` |             17.9% |                    3 |
| Diff generation  | 99.50% |  99.63% |        `812ms` |         `854ms` |             61.3% |                    2 |
| Publish pipeline | 99.90% |  99.92% |         `1.8s` |          `1.9s` |             74.1% |                    1 |
| Preview build    | 99.00% |  98.71% |         `3.4s` |          `3.8s` |              9.6% |                    5 |

### Documentation work queue

This table mixes links, labels, and short notes.

| Item                     | Type          | Priority | Assignee   | State     | Reference                                          | Note                                         |
| ------------------------ | ------------- | -------- | ---------- | --------- | -------------------------------------------------- | -------------------------------------------- |
| API pagination examples  | Guide         | P1       | Maya Chen  | In review | [Spec draft](https://example.com/specs/pagination) | Needs one before-and-after diff screenshot.  |
| Reusable content cleanup | Maintenance   | P2       | Lena Park  | Planned   | [Tracking issue](https://example.com/issues/4821)  | Good candidate for repeated row edits.       |
| Search relevancy tuning  | Investigation | P1       | Idris Khan | Active    | [Runbook](https://example.com/runbooks/search)     | Update metrics and one threshold value.      |
| Table diff snapshots     | QA            | P0       | Owen Bell  | Active    | [Preview build](https://example.com/builds/8445)   | Add row insertions in three places.          |
| Space export parity      | Bug           | P2       | Nora Singh | Blocked   | [Bug report](https://example.com/bugs/901)         | Waiting on a fixture from the importer team. |

### Content inventory

This table balances many medium-width columns.

| Page title         | Category   | Word count | Tables | Code blocks | Last edited by | Last edited at       | Review cadence |
| ------------------ | ---------- | ---------: | -----: | ----------: | -------------- | -------------------- | -------------- |
| Getting started    | Onboarding |        842 |      1 |           2 | Maya Chen      | 2026-06-18 09:22 UTC | Monthly        |
| API authentication | API        |       1260 |      2 |           6 | Idris Khan     | 2026-06-17 16:03 UTC | Monthly        |
| Search             | Feature    |        934 |      0 |           3 | Lena Park      | 2026-06-19 11:40 UTC | Quarterly      |
| Publishing         | Feature    |       1188 |      1 |           4 | Owen Bell      | 2026-06-20 14:56 UTC | Monthly        |
| Reusable content   | Feature    |        711 |      1 |           1 | Nora Singh     | 2026-06-21 08:51 UTC | Quarterly      |
| Tables             | QA fixture |          0 |      8 |           0 | Maya Chen      | 2026-06-23 10:12 UTC | On demand      |
