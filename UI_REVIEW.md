# Modern UI/UX refresh — manual QA checklist

This branch is a frontend-only design and accessibility refresh. It does not change Apps Script request actions, authorization, survey schemas, task status workflows, or production deployments.

## What's changed

- `fsms-ui.css`: shared, scoped layout and visual patterns (spacing, typography, cards, forms, tables, focus states, status labels, mobile breakpoints, reduced motion).
- `navbar.js`: semantic, keyboard-usable staff navigation with active-page indication; preserved task/admin/profile destinations and logout behavior.
- `admin-navbar.js`: cleaner responsive admin header/nav with safe DOM text for account details; preserved navigation targets and global `logout()` function.
- Staff tasks: clear title/subtitle, responsive task card grid, larger search input, improved tabs and empty state.
- Task details: back-to-tasks affordance and keyboard-operable subtasks (Enter/Space; `aria-expanded`).
- Profile: responsive details grid, explicit loading/error/retry, safe text rendering (instead of injecting profile data into HTML), encoded query parameters.
- Admin dashboard, users, tasks, survey templates: shared header, consistent type scale, spacing, form controls, scrollable data tables, and mobile-friendly actions.

## Recommended pre-merge QA

Test with actual accounts and the deployed Apps Script endpoint:

1. **Staff at 375px and 768px:** open task list, search/filter, tap a card, complete the checklist interactions, visit Profile, log out. Make sure the bottom nav does not cover content; check portrait and landscape.
2. **Desktop at 1280px:** verify multi-column task cards, profile grid, task details/overlays, and active nav item.
3. **Admin at 375px, 768px, 1024px and 1440px:** verify every table record and action fits the screen with no sideways page scrolling, long emails and remarks wrap rather than overflow, and placeholders/read-only rows remain readable. Check task/user/survey editing modals, filters, charts/map and nav scrolling.
4. **Survey setup:** choose a template, move to step 2, add/edit/remove questions, return to step 1, switch templates and clear selection. Confirm the questions step is disabled before choosing a template and the task editor's two sections remain readable.
5. **Keyboard:** Tab through navigation; activate links with Enter; in task details toggle subtask accordion using Enter/Space; check focus visibility across modals, controls, and pagination.
6. **Accessibility:** run automated WCAG checks and manually inspect 200% zoom, high contrast, screen readers, and reduced-motion setting.
7. **Network:** disconnect and reconnect while loading Profile to check retry. Verify staff tasks and survey flows still work with the backend.
8. **Security:** confirm all authentication and per-company authorization on the **backend**; browser roles and localStorage are not access controls.

## Verification performed

The branch files were re-fetched and checked for JS parseability, shared stylesheet integration, heading presence, basic navigation semantics, keyboard accordion support, safe Profile text rendering and responsive table cell-label logic. Dependency-free unit tests for responsive tables are included: `node --test tests/responsive-tables.test.js`. **No live browser or Apps Script integration test has been performed.**

## Known limitations

The public login and customer survey pages retain their current design in this PR, to avoid changing entry and customer workflows. Backend security issues identified previously remain open. The CSS is intentionally scoped to `body.fsms-ui` and should not affect those public pages.
