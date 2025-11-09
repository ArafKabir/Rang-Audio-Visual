import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    getEventById,
    getEmployeesForEvent,
    assignEmployeeToEvent,
    type EventDTO,
    type EventEmployeeDTO,
} from "~/api/eventApi";
import { getAllEmployees, type EmployeeDTO } from "~/api/employeeApi";

export default function EventDetails() {
    const { id } = useParams(); // eventId
    const [event, setEvent] = useState<EventDTO | null>(null);
    const [employees, setEmployees] = useState<EventEmployeeDTO[]>([]);
    const [allEmployees, setAllEmployees] = useState<EmployeeDTO[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [assigning, setAssigning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const [eventData, employeeData, allEmployeeList] = await Promise.all([
                    getEventById(id),
                    getEmployeesForEvent(id),
                    getAllEmployees(),
                ]);

                setEvent(eventData);
                setEmployees(employeeData);
                setAllEmployees(allEmployeeList);
            } catch (error) {
                console.error("Error loading event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    async function handleAssignEmployee() {
        if (!id || !selectedEmployee) return;
        setAssigning(true);
        try {
            await assignEmployeeToEvent(Number(id), selectedEmployee);
            const updatedEmployees = await getEmployeesForEvent(id);
            setEmployees(updatedEmployees);
            setSelectedEmployee(null);
        } catch (error) {
            console.error("Error assigning employee:", error);
        } finally {
            setAssigning(false);
        }
    }

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading event details...
            </div>
        );

    if (!event)
        return (
            <div className="text-center text-red-500 mt-20">Event not found.</div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate("/adminDash")}
                className="mb-4 text-indigo-500 hover:text-indigo-700 font-medium"
            >
                ← Back to Dashboard
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

            {/* Employee Assignment */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Employees Working on This Event
                    </h2>

                    <div className="flex gap-2 items-center">
                        <select
                            value={selectedEmployee ?? ""}
                            onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                            className="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
                        >
                            <option value="">Select Employee</option>
                            {allEmployees.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.firstName} {emp.lastName} — {emp.email}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleAssignEmployee}
                            disabled={!selectedEmployee || assigning}
                            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-md px-3 py-1"
                        >
                            {assigning ? "Adding..." : "Add"}
                        </button>
                    </div>
                </div>

                {/* Employee List */}
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
                                        Total Hours: {(emp.totalHoursWorked ?? 0).toFixed(2)}
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
