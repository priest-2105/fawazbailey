# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

Fawaz Bailey's existing engineering portfolio. The requested `/ecommerce-projects` route is a separate ecommerce showcase hosted inside the same Next.js application for speed.

## Capabilities and Constraints

- The user requests all their ecommerce work, real website screenshots, and a story for each project.
- The new route must use a different visual direction from the portfolio, with generous, consistent spacing and responsive layouts.
- Preserve existing portfolio routes and behavior.
- Augusta Newham is recorded in `lib/projects.ts`. 920 Luxury is verified against the user's local `920storefront` project and its live site.
- Open decision: the full list of ecommerce projects. Additional local folder names are not evidence of a commerce project or a completed client engagement.
- Both included stores use Shopify as the commerce backend and Next.js as the custom storefront (confirmed by user).
- Augusta: recent product launch; no CRO results yet. Marketing is handled by a separate marketing team. Fawaz built newsletter subscriber categorisation and automatic product discount eligibility without codes.
- 920: Fawaz built the responsive storefront and integrated appointment app. The user reports a change from near-zero weekly sales to approximately 50 visits, 15 confirmed sales and 15–20 appointments per week. Hair can be purchased for styling on arrival instead of delivered to the customer first.
- The requested chart uses a React chart package and shows only these supplied weekly figures. Do not invent a time series, conversion percentage or precise baseline.

## Evidence on Hand

Live-site captures and page text are recorded in `.impeccable/research`. Project descriptions must describe observed features and verified implementation, with no invented business outcomes, conversion metrics, or client quotes.

The user supplied outcomes above; they are not independently exported analytics. The exact observation period and whether the appointment count covers all business bookings are unconfirmed. The current 920 source restricts availability to Wednesday/Saturday with two start times, so the weekly appointment figure must not be described as verified website-only bookings.

## Users

Assumption for this implementation: prospective clients reviewing the engineer's ecommerce work.
