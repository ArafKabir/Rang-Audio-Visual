// app/api/eventApi.ts
import type {WorkSessionDTO} from "~/api/workSessionApi";

const BASE_URL = "http://localhost:8080/api/v1/event";

export interface EventDTO {
    id: number;
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