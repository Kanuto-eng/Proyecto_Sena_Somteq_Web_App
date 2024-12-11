// Función para agregar un nuevo elemento al inventario
function addItem() {
    const type = document.getElementById("itemType").value;
    const name = document.getElementById("itemName").value;
    const code = document.getElementById("itemCode").value;
    const quantity = document.getElementById("itemQuantity").value;
    const description = document.getElementById("itemDescription").value;
    const clinic = document.getElementById("clinicAssigned").value;
  
    if (!name || !code || !quantity || !description) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
  
    const tableBody = document.getElementById("inventoryTableBody");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${type}</td>
      <td>${name}</td>
      <td>${code}</td>
      <td>${quantity}</td>
      <td>${description}</td>
      <td>${clinic}</td>
      <td class="actions">
        <button class="edit" onclick="editItem(this)">Editar</button>
        <button class="delete" onclick="deleteItem(this)">Eliminar</button>
      </td>
    `;
  
    tableBody.appendChild(row);
    document.getElementById("inventory-form").reset();
  }
  
  // Función para editar un elemento existente
  function editItem(button) {
    const row = button.closest("tr");
    const type = prompt("Editar Tipo:", row.cells[0].innerText);
    const name = prompt("Editar Nombre:", row.cells[1].innerText);
    const code = prompt("Editar Código:", row.cells[2].innerText);
    const quantity = prompt("Editar Cantidad:", row.cells[3].innerText);
    const description = prompt("Editar Descripción:", row.cells[4].innerText);
    const clinic = prompt("Editar Clínica:", row.cells[5].innerText);
  
    if (type) row.cells[0].innerText = type;
    if (name) row.cells[1].innerText = name;
    if (code) row.cells[2].innerText = code;
    if (quantity) row.cells[3].innerText = quantity;
    if (description) row.cells[4].innerText = description;
    if (clinic) row.cells[5].innerText = clinic;
  }
  
  // Función para eliminar un elemento del inventario
  function deleteItem(button) {
    const row = button.closest("tr");
    row.remove();
  }

  
  // Función para filtrar la tabla de inventario
function filterTable() {
    const filter = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#inventoryTableBody tr");
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const match = Array.from(cells).some((cell) =>
        cell.textContent.toLowerCase().includes(filter)
      );
  
      row.style.display = match ? "" : "none";
    });
  }
  
  // Función para generar un informe PDF del inventario
  function generateInventoryReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Título del informe
    doc.text("Informe de Inventario", 10, 10);
  
    // Extraer datos de la tabla
    const tableBody = document.getElementById("inventoryTableBody");
    const rows = tableBody.querySelectorAll("tr");
  
    if (rows.length === 0) {
      alert("No hay datos en el inventario para generar un informe.");
      return;
    }
  
    let yOffset = 20; // Posición inicial en el PDF
  
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
  
      let xOffset = 10; // Posición inicial para cada fila
      cells.forEach((cell, index) => {
        if (index < 6) { // Evitar incluir los botones de acciones
          doc.text(cell.textContent, xOffset, yOffset);
          xOffset += 40; // Espaciado entre columnas
        }
      });
  
      yOffset += 10; // Espaciado entre filas
    });
  
    // Guardar el archivo PDF
    doc.save("informe-inventario.pdf");
  }
  