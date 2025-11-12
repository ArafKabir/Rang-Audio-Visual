import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllEmployees } from "~/api/employeeApi";
import type { EmployeeDTO } from "~/api/employeeApi";

export default function ViewEmployees() {
    const [employees, setEmployees] = useState<EmployeeDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            try {
                const data = await getAllEmployees();
                setEmployees(data);
            } catch (e) {
                console.error("Error fetching employees:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading employees...
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto p-6">
            <button
                onClick={() => navigate("/adminDash")}
                className="mb-4 text-indigo-500 hover:text-indigo-700 font-medium"
            >
                ← Back to Dashboard
            </button>

            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
                Employee Directory
            </h1>

            {employees.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center">
                    No employees found.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map((emp) => (
                        <div
                            key={emp.id}
                            onClick={() => navigate(`/employeeDetails/${emp.id}`)}
                            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 cursor-pointer
              hover:shadow-xl transition transform hover:-translate-y-1"
                        >
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {emp.firstName} {emp.lastName}
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Email: {emp.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Phone: {emp.phoneNumber}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Hourly Rate: ${emp.hourlyRate.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
