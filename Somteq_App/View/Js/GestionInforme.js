// Función para visualizar el informe en pantalla
function viewReport() {
    const maintenanceTable = document.getElementById("maintenanceTableBody");
    const remissionsTable = document.getElementById("remissionTableBody");
    const checklistTable = document.getElementById("checklistTableBody");
  
    const reportContainer = document.getElementById("report-container");
    reportContainer.innerHTML = ""; // Limpiar cualquier informe previo
  
    // Títulos para las secciones del informe
    const maintenanceTitle = document.createElement("h3");
    maintenanceTitle.textContent = "Registros de Mantenimiento";
    reportContainer.appendChild(maintenanceTitle);
  
    const maintenanceContent = generateTableContent(maintenanceTable, ["Instrumento", "Tipo", "Fecha", "Descripción"]);
    reportContainer.appendChild(maintenanceContent);
  
    const remissionsTitle = document.createElement("h3");
    remissionsTitle.textContent = "Remisiones Registradas";
    reportContainer.appendChild(remissionsTitle);
  
    const remissionsContent = generateTableContent(remissionsTable, ["Instrumento", "Razón", "Fecha"]);
    reportContainer.appendChild(remissionsContent);
  
    const checklistTitle = document.createElement("h3");
    checklistTitle.textContent = "Lista de Chequeo";
    reportContainer.appendChild(checklistTitle);
  
    const checklistContent = generateTableContent(checklistTable, ["Instrumento", "Condición", "Observaciones"]);
    reportContainer.appendChild(checklistContent);
  }
  
  // Función auxiliar para generar contenido de tablas
  function generateTableContent(tableBody, headers) {
    const container = document.createElement("div");
  
    if (tableBody.children.length === 0) {
      const noData = document.createElement("p");
      noData.textContent = "No hay datos disponibles.";
      container.appendChild(noData);
      return container;
    }
  
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
  
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      tr.appendChild(th);
    });
  
    thead.appendChild(tr);
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
    Array.from(tableBody.children).forEach((row) => {
      const newRow = document.createElement("tr");
      Array.from(row.children).forEach((cell, index) => {
        if (index < headers.length) {
          const td = document.createElement("td");
          td.textContent = cell.textContent;
          newRow.appendChild(td);
        }
      });
      tbody.appendChild(newRow);
    });
  
    table.appendChild(tbody);
    container.appendChild(table);
  
    return container;
  }
  
  // Función para descargar el informe como PDF
  function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.text("Informe de Gestión de Instrumentos Quirúrgicos", 10, 10);
  
    // Registros de mantenimiento
    let yOffset = 20;
    doc.text("Registros de Mantenimiento:", 10, yOffset);
    yOffset += 10;
  
    const maintenanceTable = document.getElementById("maintenanceTableBody");
    yOffset = addTableToPDF(doc, maintenanceTable, yOffset, ["Instrumento", "Tipo", "Fecha", "Descripción"]);
  
    // Remisiones
    doc.text("Remisiones Registradas:", 10, yOffset);
    yOffset += 10;
  
    const remissionsTable = document.getElementById("remissionTableBody");
    yOffset = addTableToPDF(doc, remissionsTable, yOffset, ["Instrumento", "Razón", "Fecha"]);
  
    // Lista de chequeo
    doc.text("Lista de Chequeo:", 10, yOffset);
    yOffset += 10;
  
    const checklistTable = document.getElementById("checklistTableBody");
    addTableToPDF(doc, checklistTable, yOffset, ["Instrumento", "Condición", "Observaciones"]);
  
    doc.save("informe-gestion-instrumentos.pdf");
  }
  
  // Función auxiliar para agregar tablas al PDF
  function addTableToPDF(doc, tableBody, yOffset, headers) {
    if (tableBody.children.length === 0) {
      doc.text("No hay datos disponibles.", 10, yOffset);
      return yOffset + 10;
    }
  
    Array.from(tableBody.children).forEach((row) => {
      let xOffset = 10;
      Array.from(row.children).forEach((cell, index) => {
        if (index < headers.length) {
          doc.text(cell.textContent, xOffset, yOffset);
          xOffset += 40; // Espaciado entre columnas
        }
      });
      yOffset += 10; // Espaciado entre filas
    });
  
    return yOffset + 10; // Espaciado entre secciones
  }
  