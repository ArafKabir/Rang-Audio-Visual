import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateAdmin, type AdminDTO } from "~/api/adminApi";
import { useAuth } from "~/context/AuthContext";

export default function UpdateAdmin() {
    const { admin, setAdmin } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<AdminDTO>({
        id: admin?.id || undefined,
        name: admin?.name || "",
        email: admin?.email || "",
        password: null,
        phoneNumber: admin?.phoneNumber || "",
        role: admin?.role || "ADMIN",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const handleChange = (field: keyof AdminDTO, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const updatedAdmin = await updateAdmin(form);
            setSuccess(true);
            setAdmin(updatedAdmin);
            setTimeout(() => navigate("/adminDash"), 1000);
        } catch (err: any) {
            console.error("Error updating admin:", err);
            setError(err.message || "Failed to update admin info");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-xl bg-[#C8E4E6] dark:bg-gray-800 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Update Admin Info
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">✅ Updated successfully!</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password (optional)
                        </label>
                        <input
                            type="password"
                            value={form.password ?? ""}
                            onChange={(e) => handleChange("password", e.target.value)}
                            placeholder="Leave blank to keep current"
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={form.phoneNumber}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                        </label>
                        <select
                            value={form.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/adminDash")}
                            className="px-5 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                transition-colors text-gray-800 dark:text-gray-100"
                        >
                            ← Back
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
