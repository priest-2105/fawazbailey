# Ecommerce showcase sources

The new route is `/ecommerce-projects`. Content is centralized in `lib/ecommerce-projects.ts`.

## Scope

Included projects have source evidence belonging to this developer and a public URL: two live storefronts and one hosted preview. The full ecommerce project list was requested from the user and remains unconfirmed. Do not interpret this three-project collection as an exhaustive inventory.

Other local directories were checked but not added: Ogechi Collective is a film studio, Heelushion is an Expo app, and Vestiaire currently has a starter homepage.

## Augusta Newham

- Website: https://www.augustanewham.com/
- Existing portfolio record: `lib/projects.ts`, slug `augusta-newham`.
- Reviewed: homepage text, category navigation, product quick-add, size guide entry, geographic currency display, cart and footer.
- Story describes visible shopping structure and the headless Shopify architecture already recorded in the portfolio. It does not repeat the old record's speculative claims about a previous theme or client tradeoffs.
- User clarification: recent product launch, no CRO results yet, separate marketing team. Fawaz created a customer category for newsletter subscribers and eligibility checks that apply discounts automatically without codes. Discount percentage, exact Shopify customer-tag/segment API and implementation file for this feature were not supplied; do not invent them.
- Desktop capture: 1440 × 1000. Mobile capture: 390 × 844.
- Files: `public/images/ecommerce/augusta-newham-desktop.jpg` and `augusta-newham-mobile-collection.jpg`.
- The mobile image shows https://www.augustanewham.com/collections/shapewear. The homepage's mobile background video did not load reliably during capture, so the fully loaded collection page is used and labeled in the UI instead.

## 920 Luxury

- Website: https://www.920luxury.com/
- Local implementation evidence: the user's `PROJECTs/920storefront` project. `app/layout.tsx` identifies the brand and domain; `lib/shopify.ts` implements Storefront GraphQL products, variants, carts and customer accounts; `lib/google-calendar.ts` implements availability and booking events.
- `app/api/cart/route.ts` persists the Shopify cart ID in an HTTP-only cookie. `app/booking/page.tsx` is a service/options/add-ons/date/time/details/review flow. `app/api/booking/checkout/route.ts` chooses a Shopify deposit variant and `createBookingCart` creates a separate Shopify cart with appointment attributes. `app/api/webhooks/shopify/route.ts` verifies Shopify's signature, processes `orders/paid`, creates the Google Calendar event and emails the owner. Despite a Stripe dependency in package.json, this active booking flow uses Shopify checkout. The earlier draft's Stripe claim has been removed.
- The booking page explicitly states hair is purchased separately. Describe one site with two connected journeys, not a single combined hair-and-booking checkout.
- User-reported outcomes: near-zero weekly sales before; approximately 50 visits, 15 confirmed sales and 15–20 appointments weekly after. The user describes hair being held for styling at the customer's appointment rather than requiring delivery to the customer first.
- Chart uses Recharts with a zero-baseline count axis, separate activity categories, an explicit 15–20 appointment range and a readable data table. No calculated conversion rate, exact baseline, fabricated dates or inferred historical points.
- Appointment scope clarification pending: current source offers Wednesday/Saturday and two daily start times. The user was asked whether 15–20 refers to all business appointments or website-only bookings. Until clarified, these remain attributed reported business figures, not verified website-only counts.
- Reviewed: homepage, product links and variants, separate shopping/booking paths, service prices and add-ons, preparation and deposit information.
- No purchases, bookings, contact submissions, or subscriptions were made. This is a presentation review, not an end-to-end audit of either store's checkout or booking system.
- Desktop capture: 1440 × 1000. Mobile capture: 390 × 844.
- Files: `public/images/ecommerce/920-luxury-desktop.jpg` and `920-luxury-mobile.jpg`.

## Brownie Bakes

- Hosted preview: https://browniebakes.notanothershittydemo.site/ — an early preview pending review and handover with the bakery, not a production launch.
- Local implementation evidence: the user's `PROJECTs/browniebakes` project (Next.js 16, React 19, Three.js; no Shopify or payment dependency).
- `app/lib/catalog.ts`: five flavours with box-of-3/6/12 pricing; the box-of-6 price is marked as an estimate. `app/lib/shop.ts` marks delivery fee, custom pricing and box prices as placeholders and states that checkout is a demo.
- `app/components/cookie-scene.tsx`: Three.js cookie box loaded from a Draco-compressed GLB, lazy-imported on the client, with matching open/closed image posters as the no-WebGL fallback, context-loss handling, and reduced motion skipping the lid animation.
- `app/components/cookie-builder.tsx`, `builder-scene.tsx`, `app/lib/customizer.ts`: custom cookie studio with four bases and up to four toppings; placement is seeded per topping so pieces stay put; price rises per extra; the preview docks while scrolling.
- `app/components/order-enquiry.tsx`: composes an enquiry the customer copies and sends on Instagram; the bakery confirms availability and price.
- `app/components/cart-context.tsx`, `checkout-form.tsx`: prototype cart in local storage, pickup or Kamloops delivery (postal-code check), dates after two business days of preparation. The checkout says "Demo checkout … no payment is taken and nothing is sent to Brownie Bakes" and "Online payment isn't switched on yet."
- No sales, traffic or CRO data exists. The route shows a status panel instead of analytics.
- Files: `public/images/ecommerce/brownie-bakes-desktop.jpg` and `brownie-bakes-mobile.jpg` (1440 × 1000, 390 × 844). Known issue: these captures were taken before the 3D box poster and logo finished loading, so the hero stage is empty. A re-capture is pending: on 2026-09-29 the preview host intermittently failed TLS handshakes, and a full load in headless Chrome needed a `load` wait of a few minutes.

## Screenshot provenance

The Augusta and 920 JPGs are original browser screenshots of the URLs above, captured for this showcase on 2026-09-29; the Brownie JPGs are browser screenshots of its hosted preview. They are not generated mockups. No site content was changed for the captures. The sites' own photos and branding remain part of the screenshots.

Research text and full-page review captures are local-only under `.impeccable/research` and `.impeccable/review`. Public images are compressed JPGs served through Next Image.

## Reproducing captures

The browser plugin's JavaScript execution tool was unavailable, so standalone Playwright with installed Chrome was used. The scripts expect Playwright in a temporary `ecommerce-browser` npm prefix. Install with `npm install --prefix <system-temp>/ecommerce-browser playwright`, then run `node scripts/capture-commerce.cjs` for source captures. Run the app on port 3000 and `node scripts/check-commerce.cjs` for the local responsive and interaction checks.
