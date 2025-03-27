document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("userForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (!name || !email) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const newUser = { name, email };

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

            const data = await response.json();
            alert("Usuario agregado con éxito");

            // Recargar la lista de usuarios después de agregar
            loadUsers();
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
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Limpiar la lista

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
    }
}
