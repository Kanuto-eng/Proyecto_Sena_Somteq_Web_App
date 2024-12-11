// Gestión de Mantenimiento
function addMaintenance() {
  const name = document.getElementById("instrumentName").value;
  const type = document.getElementById("maintenanceType").value;
  const date = document.getElementById("maintenanceDate").value;
  const description = document.getElementById("maintenanceDescription").value;

  if (!name || !type || !date || !description) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const tableBody = document.getElementById("maintenanceTableBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td>${type}</td>
    <td>${date}</td>
    <td>${description}</td>
    <td class="actions">
      <button onclick="deleteRow(this)">Eliminar</button>
    </td>
  `;
  tableBody.appendChild(row);
  document.getElementById("maintenance-form").reset();
}

// Gestión de Remisiones
function addRemission() {
  const instrument = document.getElementById("remissionInstrument").value;
  const reason = document.getElementById("remissionReason").value;
  const date = document.getElementById("remissionDate").value;

  if (!instrument || !reason || !date) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const tableBody = document.getElementById("remissionTableBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${instrument}</td>
    <td>${reason}</td>
    <td>${date}</td>
    <td class="actions">
      <button onclick="deleteRow(this)">Eliminar</button>
    </td>
  `;
  tableBody.appendChild(row);
  document.getElementById("remission-form").reset();
}

// Gestión de Listas de Chequeo
function addChecklistItem() {
  const instrument = document.getElementById("checklistInstrument").value;
  const condition = document.getElementById("checklistCondition").value;
  const observation = document.getElementById("checklistObservation").value;

  if (!instrument || !condition || !observation) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const tableBody = document.getElementById("checklistTableBody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${instrument}</td>
    <td>${condition}</td>
    <td>${observation}</td>
    <td class="actions">
      <button onclick="deleteRow(this)">Eliminar</button>
    </td>
  `;
  tableBody.appendChild(row);
  document.getElementById("checklist-form").reset();
}

// Función para eliminar filas
function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
}

// Función para generar PDF de informes
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Informe de Gestión de Instrumentos Quirúrgicos", 10, 10);
  doc.save("informe-mantenimiento.pdf");
}

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Vista mensual estilo Google Calendar
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay' // Opciones de vista
    },
    events: [
      {
        title: 'Mantenimiento Preventivo',
        start: '2024-12-01',
        description: 'Inspección de instrumental quirúrgico.',
      },
      {
        title: 'Revisión Correctiva',
        start: '2024-12-05',
        description: 'Reparación de bisturí desajustado.',
      },
      {
        title: 'Capacitación de Personal',
        start: '2024-12-10',
        end: '2024-12-12',
        description: 'Curso de mejores prácticas en esterilización.',
      },
    ],
    eventClick: function (info) {
      alert(`Evento: ${info.event.title}\nDescripción: ${info.event.extendedProps.description}`);
    },
    locale: 'es', // Idioma en español
  });

  calendar.render();
});

