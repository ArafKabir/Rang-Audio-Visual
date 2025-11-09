// app/api/employeeApi.ts
const BASE_URL = "http://localhost:8080/api/v1/employee";

export interface EmployeeDTO {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    hourlyRate: number;
}

/**
 * Fetch all employees
 */
export async function getAllEmployees(): Promise<EmployeeDTO[]> {
    const res = await fetch(`${BASE_URL}/all`);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return res.json();
}

export async function getEmployeeById(employeeId: number): Promise<EmployeeDTO> {
    const res = await fetch(`http://localhost:8080/api/v1/employee/${employeeId}`);
    if (!res.ok) throw new Error("Failed to fetch employee by ID");
    return res.json();
}

/**
 * Create a new employee
 */
export async function createEmployee(employee: EmployeeDTO): Promise<EmployeeDTO> {
    const res = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
    if (!res.ok) throw new Error("Failed to create employee");
    return res.json();
}

/**
 * Update an existing employee
 */
export async function updateEmployee(employee: EmployeeDTO): Promise<EmployeeDTO> {
    const res = await fetch(`${BASE_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
    });
    if (!res.ok) throw new Error("Failed to update employee");
    return res.json();
}

/**
 * Delete an employee by ID
 */
export async function deleteEmployee(employeeId: number): Promise<string> {
    const res = await fetch(`${BASE_URL}/delete/${employeeId}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete employee");
    return res.text();
}
