export interface CommerceProject {
  slug: string;
  name: string;
  category: string;
  headline: string;
  intro: string;
  url: string;
  domain: string;
  tone: CommerceTone;
  stack: string[];
  story: { title: string; text: string }[];
  details: string[];
  architecture: {
    heading: string;
    frontendLabel: string;
    frontend: string;
    backendLabel: string;
    backend: string;
    flowTitle: string;
    flow: { title: string; text: string }[];
    technical: string;
  };
  /** Which evidence panel follows the story. */
  evidence: "search-snapshot" | "search-analytics" | "preview-status";
  linkLabel: string;
  screens: { source: string; mobileSuffix?: string; mobileSubject?: string; mobileCaption?: string };
  launchNote?: string;
  /** Stated to the best of the user's knowledge; excluded for Augusta, whose brand has its own marketing team. */
  reachNote?: { title: string; text: string };
}

export type CommerceTone = "sage" | "lilac" | "rose";

// Include only projects verified against the user's source and the live storefront.
// Capture provenance and unresolved scope live in docs/ecommerce-projects-research.md.
export const COMMERCE_PROJECTS: CommerceProject[] = [
  {
    slug: "augusta-newham",
    name: "Augusta Newham",
    category: "Lingerie & shapewear",
    headline: "A better foundation for every body.",
    intro: "A responsive, headless Shopify store with a custom Next.js frontend and automatic discounts for newsletter subscribers.",
    url: "https://www.augustanewham.com",
    domain: "augustanewham.com",
    tone: "sage",
    stack: ["Next.js", "TypeScript", "Shopify Storefront API"],
    story: [
      {
        title: "The starting point",
        text: "Augusta Newham is an inclusive basewear label bringing its product range to market. The store presents bodysuits, bralettes, briefs and shapewear, with sizing from XXS to 8XL. My responsibility was the storefront and commerce experience. The brand has its own marketing team; campaigns and customer acquisition were outside my role.",
      },
      {
        title: "A storefront built for the range",
        text: "I built the responsive frontend in Next.js, using Shopify as the commerce backend. That gave the brand a custom browsing experience while keeping its catalogue, product variants and checkout in Shopify. Four clear product families, a size guide and quick-add controls help shoppers move from understanding the range to choosing a piece on desktop or mobile.",
      },
      {
        title: "A subscriber benefit that just works",
        text: "The newsletter needed to do more than collect emails. I created a dedicated customer category for subscribers and connected it to discount eligibility in the Next.js experience. The application checks the customer’s subscription status and applies the eligible product discount automatically. Subscribers do not need to remember, copy or enter a discount code.",
      },
      {
        title: "Ready for a new chapter",
        text: "The work brings brand presentation, product discovery and subscriber incentives into one shopping experience. With the product launch still recent, this case study documents the functionality delivered. There are no conversion-rate optimisation results to report yet, and it does not attribute the marketing team’s work to the storefront build.",
      },
    ],
    details: ["Responsive Next.js storefront", "Shopify commerce backend", "Newsletter subscriber category", "Automatic subscriber discounts"],
    architecture: {
      heading: "Custom storefront. Shopify underneath.",
      frontendLabel: "Next.js storefront",
      backendLabel: "Shopify backend",
      frontend: "Next.js owns the customer-facing experience: the responsive layouts, product discovery, newsletter interaction and subscriber eligibility checks.",
      backend: "Shopify holds the commerce layer: the product catalogue, variants, customer records, orders and checkout. The Storefront API connects that data to the custom frontend.",
      flowTitle: "From subscription to a better price",
      flow: [
        { title: "Subscribe", text: "The customer joins the brand’s newsletter." },
        { title: "Check eligibility", text: "Subscriber status identifies the eligible customer category." },
        { title: "Apply the benefit", text: "The eligible product discount is applied without a code." },
      ],
      technical: "This is a headless storefront: the customer sees a Next.js application rather than a Shopify theme. Shopify remains the commerce backend. The subscriber category and automatic eligibility behaviour are part of my implementation; the marketing team manages the brand’s marketing. No discount percentage or campaign performance is claimed here.",
    },
    evidence: "search-snapshot",
    linkLabel: "Visit the store",
    screens: { source: "Captured from the live storefront", mobileSuffix: "-collection", mobileSubject: "shapewear collection", mobileCaption: "The shapewear collection on mobile" },
    launchNote: "Recently launched · CRO results not yet available",
  },
  {
    slug: "920-luxury",
    name: "920 Luxury",
    category: "Hair & appointments",
    headline: "Buy the hair. Book the chair.",
    intro: "A responsive Next.js storefront and a built-in appointment app, powered by Shopify and connected to the stylist’s calendar.",
    url: "https://www.920luxury.com",
    domain: "920luxury.com",
    tone: "lilac",
    stack: ["Next.js", "TypeScript", "Shopify Storefront API", "Google Calendar"],
    story: [
      {
        title: "More than an online hair shop",
        text: "920 Luxury sells hair and styles it. Before the build, weekly sales were close to zero. I built a responsive storefront that gives customers a place to browse and purchase hair, alongside an appointment application inside the same website. Shopping and booking become connected parts of getting their hair done.",
      },
      {
        title: "Removing the delivery detour",
        text: "Customers can buy hair from the business and book the stylist who will install it. For customers having their hair fitted there, it can be ready at the salon when they arrive, instead of being delivered to them first. Hair purchases and appointment deposits have their own checkout flows, but both live within the same website and support the same customer journey.",
      },
      {
        title: "An appointment app, built in",
        text: "The booking flow walks customers through a service, relevant options and add-ons, a date, an available time, their details and a final review. Pricing and service duration follow the choices they make. Google Calendar supplies availability; the customer then pays the appointment deposit through Shopify checkout. Once Shopify reports the order as paid, the application creates the calendar booking and sends the owner an email notification.",
      },
      {
        title: "A store that supports the service",
        text: "The reported weekly picture after the build is around 50 website visits, 15 confirmed sales and 15–20 appointments, compared with sales close to zero beforehand. The benefit is practical as well as commercial: customers can arrange the hair and the appointment in one place, and the stylist can prepare for their arrival. Below, the Search Console export shows organic search activity alongside those reported business results.",
      },
    ],
    details: ["Responsive hair catalogue", "Built-in appointment app", "Shopify deposit checkout", "Calendar & email integration"],
    architecture: {
      heading: "Custom storefront. Shopify underneath.",
      frontendLabel: "Next.js storefront",
      backendLabel: "Shopify backend",
      frontend: "Next.js renders collections, product options, search and the cart. It also runs the guided booking interface, with service choices, add-ons, dates, available times and a review step.",
      backend: "Shopify is the backend for the catalogue, product variants, carts, customer accounts, orders and checkout. Both hair purchases and appointment deposits use Shopify’s checkout.",
      flowTitle: "How a booking reaches the stylist",
      flow: [
        { title: "Choose & schedule", text: "Service duration and Google Calendar availability determine the appointment options." },
        { title: "Pay the deposit", text: "Next.js creates a Shopify deposit cart carrying the appointment details." },
        { title: "Confirm & prepare", text: "A paid-order webhook creates the calendar event and emails the stylist." },
      ],
      technical: "The frontend calls Next.js API routes, which use Shopify Storefront GraphQL queries and cart mutations. The shopping cart ID is retained in an HTTP-only cookie. Booking checkout creates a separate cart containing a deposit product; service, customer and appointment details travel as cart attributes. The Shopify orders/paid webhook verifies the request signature, reads those details and creates a Google Calendar event with reminders and a customer invitation. Calendar availability checks use service duration and London time. Hair and appointment deposits are separate orders, not a combined checkout.",
    },
    evidence: "search-analytics",
    linkLabel: "Visit the store",
    screens: { source: "Captured from the live storefront" },
    reachNote: { title: "100% organic reach.", text: "To the best of my knowledge, 920 Luxury has run no paid ads and no marketing campaigns. Every visit, sale and booking shown here came without them." },
  },
  {
    slug: "brownie-bakes",
    name: "Brownie Bakes",
    category: "Cookies & custom orders",
    headline: "A cookie box worth opening.",
    intro: "An early preview for a Kamloops cookie bakery: a Next.js experience with a 3D cookie box, a build-your-own cookie studio and an order-enquiry flow.",
    url: "https://browniebakes.notanothershittydemo.site/",
    domain: "browniebakes.notanothershittydemo.site",
    tone: "rose",
    stack: ["Next.js", "React", "TypeScript", "Three.js"],
    story: [
      {
        title: "The starting point",
        text: "Brownie Bakes is a small bakery in Kamloops, British Columbia, with five signature cookie flavours and orders arranged by message. The brief was a site that feels as indulgent as the product: somewhere to meet the flavours, see box sizes and prices, and start an order without losing the personal contact customers already have with the bakery.",
      },
      {
        title: "Making the cookies the hero",
        text: "The homepage opens on a 3D cookie box that customers can open with a click. It is rendered with Three.js from a compressed model; if WebGL is unavailable, matching open and closed images keep the interaction working, and reduced-motion preferences skip the lid animation. Each flavour has its own page with photography, a description and box-size pricing.",
      },
      {
        title: "Build your own cookie",
        text: "A custom cookie studio lets customers choose a base and up to four toppings, from chocolate chunks to freeze-dried strawberry, and watch them land on a live preview. Toppings keep their positions as others are added or removed, the price updates with each extra, and the preview docks in the corner while the customer works through the options.",
      },
      {
        title: "Where it stands",
        text: "This is an early preview, pending review with the bakery before handover. Orders are currently enquiries: the site composes a message that the customer sends to the bakery on Instagram, and the bakery confirms availability and price. The build also contains a prototype cart with pickup or local delivery and preparation dates, but online payment is not switched on and nothing is charged. There are no sales or conversion results to report.",
      },
    ],
    details: ["Five-flavour menu with box pricing", "Interactive 3D cookie box", "Build-your-own cookie studio", "Instagram order enquiries"],
    architecture: {
      heading: "A rich front end. No payments yet.",
      frontendLabel: "Next.js experience",
      frontend: "Next.js serves the menu, flavour pages, visit details, FAQs and policy pages. The 3D cookie box and the cookie studio load Three.js on the client only, with image fallbacks when WebGL is unavailable.",
      backendLabel: "Prototype order flow",
      backend: "There is no commerce backend yet. The prototype cart, fulfilment choice and order confirmation live in the browser, and the enquiry is sent by the customer through Instagram. Prices and fees are placeholders until the bakery confirms them.",
      flowTitle: "From craving to confirmed order",
      flow: [
        { title: "Choose or build", text: "The customer picks a signature flavour or builds a custom cookie." },
        { title: "Box it up", text: "They choose a box size and see the price for that box." },
        { title: "Confirm with the bakery", text: "The enquiry goes to Brownie Bakes on Instagram to confirm details before paying." },
      ],
      technical: "Three.js, its GLTF and Draco loaders load lazily after the page renders, so the scene does not block the first view. The cookie box renderer handles WebGL context loss and disposes its geometry, materials and textures on unmount. Topping placement is seeded from each topping's ID, so pieces never move when the selection changes. The prototype cart persists to local storage and syncs across tabs; its checkout validates Kamloops postal codes for delivery and offers dates after a two-business-day preparation window. The checkout is explicitly labelled as a demo: no card details are collected and no order reaches the bakery.",
    },
    evidence: "preview-status",
    linkLabel: "View the preview",
    screens: { source: "Captured from the hosted preview" },
    launchNote: "Early preview · Pending review and handover",
    reachNote: { title: "No paid ads. No marketing.", text: "To the best of my knowledge, Brownie Bakes has not been promoted through paid ads or any marketing for this site." },
  },
];

// User-reported approximate weekly snapshot, not an analytics export or a time series.
// Sales and appointments may overlap; these are not successive funnel stages.
export const LUXURY_WEEKLY_RESULTS = [
  { name: "Website visits", count: 50, range: 0, display: "≈50", countLabel: "≈50", rangeLabel: "", detail: "Around 50 visits per week", color: "#60745a" },
  { name: "Confirmed sales", count: 15, range: 0, display: "15", countLabel: "15", rangeLabel: "", detail: "Around 15 confirmed sales per week", color: "#20392c" },
  { name: "Appointments", count: 15, range: 5, display: "15–20", countLabel: "", rangeLabel: "15–20", detail: "Around 15–20 appointments per week", color: "#74638d" },
];
