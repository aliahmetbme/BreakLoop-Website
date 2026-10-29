# Source review — 2026-10-29

Baseline: `aliahmetbme/BreakLoop` main `fb176cc5ba92dbeb2efdf49fd743f4c46b6b8662`. GitHub tree and local checkout HEAD match. Native checkout `/Users/aliahmeterdogdu/Projects/BreakLoop` was read only. Website card https://trello.com/c/pSBHcxaN reviewed.

## Design

Read `BreakLoop/Core/DesignSystem/BreakLoopColors.swift`, Radius and Spacing; checked BLBackground, BLSurface, BLBrandPrimary and BLTextSecondary asset catalog entries. Initial supplied reference values agree with native source. Important adaptive distinctions:

| Semantic token | Light | Dark |
| --- | --- | --- |
| background | #F8F9FC | #0C0E14 |
| surface | #FFFFFF | #161922 |
| subtle | #EEF1F8 | #212533 |
| elevated | #F3F3FD | #282A31 |
| primary text | #12141A | #F5F6FA |
| secondary text | #61687B | #9BA3B8 |
| brand primary | #434EE8 | #BEC2FF |
| interactive action | #434EE8 | #434EE8 |
| rest status | #5E6AD2 | #7B88D6 |
| focus status | #3843C7 | #5E6AD2 |

Card/control radii: 18/14 px; large cards: 20 px. Native 4/8/12/16/24/32/40 spacing informs the web layout, with larger editorial section spacing. Decorative rings are static. No live system-shield timers or animation claims.

Assets copied from AppLogo.imageset and ShieldConfigurationExtension Quiet Horizon imagesets. Supplied INDEX and MOTION HTML and PNG boards reviewed as concepts. Preview images extracted from embedded INDEX PNGs, explicitly labeled illustrative. Not represented as device captures.

## Privacy and behavior evidence

Read current `AppGroupStorage.swift`, `AppLogger.swift`, `LogCatagory.swift` metadata allowlist, `PersistentLogStore.swift`, `DiagnosticsView.swift`, `SettingsView.swift`, and `UsageCycleCalculators.swift`.

- Local App Group selection/configuration/appearance/runtime state verified.
- Diagnostic archive retentionDays=14, maximumBytes=50*1024*1024. UI says target at least 14 days. Storage cap can affect retained history; no exact 14-day deletion promise.
- Export/filter/share and confirmed Delete History verified.
- Migration explicitly preserves legacy originals. OSLog is separately written. No deletion guarantee for OSLog, legacy originals or exported/shared copies.
- Natural rest subtracts checkpoint active usage from elapsed wall time. It is an estimate, not a continuous measurement of whole-device use or uninterrupted rest.
- Settings About does not yet contain final Privacy/Support URL integration.
- Operator/contact/received-diagnostics retention unknown: draft notices and release checklist retained.

User product constraints preserved: Coming Soon; no website blocking, Sleep Schedule, pricing/free tier, testimonials, health claims, perfect enforcement promises, or invented store links.
