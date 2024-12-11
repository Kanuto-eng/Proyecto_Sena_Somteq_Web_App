// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

/*===================================MainDashboard=================================*/

// Datos de ejemplo para el resumen general
const dashboardData = {
  totalEquipments: 120,
  totalPieces: 350,
  inMaintenance: 15,
  lowInventory: 5,
};

// Actualizar estadísticas del resumen general
function updateDashboard() {
  document.getElementById("totalEquipments").textContent = dashboardData.totalEquipments;
  document.getElementById("totalPieces").textContent = dashboardData.totalPieces;
  document.getElementById("inMaintenance").textContent = dashboardData.inMaintenance;
  document.getElementById("lowInventory").textContent = dashboardData.lowInventory;
}

// Navegación simulada
function navigateTo(section) {
  alert(`Navegando a la sección: ${section}`);
}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", updateDashboard);
