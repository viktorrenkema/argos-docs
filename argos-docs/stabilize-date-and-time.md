# Stabilize Date & Time

Mitigate UI flakiness with stable date & time in visual testing: hide dynamic dates or freeze them for consistency using Argos's practical solutions.

### Hiding the Date

Using Argos helpers, you can choose to hide a date or a time by adding `data-visual-test="transparent"`.

```html
<time data-visual-test="transparent">10 oct, 2012</time>
```

Source / direct link: https://argos-ci.com/docs/date-stabilization#hiding-the-date

### Freezing the Date

If you are using dates (not precise time), you can stabilize them in your seeds by running a script that updates dates just before running your E2E tests.

Source / direct link: https://argos-ci.com/docs/date-stabilization#freezing-the-date
