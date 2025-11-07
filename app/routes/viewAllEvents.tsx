import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllEvents, type EventDTO } from "~/api/eventApi";

export default function ViewEvents() {
    const [events, setEvents] = useState<EventDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading events...
            </div>
        );

    if (events.length === 0)
        return (
            <div className="text-center text-gray-500 mt-20">
                No events found.
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Back button */}
            <button
                onClick={() => navigate("/adminDash")}
                className="mb-6 inline-flex items-center text-indigo-500 hover:text-indigo-700 font-medium"
            >
                ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                All Events
            </h1>

            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => navigate(`/eventDetails/${event.id}`)}
                        className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                                   transition rounded-lg shadow-md p-5 cursor-pointer flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {event.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                {new Date(event.date).toLocaleDateString()} • {event.location}
                            </p>
                        </div>
                        <span className="text-indigo-500 font-medium">View →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
