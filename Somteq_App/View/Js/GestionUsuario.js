// Gestión de Clientes
function addClient() {
    const name = document.getElementById("clientName").value;
    const description = document.getElementById("clientDescription").value;
  
    if (name.trim() === "") {
      alert("El nombre es obligatorio.");
      return;
    }
  
    const tableBody = document.getElementById("clientTableBody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${name}</td>
      <td>${description}</td>
      <td>
        <button class="action edit" onclick="editClient(this)">Editar</button>
        <button class="action delete" onclick="deleteRow(this)">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  
    document.getElementById("client-form").reset();
  }
  
  function editClient(button) {
    const row = button.closest("tr");
    const name = prompt("Actualizar nombre:", row.cells[0].innerText);
    const description = prompt("Actualizar descripción:", row.cells[1].innerText);
  
    if (name) row.cells[0].innerText = name;
    if (description) row.cells[1].innerText = description;
  }
  
  // Gestión de Usuarios
  function addUser() {
    const firstName = document.getElementById("firstName").value;
    const secondName = document.getElementById("secondName").value;
    const lastName = document.getElementById("lastName").value;
    const secondLastName = document.getElementById("secondLastName").value;
    const clinic = document.getElementById("clinic").value;
    const role = document.getElementById("role").value;
    const userRole = document.getElementById("userRole").value;
  
    if (firstName.trim() === "" || lastName.trim() === "") {
      alert("El nombre completo es obligatorio.");
      return;
    }
  
    const tableBody = document.getElementById("userTableBody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${firstName} ${secondName} ${lastName} ${secondLastName}</td>
      <td>${clinic}</td>
      <td>${role} (${userRole})</td>
      <td>
        <button class="action edit" onclick="editUser(this)">Editar</button>
        <button class="action delete" onclick="deleteRow(this)">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  
    document.getElementById("user-form").reset();
  }
  
  function editUser(button) {
    const row = button.closest("tr");
    const fullName = prompt("Actualizar nombre completo:", row.cells[0].innerText);
    const clinic = prompt("Actualizar clínica:", row.cells[1].innerText);
    const role = prompt("Actualizar rol:", row.cells[2].innerText);
  
    if (fullName) row.cells[0].innerText = fullName;
    if (clinic) row.cells[1].innerText = clinic;
    if (role) row.cells[2].innerText = role;
  }
  
  // Eliminar filas genérico
  function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
  }
  