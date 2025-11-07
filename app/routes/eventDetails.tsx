import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    getEventById,
    getEmployeesForEvent,
    type EventDTO,
    type EmployeeSummary,
} from "~/api/eventApi";

export default function EventDetails() {
    const { id } = useParams(); // eventId
    const [event, setEvent] = useState<EventDTO | null>(null);
    const [employees, setEmployees] = useState<EmployeeSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const [eventData, employeeData] = await Promise.all([
                    getEventById(id),
                    getEmployeesForEvent(id),
                ]);
                setEvent(eventData);
                setEmployees(employeeData);
            } catch (error) {
                console.error("Error loading event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading event details...
            </div>
        );

    if (!event)
        return (
            <div className="text-center text-red-500 mt-20">
                Event not found.
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-indigo-500 hover:text-indigo-700 font-medium"
            >
                ← Back to Events
            </button>

            {/* Event Info */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {event.name}
                </h1>
                <p className="text-gray-700 dark:text-gray-300">
                    Location: {event.location}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    Date: {new Date(event.date).toLocaleDateString()}
                </p>
            </div>

            {/* Employees List */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Employees Working on This Event
                </h2>

                {employees.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                        No employees assigned to this event.
                    </p>
                ) : (
                    <div className="space-y-3">
                        {employees.map((emp) => (
                            <div
                                key={emp.employeeId}
                                onClick={() =>
                                    navigate(`/admin/event/${id}/addWorkSession/${emp.employeeId}`)
                                }
                                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer rounded-lg px-4 py-3"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        {emp.employeeName}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Hours: {emp.totalHours.toFixed(2)}
                                    </p>
                                </div>
                                <span className="text-indigo-500 font-medium">→</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
