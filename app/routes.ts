import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    route("contacts/:contactId", "routes/contact.tsx"),
    route("contacts/:contactId/edit", "routes/edit-contact.tsx"),
    route("contacts/:contactId/destroy", "routes/destroy-contact.tsx"),
  ]),

  layout("layouts/user-layout.tsx", [
    route("/about", "routes/about.tsx"),
    route("/posts/:postId", "routes/posts.tsx"),
  ]),

  /// Nested Routes
  layout("layouts/dashboard-layout.tsx", [
    ...prefix("dashboard", [
      index("routes/dashboard.tsx"),
      /// DASHBOARD AUTHENTICATION
      route("sign-in", "routes/admin-sign-in.tsx"),
      route("auth/sign-up", "routes/dashboard/auth/sign-up.tsx"),
      route("auth/sign-in", "routes/dashboard/auth/sign-in.tsx"),

      route("finances", "routes/finances.tsx"),
      route("personal-info", "routes/personal-info.tsx"),

      route("maps", "routes/dashboard/maps.tsx"),

      /// DASHBOARD PRODUCTS
      route("products", "routes/dashboard/products/products.tsx", [
        route(":id", "routes/dashboard/products/product-detail.tsx"),
        route(":id/delete", "routes/dashboard/products/delete-product.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
