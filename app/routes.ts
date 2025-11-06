import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("pricing", "routes/pricing.tsx"),
    route("contact", "routes/contact.tsx"),
    route("photos", "routes/photos.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("login", "routes/login.tsx"),
    route("adminDash", "routes/adminDash.tsx"),
] satisfies RouteConfig;