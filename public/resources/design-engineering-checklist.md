# Design Engineering Checklist

Use this before shipping any important product flow.

## 1) Product Clarity

- [ ] Flow objective is explicit and measurable.
- [ ] Primary CTA is unambiguous.
- [ ] Empty/loading/error states are designed.
- [ ] Edge cases are mapped and handled.

## 2) UX and Interaction

- [ ] Visual hierarchy supports the intended action.
- [ ] Motion supports comprehension, not decoration.
- [ ] Input states are obvious (idle, focus, invalid, success).
- [ ] Keyboard path is complete for all interactive elements.

## 3) Accessibility

- [ ] Color contrast passes WCAG AA for text and controls.
- [ ] Focus indicators are visible and consistent.
- [ ] Labels and ARIA attributes are meaningful.
- [ ] Screen-reader announcements are present where needed.

## 4) Performance

- [ ] Largest elements are optimized (images/fonts/scripts).
- [ ] Avoid unnecessary re-renders in key paths.
- [ ] Slow network behavior is acceptable.
- [ ] Mobile interaction remains smooth under load.

## 5) Analytics and Conversion Tracking

- [ ] Primary funnel events are tracked.
- [ ] Event names and properties are consistent.
- [ ] Conversion steps can be queried end-to-end.
- [ ] UTM/referrer context is preserved where relevant.

## 6) Reliability and Launch Safety

- [ ] Monitoring/alerts are set for critical failures.
- [ ] Rollback path is clear and tested.
- [ ] Feature flags are in place when risk is high.
- [ ] Post-launch review window is scheduled.

## 7) Post-Launch Review

- [ ] Compare expected vs actual conversion metrics.
- [ ] Review top drop-off points and hypotheses.
- [ ] Document wins, regressions, and follow-up tasks.
- [ ] Feed findings back into next iteration scope.

---

Maintained by Maxwell Young — https://dev.maxwellyoung.info
