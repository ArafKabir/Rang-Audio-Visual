import type {AdminDTO} from "../context/AuthContext";

export async function loginAdmin(email: string, password: string): Promise<AdminDTO> {
    const res = await fetch("http://localhost:8080/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Invalid email or password");
    }

    return await res.json();
}

export async function updateAdmin(adminDTO: AdminDTO): Promise<AdminDTO> {
    const res = await fetch("http://localhost:8080/api/v1/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminDTO), // ✅ send directly, not wrapped
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Error updating admin:", errorText);
        throw new Error("Failed to update admin");
    }

    return res.json();
}
