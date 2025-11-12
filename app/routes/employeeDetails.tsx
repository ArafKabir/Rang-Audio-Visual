import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEmployeeById, deleteEmployee } from "~/api/employeeApi";
import type { EmployeeDTO } from "~/api/employeeApi";

export default function EmployeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<EmployeeDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!id) return;
        async function load() {
            try {
                const data = await getEmployeeById(Number(id));
                setEmployee(data);
            } catch (e) {
                console.error("Error fetching employee:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    async function handleDelete() {
        if (!id) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
        if (!confirmDelete) return;

        try {
            setDeleting(true);
            await deleteEmployee(Number(id));
            navigate("/viewEmployees");
        } catch (e) {
            console.error("Error deleting employee:", e);
            alert("Failed to delete employee");
        } finally {
            setDeleting(false);
        }
    }

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading employee details...
            </div>
        );

    if (!employee)
        return <div className="text-center text-red-500 mt-20">Employee not found.</div>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <button
                onClick={() => navigate("/viewEmployees")}
                className="mb-4 text-indigo-500 hover:text-indigo-700 font-medium"
            >
                ← Back to Employees
            </button>

            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {employee.firstName} {employee.lastName}
                </h1>

                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p><strong>ID:</strong> {employee.id}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone:</strong> {employee.phoneNumber}</p>
                    <p><strong>Hourly Rate:</strong> ${employee.hourlyRate.toFixed(2)}</p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => navigate(`/updateEmployee/${id}`)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
