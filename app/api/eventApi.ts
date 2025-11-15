// app/api/eventApi.ts
import type {WorkSessionDTO} from "~/api/workSessionApi";
import {API_URL} from "~/config";

const BASE_URL = `${API_URL}/api/v1/event`;

export interface EventDTO {
    id?: number;
    name: string;
    date: string; // LocalDateTime → ISO string
    location: string;
    employees?: EventEmployeeDTO[];
}

export interface EventEmployeeDTO {
    id: number;               // eventEmployeeId
    eventId: number;
    employeeId: number;
    employeeName: string;
    totalHoursWorked: number;
    workSessions?: WorkSessionDTO[];
}


/**
 * Create an event
 */
export async function createEvent(dto: EventDTO): Promise<EventDTO> {
    const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {"content-type": "application/json" },
        body: JSON.stringify(dto),
        });
        
        if (!res.ok) {
        const errorText = await res.text();
        console.error("Error creating event:", errorText);
        throw new Error("Failed to create event");
        }
        
        return res.json();
}

export async function deleteEvent(eventId: number): Promise<string> {
    const res = await fetch(`${BASE_URL}/delete/${eventId}`, {
        method: "DELETE",
    })

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error deleting event:", errorText);
        throw new Error("Failed to delete event");
    }

    return res.text();
}
/**
 * Fetch all events
 */
export async function getAllEvents(): Promise<EventDTO[]> {
    const res = await fetch(`${BASE_URL}/all`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
}

/**
 * Fetch a single event by ID
 */
export async function getEventById(id: string | number): Promise<EventDTO> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event");
    return res.json();
}

/**
 * Fetch all employees who worked on a specific event
 */
export async function getEmployeesForEvent(id: string | number): Promise<EventEmployeeDTO[]> {
    const res = await fetch(`${BASE_URL}/${id}/employees`);
    if (!res.ok) throw new Error("Failed to fetch employees for event");
    return res.json();
}

/**
 * Add employee to an event
 */
export async function assignEmployeeToEvent(eventId: number, employeeId: number): Promise<EventDTO> {
    const res = await fetch(`${BASE_URL}/${eventId}/assign/${employeeId}`, {
        method: "POST",
    });
    if (!res.ok) throw new Error("Failed to assign employee to event");
    return res.json();
}