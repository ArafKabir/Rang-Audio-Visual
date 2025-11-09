import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import duration from "dayjs/plugin/duration";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

import {
    getWorkSessionsForEventEmployee,
    createWorkSession,
    deleteWorkSession,
    type WorkSessionDTO,
} from "~/api/workSessionApi";

import {
    getEmployeesForEvent,
    type EventEmployeeDTO,
} from "~/api/eventApi";

import {
    getEmployeeById,
    type EmployeeDTO,
} from "~/api/employeeApi";

dayjs.extend(duration);

export default function AddWorkSession() {
    const { eventId, employeeId } = useParams();
    const navigate = useNavigate();

    const [eventEmployee, setEventEmployee] = useState<EventEmployeeDTO | null>(null);
    const [employee, setEmployee] = useState<EmployeeDTO | null>(null);
    const [sessions, setSessions] = useState<WorkSessionDTO[]>([]);
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [totalHours, setTotalHours] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [endTime, setEndTime] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Compute live duration
    const liveDuration = useMemo(() => {
        if (!startTime || !endTime) return null;
        const diffMs = endTime.diff(startTime);
        if (diffMs <= 0) return null;
        const dur = dayjs.duration(diffMs);
        return `${dur.hours()}h ${dur.minutes()}m`;
    }, [startTime, endTime]);

    useEffect(() => {
        if (sessions.length > 0) {
            const total = sessions.reduce((sum, s) => sum + (s.durationInHours ?? 0), 0);
            setTotalHours(total);

            if (employee?.hourlyRate) {
                setTotalPayment(total * employee.hourlyRate);
            }
        } else {
            setTotalHours(0);
            setTotalPayment(0);
        }
    }, [sessions, employee]);


    // Fetch event employee, employee, and sessions
    useEffect(() => {
        if (!eventId || !employeeId) return;

        const fetchData = async () => {
            try {
                // Get EventEmployee info
                const eventEmployees = await getEmployeesForEvent(eventId);
                const foundEventEmployee = eventEmployees.find(
                    (e) => e.employeeId === Number(employeeId)
                );
                setEventEmployee(foundEventEmployee || null);

                // Get full Employee info
                const emp = await getEmployeeById(Number(employeeId));
                setEmployee(emp);

                // Get all sessions
                const workSessions = await getWorkSessionsForEventEmployee(
                    Number(eventId),
                    Number(employeeId)
                );
                setSessions(workSessions);
            } catch (err) {
                console.error("Error loading data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId, employeeId]);

    // Handle Add Session
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!eventId || !employeeId || !startTime || !endTime) return;
        setSaving(true);

        const session: WorkSessionDTO = {
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
        };

        try {
            await createWorkSession(Number(eventId), Number(employeeId), session);
            const updated = await getWorkSessionsForEventEmployee(
                Number(eventId),
                Number(employeeId)
            );
            setSessions(updated);
            setStartTime(null);
            setEndTime(null);
        } catch (err) {
            console.error("Failed to create session:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (sessionId: number) => {
        if (!confirm("Delete this session?")) return;
        try {
            await deleteWorkSession(sessionId);
            const updated = await getWorkSessionsForEventEmployee(
                Number(eventId),
                Number(employeeId)
            );
            setSessions(updated);
        } catch (err) {
            console.error("Failed to delete session:", err);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh] text-gray-600 dark:text-gray-300">
                Loading work sessions...
            </div>
        );

    if (!employee)
        return (
            <div className="text-center text-red-500 mt-20">
                Employee not found for this event.
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-indigo-500 hover:text-indigo-700 font-medium"
            >
                ← Back to Event Details
            </button>

            {/* Employee Info */}
            {/* Employee Info */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
                <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {employee.firstName} {employee.lastName}
                </h1>
                <p className="text-gray-700 dark:text-gray-300">Employee ID: {employee.id}</p>
                <p className="text-gray-700 dark:text-gray-300">Email: {employee.email ?? "N/A"}</p>
                <p className="text-gray-700 dark:text-gray-300">Phone: {employee.phoneNumber ?? "N/A"}</p>
                <p className="text-gray-700 dark:text-gray-300">
                    Hourly Rate: ${employee.hourlyRate?.toFixed(2) ?? "N/A"}/hr
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                    Total Hours Worked: {totalHours.toFixed(2)} hrs
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    Total Payment: ${totalPayment.toFixed(2)}
                </p>
            </div>


            {/* Add Work Session Form */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Add New Work Session
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Start */}
                    <div>
                        <DatePicker
                            label="Start Date"
                            value={startTime}
                            onChange={(newDate) => setStartTime(newDate)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    variant: "outlined",
                                    sx: {
                                        mb: 2,

                                        // Base (light mode)
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "white",
                                            color: "black",
                                            "& svg": {
                                                color: "#4B5563", // gray-700 icon color
                                            },
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#9CA3AF", // gray-400 border
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#4B5563", // label
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#6B7280", // darker border on hover
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2563EB", // indigo-600 focus
                                        },

                                        // 🌙 Dark mode overrides
                                        "@media (prefers-color-scheme: dark)": {
                                            "& .MuiInputBase-root": {
                                                backgroundColor: "#1F2937", // gray-800
                                                color: "#F9FAFB", // text
                                                "& svg": {
                                                    color: "#D1D5DB", // gray-300 icon
                                                },
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#4B5563", // gray-700
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#D1D5DB", // gray-300
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#9CA3AF", // lighter gray on hover
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#60A5FA", // blue-400 focus
                                            },
                                        },
                                    }

                                },
                            }}
                        />

                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(newTime) => setStartTime(newTime)}
                            ampm
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    variant: "outlined",
                                    sx: {
                                        mb: 2,

                                        // Base (light mode)
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "white",
                                            color: "black",
                                            "& svg": {
                                                color: "#4B5563", // gray-700 icon color
                                            },
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#9CA3AF", // gray-400 border
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#4B5563", // label
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#6B7280", // darker border on hover
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2563EB", // indigo-600 focus
                                        },

                                        // 🌙 Dark mode overrides
                                        "@media (prefers-color-scheme: dark)": {
                                            "& .MuiInputBase-root": {
                                                backgroundColor: "#1F2937", // gray-800
                                                color: "#F9FAFB", // text
                                                "& svg": {
                                                    color: "#D1D5DB", // gray-300 icon
                                                },
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#4B5563", // gray-700
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#D1D5DB", // gray-300
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#9CA3AF", // lighter gray on hover
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#60A5FA", // blue-400 focus
                                            },
                                        },
                                    }

                                },
                            }}
                        />
                    </div>

                    {/* END DATE/TIME */}
                    <div>
                        <DatePicker
                            label="End Date"
                            value={endTime}
                            onChange={(newDate) => setEndTime(newDate)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    variant: "outlined",
                                    sx: {
                                        mb: 2,

                                        // Base (light mode)
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "white",
                                            color: "black",
                                            "& svg": {
                                                color: "#4B5563", // gray-700 icon color
                                            },
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#9CA3AF", // gray-400 border
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#4B5563", // label
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#6B7280", // darker border on hover
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2563EB", // indigo-600 focus
                                        },

                                        // 🌙 Dark mode overrides
                                        "@media (prefers-color-scheme: dark)": {
                                            "& .MuiInputBase-root": {
                                                backgroundColor: "#1F2937", // gray-800
                                                color: "#F9FAFB", // text
                                                "& svg": {
                                                    color: "#D1D5DB", // gray-300 icon
                                                },
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#4B5563", // gray-700
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#D1D5DB", // gray-300
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#9CA3AF", // lighter gray on hover
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#60A5FA", // blue-400 focus
                                            },
                                        },
                                    }

                                },
                            }}
                        />

                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(newTime) => setEndTime(newTime)}
                            ampm
                            viewRenderers={{
                                hours: renderTimeViewClock,
                                minutes: renderTimeViewClock,
                                seconds: renderTimeViewClock,
                            }}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    variant: "outlined",
                                    sx: {
                                        mb: 2,

                                        // Base (light mode)
                                        "& .MuiInputBase-root": {
                                            backgroundColor: "white",
                                            color: "black",
                                            "& svg": {
                                                color: "#4B5563", // gray-700 icon color
                                            },
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#9CA3AF", // gray-400 border
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "#4B5563", // label
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#6B7280", // darker border on hover
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#2563EB", // indigo-600 focus
                                        },

                                        // 🌙 Dark mode overrides
                                        "@media (prefers-color-scheme: dark)": {
                                            "& .MuiInputBase-root": {
                                                backgroundColor: "#1F2937", // gray-800
                                                color: "#F9FAFB", // text
                                                "& svg": {
                                                    color: "#D1D5DB", // gray-300 icon
                                                },
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#4B5563", // gray-700
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: "#D1D5DB", // gray-300
                                            },
                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#9CA3AF", // lighter gray on hover
                                            },
                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#60A5FA", // blue-400 focus
                                            },
                                        },
                                    }

                                },
                            }}
                        />
                    </div>

                    {liveDuration && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Duration: {liveDuration}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-4 py-2 disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Add Session"}
                    </button>
                </form>
            </div>

            {/* Existing Sessions */}
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Existing Work Sessions
                </h2>
                {sessions.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No work sessions found.</p>
                ) : (
                    <ul className="space-y-3">
                        {sessions.map((s) => (
                            <li
                                key={s.id}
                                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition rounded-lg px-4 py-3"
                            >
                                <div>
                                    <p className="text-gray-800 dark:text-gray-100">
                                        {new Date(s.startTime).toLocaleString()} →{" "}
                                        {new Date(s.endTime).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Duration: {s.durationInHours?.toFixed(2) ?? "N/A"} hours
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleDelete(s.id!)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
