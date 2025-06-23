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
      route("sign-in", "routes/admin-sign-in.tsx"),
      route("finances", "routes/finances.tsx"),
      route("personal-info", "routes/personal-info.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
