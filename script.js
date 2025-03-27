const API_URL = "https://backend-personas.vercel.app/api/users"; // Asegúrate de cambiar esta URL

document.addEventListener("DOMContentLoaded", () => {
    getUsers();
    document.getElementById("userForm").addEventListener("submit", addUser);
});

// Obtener usuarios y mostrar en la tabla
async function getUsers() {
    try {
        let response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error obteniendo usuarios");

        let users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Error obteniendo usuarios:", error);
    }
}

// Agregar un nuevo usuario
async function addUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const occupation = document.getElementById("occupation").value;

    const newUser = { name, email, phone, occupation };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) throw new Error("Error al agregar usuario");

        getUsers(); // Recargar la lista
        document.getElementById("userForm").reset();
    } catch (error) {
        console.error("Error agregando usuario:", error);
    }
}

// Mostrar usuarios en la tabla
function renderUsers(users) {
    const tableBody = document.getElementById("usersTableBody");
    tableBody.innerHTML = "";

    users.forEach(user => {
        let row = `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.occupation}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
