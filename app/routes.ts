import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("pricing", "routes/pricing.tsx"),
    route("contact", "routes/contact.tsx"),
    route("photos", "routes/photos.tsx"),
    route("privacy", "routes/privacy.tsx"),
    route("login", "routes/login.tsx"),

    // admin-related routes
    route("adminDash", "routes/adminDash.tsx"),
    route("viewAllEvents", "routes/viewAllEvents.tsx"),
    route("createEvent", "routes/createEvent.tsx"),
    route("updateAdmin", "routes/updateAdmin.tsx"),

    // event-related routes
    route("eventDetails/:id", "routes/eventDetails.tsx"),
    route("/admin/event/:eventId/addWorkSession/:employeeId", "routes/addWorkSession.tsx"),

    //employee-related routes
    route("addEmployee", "routes/addEmployee.tsx"),
    route("viewEmployees", "routes/viewEmployees.tsx"),
    route("employeeDetails/:id", "routes/employeeDetails.tsx"),
    route("updateEmployee/:id", "routes/updateEmployee.tsx"),
] satisfies RouteConfig;
