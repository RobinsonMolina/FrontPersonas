const API_URL = "https://backend-personas.vercel.app/api/users"; // Reemplaza con tu backend en Vercel

document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const newUser = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        job: document.getElementById("job").value,
    };

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });

    document.getElementById("userForm").reset();
    loadUsers();
});

async function loadUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();
    const tableBody = document.getElementById("userTableBody");

    tableBody.innerHTML = users.map(user =>
        `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.job}</td>
        </tr>`
    ).join("");
}

// Cargar usuarios al iniciar
loadUsers();
