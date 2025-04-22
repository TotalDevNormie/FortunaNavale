import {
  type RouteConfig,
  index,
  prefix,
  route, // Import route if you add more pages
} from "@react-router/dev/routes";

export default [
  // 1. Redirect from the absolute root '/'
  // This uses the loader in root-redirect.tsx to redirect to /en (or your default lang)
  index("routes/root-redirect.tsx"),

  // 2. Define all language-specific routes under the :lang prefix
  ...prefix(":lang", [
    // Your original home page, now accessible at /:lang/
    index("routes/home.tsx"),

    // --- Add other application routes here ---
    // Example: About page at /:lang/about
    // route("about", "routes/about.tsx"),

    // Example: Services page at /:lang/services
    // route("services", "routes/services.tsx"),

    // Example: Contact page at /:lang/contact
    // route("contact", "routes/contact.tsx"),

    // Example: Nested routes if needed
    // route("dashboard", "routes/dashboard/layout.tsx", [
    //   index("routes/dashboard/home.tsx"), // /:lang/dashboard/
    //   route("settings", "routes/dashboard/settings.tsx"), // /:lang/dashboard/settings
    // ]),
  ]),

  // 3. Optional: Add a catch-all 404 route at the end
  // Make sure its path doesn't conflict with the :lang prefix logic
  // route("*", "routes/404.tsx"), // Matches any path not caught above
] satisfies RouteConfig;
