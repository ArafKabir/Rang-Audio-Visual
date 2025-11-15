// app/api/workSessionApi.ts
import {API_URL} from "~/config";
const BASE_URL = `${API_URL}/api/v1/session`;

export interface WorkSessionDTO {
    id?: number;
    startTime: string; // ISO string (e.g., 2025-11-06T10:00:00)
    endTime: string;
    durationInHours?: number;
}

/**
 * Fetch all work sessions for a given employee in a specific event
 */
export async function getWorkSessionsForEventEmployee(
    eventId: number,
    employeeId: number
): Promise<WorkSessionDTO[]> {
    const res = await fetch(`${BASE_URL}/all/${eventId}/${employeeId}`);
    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error fetching work sessions:", errorText);
        throw new Error("Failed to fetch work sessions");
    }
    return res.json();
}

/**
 * Create a new work session for an employee in an event
 */
export async function createWorkSession(
    eventId: number,
    employeeId: number,
    session: WorkSessionDTO
): Promise<WorkSessionDTO> {
    const res = await fetch(`${BASE_URL}/create/${eventId}/${employeeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error creating work session:", errorText);
        throw new Error("Failed to create work session");
    }

    return res.json();
}

/**
 * Update an existing work session
 */
export async function updateWorkSession(
    workSession: WorkSessionDTO
): Promise<WorkSessionDTO> {
    const res = await fetch(`${BASE_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workSession),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error updating work session:", errorText);
        throw new Error("Failed to update work session");
    }

    return res.json();
}

/**
 * Delete a specific work session by event ID and employee ID
 */
export async function deleteWorkSession(sessionId: number): Promise<string> {
    const res = await fetch(`${BASE_URL}/delete/${sessionId}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error deleting work session:", errorText);
        throw new Error("Failed to delete work session");
    }

    return res.text();
}
