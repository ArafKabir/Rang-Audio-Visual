import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "~/api/eventApi";
import type { EventDTO } from "~/api/eventApi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function CreateEvent() {
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventDTO>({
        name: "",
        date: dayjs().toISOString(),
        location: "",
        employees: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: keyof EventDTO, value: any) => {
        setEvent((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const dto: EventDTO = { ...event, date: dayjs(event.date).toISOString() };
            await createEvent(dto);
            navigate("/adminDash");
        } catch (err: any) {
            console.error("Error creating event:", err);
            setError(err.message || "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 rounded-xl bg-[#C8E4E6] dark:bg-gray-800 shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Create Event
                </h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Event Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Name
                        </label>
                        <input
                            type="text"
                            value={event.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            placeholder="Event Name"
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    {/* Date Picker (calendar only, no time) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Event Date
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={dayjs(event.date)}
                                onChange={(val) =>
                                    handleChange("date", val ? val.toISOString() : event.date)
                                }
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        className:
                                            "dark:bg-gray-900 dark:text-gray-100 dark:[&>input]:text-gray-100 dark:[&>input]:bg-gray-900 dark:[&>fieldset]:border-gray-700",
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location
                        </label>
                        <input
                            type="text"
                            value={event.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                            placeholder="Location"
                            className="mt-1 w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100
                focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
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
                            {loading ? "Creating..." : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
