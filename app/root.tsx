import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";

import { Footer } from "./components/Footer";
import CardNav from "./components/CardNav";
import { AuthProvider } from "~/context/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/* Add meta() for title, description, and viewport */
export function meta() {
    return [
        { title: "Rang Audio Visual" },
        {
            name: "description",
            content:
                "Rang Audio Visual provides professional LED screen rentals, audiovisual setup, and live event production across Alberta.",
        },
        {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
        },
        { name: "theme-color", content: "#0E2348" },
    ];
}

/* Layout for SSR - includes viewport, links, and scripts */
export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth">
        <head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />

            <meta name="description" content="Rang Audio Visual - LED screen rentals and event production" />
            <meta name="theme-color" content="#0E2348" />

            <title>Rang Audio Visual</title>

            <Links />
            <script
                type="module"
                src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
            ></script>
        </head>

        <body
            className="
          flex flex-col min-h-screen
          bg-gradient-to-br from-[#CD98B6] via-[#6C95DE] to-[#8CF2EB]
          dark:from-[#070104] dark:via-[#0E2348] dark:to-[#34080B]
          transition-colors duration-700
        "
        >
        <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <main className="flex-grow">{children}</main>
                <Footer />
            </LocalizationProvider>
        </AuthProvider>

        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}


/* Main Root Component */
export default function Root() {
    const navItems = [
        {
            label: "Main",
            bgColor: "#E0CECE",
            textColor: "#000",
            links: [
                { label: "Home", href: "/", ariaLabel: "Go to Home" },
                { label: "About Us", href: "/about", ariaLabel: "Learn about us" },
                { label: "Contact", href: "/contact", ariaLabel: "Contact us" },
                { label: "Privacy Policy", href: "/privacy", ariaLabel: "See privacy policy" },
            ],
        },
        {
            label: "Explore",
            bgColor: "#CCE3ED",
            textColor: "#000",
            links: [
                { label: "Photos", href: "/photos", ariaLabel: "See photos" },
                { label: "Pricing", href: "/pricing", ariaLabel: "View pricing" },
                {
                    label: "Facebook",
                    href: "https://www.facebook.com/profile.php?id=61561435937177",
                    ariaLabel: "Facebook Page",
                },
                {
                    label: "Instagram",
                    href: "https://www.instagram.com/rangaudiovisual",
                    ariaLabel: "Instagram Page",
                },
            ],
        },
        {
            label: "Account",
            bgColor: "#FFF7ED",
            textColor: "#000",
            links: [{ label: "Login", href: "/login", ariaLabel: "Go to login" }],
        },
    ];

    return (
        <>
            {/* Sticky translucent navbar */}
            <CardNav
                logo="/RAV logo1.png"
                logoAlt="Rang Audio Visual"
                items={navItems}
                baseColor="rgba(255, 255, 255, 0.15)"
                menuColor="#000000"
                className="
          top-4 backdrop-blur-md
          rounded-2xl shadow-lg
          transition-all duration-500
        "
                buttonBgColor="transparent"
                buttonTextColor="#ffffff"
            />

            {/* Main routed content */}
            <main className="p-4 pt-24">
                <Outlet />
            </main>
        </>
    );
}

/* Error boundary with styled fallback */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto text-center">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">{message}</h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8">{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto text-left bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <code>{stack}</code>
        </pre>
            )}
            <a
                href="/"
                className="inline-block mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
                Go Back Home
            </a>
        </main>
    );
}
