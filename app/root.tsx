import {
    isRouteErrorResponse,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./app.css";
import { Footer } from "./components/Footer";
import { DarkModeToggle } from "~/components/DarkModeToggle";
import CardNav from "./components/CardNav";
import {AuthProvider} from "~/context/AuthContext"; // ✅ import your new CardNav component

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <Meta />
            <Links />
            <script
                type="module"
                src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
            ></script>
        </head>

        {/* gradient background to the entire site */}
        <body
            className="
                    flex flex-col min-h-screen
                    bg-gradient-to-br from-[#CFD7E6] via-[#B8D6D6] to-[#7A93A3]
                    dark:from-gray-950 dark:via-gray-700 dark:to-blue-950
                    transition-colors duration-700
                "
        >
        <AuthProvider>
            <header></header>
            <main className="flex-grow">{children}</main>
            <Footer />
        </AuthProvider>

        <ScrollRestoration />
        <Scripts />
        </body>
        </html>
    );
}

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
                { label: "Terms and Conditions", href: "/terms", ariaLabel: "See terms and conditions" },
            ],
        },
        {
            label: "Explore",
            bgColor: "#CCE3ED",
            textColor: "#000",
            links: [
                { label: "Photos", href: "/photos", ariaLabel: "See photos" },
                { label: "Pricing", href: "/pricing", ariaLabel: "View pricing" },
                { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61561435937177", ariaLabel: "Facebook Page" },
                { label: "Instagram", href: "https://www.instagram.com/rangaudiovisual", ariaLabel: "Instagram Page" },
            ],
        },
        {
            label: "Account",
            bgColor: "#FFF7ED",
            textColor: "#000",
            links: [
                { label: "Login", href: "/login", ariaLabel: "Toggle dark mode" },
            ],
        },
    ];

    return (
        <>

            <CardNav
                logo="/RAV logo1.png"
                logoAlt="Rang Audio Visual"
                items={navItems}
                baseColor="rgba(255, 255, 255, 0.15)"       // transparent white for light mode
                menuColor="#000000"
                className="
                top-4
                backdrop-blur-md

                rounded-2xl
                shadow-lg
                transition-all duration-500
              "

                buttonBgColor="transparent"
                buttonTextColor="#ffffff"
            />

            {/* Main content */}
            <main className="p-4 pt-24">
                <Outlet />
            </main>
        </>
    );
}

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
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
            )}
        </main>
    );
}
