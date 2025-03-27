document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const ocupacion = document.getElementById("ocupacion").value.trim();

        if (!name || !email || !telefono || !ocupacion) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newUser = { name, email, telefono, ocupacion };

        try {
            const response = await fetch("https://backend-personas.vercel.app/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("Error al agregar usuario");
            }

            loadUsers(); // Recargar la lista de usuarios
            document.getElementById("userForm").reset(); // Limpiar el formulario
        } catch (error) {
            console.error("Error agregando usuario:", error);
            alert("Hubo un error al agregar el usuario.");
        }
    });

    loadUsers();
});

async function loadUsers() {
    try {
        const response = await fetch("https://backend-personas.vercel.app/api/users");
        if (!response.ok) throw new Error("Error al obtener usuarios");

        const users = await response.json();
        const tableBody = document.getElementById("tablaPersonas");
        tableBody.innerHTML = ""; // Limpiar la tabla

        users.forEach((user, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.telefono}</td>
                <td>${user.ocupacion}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
    }
}
