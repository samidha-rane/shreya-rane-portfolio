/* ==========================================================
   PORTFOLIO PROJECTS
   ----------------------------------------------------------
   Edit this list to add your real projects. Each project
   shows on the Portfolio page; set featured: true to also
   show it on the Home page (up to 3).

   category: "seo", "ads" or "web". Keep SEO and paid work as separate entries:
               if you do both for one client, add the client twice.
   caseStudy:   optional link to a full case study page
   results:  up to 3 headline numbers, e.g. { value: "+120%", label: "organic traffic" }
   pending: true       -> real client, results not added yet ("Results coming soon").
                          Delete this line once you add results.
   placeholder: true   -> sample card for illustration only.
                          Delete the whole entry once you have real projects.
   ========================================================== */

window.PROJECTS = [
  /* ---------- Paid search case studies ---------- */
  {
    title: "MR Travels",
    client: "Self-drive car rentals, Goa",
    caseStudy: "/case-study-mrtravels-google-ads",
    category: "ads",
    summary: "Google Ads since 2022. A search campaign for self-drive car rentals, tracking bookings and phone calls.",
    results: [
      { value: "2,886", label: "conversions" },
      { value: "7.02%", label: "of clicks converted" },
      { value: "₹263", label: "per conversion" }
    ],
    tools: "Google Ads",
    featured: true
  },

  {
    title: "Kamaxi Skills",
    client: "Culinary training institute",
    caseStudy: "/case-study-kamaxi-google-ads",
    category: "ads",
    summary: "Admissions campaigns across Search, Performance Max, Display and Demand Gen, targeting Goa, Kerala, Chennai and Gurugram.",
    results: [
      { value: "5,094", label: "conversions" },
      { value: "3.4x", label: "conversions vs previous period" },
      { value: "681", label: "phone calls from ads" }
    ],
    tools: "Google Ads, Performance Max, Demand Gen, GA4",
    featured: true
  },

  /* ---------- Eleve Goa: paid and SEO kept as separate projects ---------- */
  {
    title: "Eleve Goa",
    client: "Eco-luxury stays, Assagao, Goa",
    caseStudy: "/case-study-eleve-google-ads",
    category: "ads",
    summary: "Search campaign since May 2026, with conversions tracked from contact forms, lead forms and calls from ads.",
    results: [
      { value: "194", label: "conversions" },
      { value: "15.16%", label: "click-through rate" },
      { value: "₹448", label: "per conversion" }
    ],
    tools: "Google Ads, Google Tag Manager",
    featured: false
  },
  {
    title: "Eleve Goa",
    client: "Eco-luxury stays, Assagao, Goa",
    caseStudy: "/case-study-eleve-seo",
    category: "seo",
    summary: "Ongoing SEO for elevegoa.com since May 2026, tracked in GA4 by channel, landing page and country.",
    results: [
      { value: "13.8k", label: "organic search sessions in 2026" },
      { value: "27%", label: "of all site traffic" },
      { value: "124", label: "countries reached" }
    ],
    tools: "GA4, Google Search Console",
    featured: true
  },

  {
    title: "Infiniti Modules Pvt Ltd",
    client: "School, office and hospitality furniture",
    caseStudy: "/case-study-infiniti-google-ads",
    category: "ads",
    summary: "Google Ads since 2022. Search and Performance Max campaigns for school furniture, tracking enquiries, brochure downloads and conversations.",
    results: [
      { value: "438", label: "conversions in 2026" },
      { value: "₹235", label: "per conversion" },
      { value: "36%", label: "lower cost per conversion" }
    ],
    tools: "Google Ads, Performance Max, GA4",
    featured: true
  },

  {
    title: "Smile Factory",
    client: "smilefactory.in, UK audience",
    caseStudy: "/case-study-smilefactory-google-ads",
    category: "ads",
    summary: "Google Ads since 2022. A UK search campaign tracking appointment bookings.",
    results: [
      { value: "110", label: "appointment bookings" },
      { value: "7.05%", label: "click-through rate" },
      { value: "72.6%", label: "top-of-page impressions" }
    ],
    tools: "Google Ads, GA4",
    featured: false
  },
  {
    title: "Smile Factory",
    client: "smilefactory.in, UK audience",
    caseStudy: "/case-study-smilefactory-seo",
    category: "seo",
    summary: "SEO for a UK audience. Organic visitors are the most engaged of any major channel.",
    results: [
      { value: "644", label: "organic search users in 2026" },
      { value: "1m 50s", label: "avg. engagement time" },
      { value: "72", label: "key events" }
    ],
    tools: "GA4, Google Search Console",
    featured: true
  },

  {
    title: "Riviera Goa",
    client: "Projects: The Lanai and Brook Lane",
    caseStudy: "/case-study-riviera-google-ads",
    category: "ads",
    summary: "Search and Demand Gen campaigns for two projects, tracking enquiries, register-your-interest sign-ups, WhatsApp chats and calls.",
    results: [
      { value: "26,045", label: "clicks" },
      { value: "569", label: "phone calls from ads" },
      { value: "712k", label: "impressions" }
    ],
    tools: "Google Ads, Demand Gen",
    featured: false
  },

  {
    title: "Goa Taxi N Cabs",
    client: "Taxi and cab bookings, Goa",
    caseStudy: "/case-study-goataxincabs-google-ads",
    category: "ads",
    summary: "Search campaign tracking website bookings, WhatsApp enquiries and calls, with a detailed report every month.",
    results: [
      { value: "205", label: "conversions in Oct 2026" },
      { value: "23.6%", label: "conversion rate" },
      { value: "24%", label: "lower cost per conversion since Nov 2025" }
    ],
    tools: "Google Ads, monthly reporting",
    featured: false
  },

  /* ---------- Google Ads clients (add results when ready) ---------- */

  /* ---------- Samples: replace with real SEO and website projects ---------- */
  {
    title: "WordPress website rebuild and on-page SEO",
    client: "Client name or industry, location",
    category: "web",
    summary: "What the site needed, what you built or improved, and how it performs now.",
    results: [
      { value: "+00%", label: "enquiries" }
    ],
    tools: "WordPress, AIOSEO, Canva",
    featured: false,
    placeholder: true
  }
];
