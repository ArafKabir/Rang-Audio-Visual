// app/api/eventApi.ts
const BASE_URL = "http://localhost:8080/api/v1";

export interface EventDTO {
    id: number;
    name: string;
    date: string; // LocalDateTime → ISO string
    location: string;
    employees?: EmployeeSummary[];
}

export interface EmployeeSummary {
    employeeId: number;
    employeeName: string;
    totalHours: number;
}

/**
 * Fetch all events
 */
export async function getAllEvents(): Promise<EventDTO[]> {
    const res = await fetch(`${BASE_URL}/event/all`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return res.json();
}

/**
 * Fetch a single event by ID
 */
export async function getEventById(id: string | number): Promise<EventDTO> {
    const res = await fetch(`${BASE_URL}/event/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event");
    return res.json();
}

/**
 * Fetch all employees who worked on a specific event
 */
export async function getEmployeesForEvent(id: string | number): Promise<EmployeeSummary[]> {
    const res = await fetch(`${BASE_URL}/event/${id}/employees`);
    if (!res.ok) throw new Error("Failed to fetch employees for event");
    return res.json();
}

