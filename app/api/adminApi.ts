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
