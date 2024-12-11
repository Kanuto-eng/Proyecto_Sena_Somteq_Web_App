function redirectToWhatsApp() {
    const phoneNumber = "573176770500"; // Reemplaza con el número de WhatsApp del servicio de ayuda
    const message = "Hola, necesito ayuda con SOMTEQAPP.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}