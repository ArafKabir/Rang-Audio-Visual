import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router";

export default function AdminDash() {
    const { admin } = useAuth();
    const navigate = useNavigate();

    if (!admin) {
        return (
            <div className="text-center mt-20 text-red-500">
                Unauthorized – please <a href="/login" className="underline">login</a>.
            </div>
        );
    }

    const cards = [
        {
            title: "Events",
            description: "Manage and create events for Rang Audio Visual",
            actions: [
                { label: "Create Event", href: "/admin/events/create" },
                { label: "Manage Events", href: "/admin/events/manage" },
                { label: "View All Events", href: "/admin/events" },
            ],
            gradient: "from-indigo-500 via-blue-400 to-cyan-400",
        },
        {
            title: "Employees",
            description: "View or add employees working with Rang Audio Visual",
            actions: [
                { label: "Add Employee", href: "/admin/employees/create" },
                { label: "View All Employees", href: "/admin/employees" },
            ],
            gradient: "from-emerald-500 via-green-400 to-lime-400",
        },
        {
            title: "Profile",
            description: "Update your admin profile and view details",
            actions: [
                { label: "View Profile", href: "/admin/profile" },
                { label: "Update Profile", href: "/admin/profile/edit" },
                { label: "Logout", onClick: () => handleLogout() },
            ],
            gradient: "from-pink-500 via-rose-400 to-orange-400",
        },
    ];

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Welcome, {admin.name}!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage events, employees, and your profile here.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className={`
                group relative p-6 rounded-2xl shadow-lg
                bg-gradient-to-br ${card.gradient}
                text-white transition-transform transform hover:-translate-y-2
                hover:shadow-2xl
              `}
                        >
                            <div className="absolute inset-0 bg-black/20 rounded-2xl backdrop-blur-md" />
                            <div className="relative z-50">
                                <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                                <p className="text-sm opacity-90 mb-4">{card.description}</p>

                                <div className="space-y-2">
                                    {card.actions.map((action) =>
                                        action.onClick ? (
                                            <button
                                                key={action.label}
                                                onClick={action.onClick}
                                                className="
                          block w-full text-left px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30
                          backdrop-blur-md font-medium text-sm
                          transition-colors
                        "
                                            >
                                                {action.label}
                                            </button>
                                        ) : (
                                            <button
                                                key={action.label}
                                                onClick={() => navigate(action.href)}
                                                className="
                          block w-full text-left px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30
                          backdrop-blur-md font-medium text-sm
                          transition-colors
                        "
                                            >
                                                {action.label}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
