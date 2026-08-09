# CoreSense Security Policy

## Supported Version

Security fixes are applied to the current `main` branch and the active Vercel production deployment.

## Reporting a Vulnerability

Do not open a public issue for a suspected vulnerability. Use the repository's private vulnerability reporting or security-advisory flow so maintainers can validate and address the report before disclosure.

Include:

- the affected page, component, dependency, or document path;
- clear reproduction steps;
- the expected and observed behavior;
- the potential impact;
- any safe mitigation you have already tested.

Avoid including real worker data, credentials, access tokens, or other sensitive information in the report.

## Data Boundary

The current site is a static product prototype and document viewer. It does not require visitor accounts or collect worker telemetry. Product documents describe an intended architecture in which raw optical data remains on the wearable and only derived pseudonymous operational data leaves the device.

## Secret Handling

- Never commit API keys, deployment tokens, credentials, or local environment files.
- Rotate a secret immediately if it appears in a terminal transcript, issue, pull request, or commit.
- Use Vercel environment variables or GitHub Actions secrets when a future integration requires protected configuration.
- Keep generated artifacts and dependency caches out of version control.

## Dependency Risk

Automated dependency updates are enabled. Changes that affect the build chain should pass lint, rendered-output tests, and the Vercel production build before merge.
