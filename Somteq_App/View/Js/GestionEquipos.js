// Función para agregar equipos
function addEquipment() {
    const name = document.getElementById("equipmentName").value;
    const serial = document.getElementById("equipmentSerial").value;
    const status = document.getElementById("equipmentStatus").value;
    const sterilization = document.getElementById("lastSterilization").value;
    const description = document.getElementById("equipmentDescription").value;
    const order = document.getElementById("purchaseOrder").value;
  
    if (!name || !serial) {
      alert("El nombre del equipo y el número de serie son obligatorios.");
      return;
    }
  
    const tableBody = document.getElementById("equipmentTableBody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${name}</td>
      <td>${serial}</td>
      <td>${status}</td>
      <td>${sterilization}</td>
      <td>${description}</td>
      <td>${order}</td>
      <td>
        <button class="action edit" onclick="editEquipment(this)">Editar</button>
        <button class="action delete" onclick="deleteRow(this)">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  
    document.getElementById("equipment-form").reset();
  }
  
  // Función para agregar mantenimiento
  function addMaintenance() {
    const equipment = document.getElementById("maintenanceEquipment").value;
    const description = document.getElementById("maintenanceDescription").value;
    const date = document.getElementById("maintenanceDate").value;
  
    if (!equipment || !date) {
      alert("El equipo y la fecha son obligatorios.");
      return;
    }
  
    const tableBody = document.getElementById("maintenanceTableBody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${equipment}</td>
      <td>${description}</td>
      <td>${date}</td>
      <td>
        <button class="action delete" onclick="deleteRow(this)">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  
    document.getElementById("maintenance-form").reset();
  }
  
  // Función para editar equipos
  function editEquipment(button) {
    const row = button.closest("tr");
    const name = prompt("Actualizar nombre del equipo:", row.cells[0].innerText);
    const serial = prompt("Actualizar número de serie:", row.cells[1].innerText);
    const status = prompt("Actualizar estado:", row.cells[2].innerText);
    const sterilization = prompt("Actualizar última esterilización:", row.cells[3].innerText);
    const description = prompt("Actualizar descripción:", row.cells[4].innerText);
    const order = prompt("Actualizar orden de compra:", row.cells[5].innerText);
  
    if (name) row.cells[0].innerText = name;
    if (serial) row.cells[1].innerText = serial;
    if (status) row.cells[2].innerText = status;
    if (sterilization) row.cells[3].innerText = sterilization;
    if (description) row.cells[4].innerText = description;
    if (order) row.cells[5].innerText = order;
  }
  
  // Función para eliminar filas (tanto equipos como mantenimientos)
  function deleteRow(button) {
    const row = button.closest("tr");
    row.remove();
  }
  