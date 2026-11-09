# TaskMS frontend review and staff task improvements

## Staff task list improvements

This branch adds search across client, location, task ID, date, time and status, Malaysia-calendar-day filtering, normalized completed-status matching, keyboard-operable tab navigation, safe DOM text rendering for task fields, and a retry button after network/API failures. It also adds dependency-free tests.

Run the helper tests with Node.js 18 or newer:

```sh
node --test tests/tasklist-utils.test.js
```

**Integration checks before merging:** Open `tasklist.html` via the deployed site with a staff account and a working Apps Script backend. Check today's tasks around 00:00 Malaysia time, search each tab, keyboard tab selection, opening task details, and the retry state after disconnecting/reconnecting. These browser and backend checks have not been run by this change.

## Security review — backend action required

The current `index.html` login passes only an email address to the `login` action, and subsequent pages use locally stored `user_email`, `user_role`, and `user_companyID`. This data **must not be treated as proof of identity or authority**. Implement server-verified authentication (for example, Google Identity Services with backend token verification) and a secure session mechanism. Every Apps Script endpoint that returns or modifies task, user, company, survey, GPS, or photo data must enforce the authenticated actor's role, tenant/company scope, and access to the specific task on the server. This is not fixable purely with HTML/JavaScript and is not included in this PR.

Other pages still contain raw `innerHTML` interpolations of values received from the API, including `profile.html`, `task-details.html`, and `admin-survey-templates.html`; audit and replace them with `textContent`/DOM construction or trusted, context-appropriate encoding. Some admin mutations use `mode: "no-cors"`, which prevents the caller from confirming whether the backend accepted the change; use an API design that returns verifiable success/failure.

Do not deploy this frontend as a security-sensitive multi-tenant application until backend authentication and authorization are verified.
