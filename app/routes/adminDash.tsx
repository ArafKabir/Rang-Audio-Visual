import { useAuth } from "~/context/AuthContext";
import { useNavigate } from "react-router";
import SplitText from "~/components/SplitText"

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

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
    };

    function handleUpdate() {

    }

    const cards = [
        {
            title: "Events",
            description: "Manage and create events for Rang Audio Visual",
            actions: [
                { label: "Create Event", href: "/createEvent" },
                { label: "View All Events", href: "/viewAllEvents" },
            ],
            gradient: "from-[#CCDCE6] via-[#7FC4DB] to-[#4588B5]",
        },
        {
            title: "Employees",
            description: "View or add employees working with Rang Audio Visual",
            actions: [
                { label: "Add Employee", href: "/admin/employee/addEmployee" },
                { label: "View All Employees", href: "/admin/employee/viewEmployees" },
            ],
            gradient: "from-[#CCDCE6] via-[#7FC4DB] to-[#4588B5]",
        },
        {
            title: "Profile",
            description: "Update your admin profile and view details",
            actions: [
                { label: "Update", onClick: () => handleUpdate() },
                { label: "Logout", onClick: () => handleLogout() },
            ],
            gradient: "from-[#CCDCE6] via-[#7FC4DB] to-[#4588B5]",
        },
    ];

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="flex flex-col items-center justify-center">

                        <SplitText
                            text= {`Welcome, ${admin.name}`}
                            className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400"
                            delay={80}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                    </div>
                    <SplitText
                        text= {`Manage events, employees, and your profile here.`}
                        className="text-gray-600 dark:text-gray-400 mt-1"
                        delay={80}
                        duration={0.8}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className={`group relative p-6 rounded-2xl shadow-lg
                bg-gradient-to-br ${card.gradient}
                text-white transition-transform transform hover:-translate-y-2
                hover:shadow-2xl`}
                        >
                            <div className="absolute inset-0 bg-black/20 rounded-2xl backdrop-blur-md" />
                            <div className="relative z-50">
                                <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                                <p className="text-sm opacity-90 mb-4">{card.description}</p>

                                <div className="space-y-2">
                                    {card.actions.map((action) => (
                                        <button
                                            key={action.label}
                                            onClick={() => {
                                                if ("onClick" in action) {
                                                    action.onClick();
                                                } else {
                                                    navigate(action.href);
                                                }
                                            }}
                                            className="block w-full text-left px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30
                                 backdrop-blur-md font-medium text-sm transition-colors"
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
