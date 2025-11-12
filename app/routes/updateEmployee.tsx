import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "~/api/employeeApi";
import type { EmployeeDTO } from "~/api/employeeApi";

export default function UpdateEmployee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState<EmployeeDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        async function load() {
            try {
                const data = await getEmployeeById(Number(id));
                setEmployee(data);
            } catch (e) {
                console.error("Error loading employee:", e);
                setError("Failed to load employee data");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    const handleChange = (field: keyof EmployeeDTO, value: any) => {
        if (employee) setEmployee((prev) => ({ ...prev!, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!employee) return;

        setSaving(true);
        setError(null);
        try {
            await updateEmployee(employee);

            navigate(`/employeeDetails/${id}`);
        } catch (err: any) {
            console.error("Error updating employee:", err);
            setError(err.message || "Failed to update employee");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading employee info...
            </div>
        );

    if (!employee)
        return <div className="text-center text-red-500 mt-20">Employee not found.</div>;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-xl bg-[#C8E4E6] dark:bg-gray-800 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Update Employee
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {["firstName", "lastName", "email", "phoneNumber"].map((field) => (
                        <div key={field}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type={field === "email" ? "email" : "text"}
                                value={(employee as any)[field]}
                                onChange={(e) => handleChange(field as keyof EmployeeDTO, e.target.value)}
                                className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                  border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                  focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Hourly Rate ($)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            value={employee.hourlyRate}
                            onChange={(e) => handleChange("hourlyRate", parseFloat(e.target.value))}
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/employeeDetails/${id}`)}
                            className="px-5 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors text-gray-800 dark:text-gray-100"
                        >
                            ← Back
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
