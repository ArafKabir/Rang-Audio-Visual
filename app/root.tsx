import {
  isRouteErrorResponse, Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {Footer} from "./components/Footer";
import {DarkModeToggle} from "~/components/DarkModeToggle";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
        <Meta/>
        <Links/>
      </head>
      <body className="flex flex-col min-h-screen">
      {/* header/nav would go here */}
      <header>{/* … */}</header>

      {/* page content */}
      <main className="flex-grow">{children}</main>

      {/* global footer */}
      <Footer/>

      <ScrollRestoration/>
      <Scripts/>
      </body>
      </html>
  );
}

export default function App() {
  return (
      <>
        <nav className="bg-gray-900 shadow-md px-8 py-4 flex justify-between items-center">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/RangIcon.png" alt="Rang Icon" className="w-8 h-8" />
            <span className="text-2xl font-bold text-indigo-600">Rang Audio Visual</span>
          </Link>

          {/* Navigation links on the right */}
          <div className="space-x-6 text-gray-50 font-medium">
            <Link to="/about" className="hover:text-indigo-600">About Us</Link>
            <Link to="/pricing" className="hover:text-indigo-600">Pricing</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact</Link>
            <Link to="/photos" className="hover:text-indigo-600">Photos</Link>
          </div>
            <DarkModeToggle />
        </nav>

        {/* Main content goes here */}
        <main className="p-4">
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
