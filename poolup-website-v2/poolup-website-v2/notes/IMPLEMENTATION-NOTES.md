# Content and implementation notes

## Source fidelity

The supplied PDF and the latest pasted page copy contain matching substantive website content. Paragraphs were preserved, including the long About Us narrative, every verification item, all pricing qualifications, all accessibility notes, the complete pilot process and all 16 FAQ answers. Lists are displayed as lists; interface instructions such as "Button:" are represented as actual controls rather than printed as body copy.

The duplicate footer in the paste is rendered once. The complete website navigation is retained even though the pasted menu fragment stops after Find a Ride.

## Additions kept distinct

- A preview banner and disabled-form notices are implementation notices, not claims from the supplied website copy.
- A driver application form has been added using the route, vehicle and contact information described in the brief. Its consent text is provisional and its fields are disabled.
- Partners and Report a Safety Concern are navigation destinations assembled from the relevant supplied partnership/safety passages. They do not assert that agreements exist or that reports are monitored.
- The nine policy pages preserve only the supplied descriptions. No full legal wording was invented.
- The registration counter visible in the screenshot was not reproduced because no verified registration data was supplied.

## Visual reference

Retained: pale grey and white section bands, ochre rounded buttons, four process cards, the three-plus-two benefit grid, two local photographs, the dark partnership section, green pilot section and large dark footer wordmark.

Improved for the usable viewport: readable body text, a responsive header, mobile navigation, clearly labelled fields, keyboard focus, skip link and complete route navigation.

The original photos are only available in the screenshot and therefore look softer when enlarged.

## Technical references checked

- Next.js installation: https://nextjs.org/docs/app/getting-started/installation
- Next.js static exports: https://nextjs.org/docs/app/guides/static-exports
- Next.js August 2026 security release: https://nextjs.org/blog/august-2026-security-release
- React published versions: https://react.dev/versions
- GitHub Pages publishing sources: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

Next.js and React were updated from the previous starter's older pins. Package availability and build compatibility still need to be checked with a real dependency installation; see README for the testing boundary.
