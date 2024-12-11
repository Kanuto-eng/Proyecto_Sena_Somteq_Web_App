function addImage() {
    const teamName = document.getElementById('team-name').value;
    const pieceName = document.getElementById('piece-name').value;
    const pieceCode = document.getElementById('piece-code').value;
    const clinicName = document.getElementById('clinic-name').value;
    const description = document.getElementById('description').value;
    const imageUpload = document.getElementById('image-upload').files[0];
  
    if (imageUpload) {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const galleryGrid = document.getElementById('gallery-grid');
  
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.setAttribute('onclick', 'zoomImage(this)');
  
        const img = document.createElement('img');
        img.src = event.target.result;
        img.alt = pieceName;
  
        const details = document.createElement('div');
        details.classList.add('image-details');
        details.innerHTML = `
          <p><strong>Equipo:</strong> ${teamName}</p>
          <p><strong>Pieza:</strong> ${pieceName}</p>
          <p><strong>Código:</strong> ${pieceCode}</p>
          <p><strong>Clínica:</strong> ${clinicName}</p>
          <p><strong>Descripción:</strong> ${description}</p>
        `;
  
        imageContainer.appendChild(img);
        imageContainer.appendChild(details);
        galleryGrid.appendChild(imageContainer);
  
        // Limpiar el formulario
        document.getElementById('upload-form').reset();
      };
  
      reader.readAsDataURL(imageUpload);
    } else {
      alert('Por favor selecciona una imagen.');
    }
  }
  
  function zoomImage(element) {
    const modal = document.getElementById('zoom-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const imgSrc = element.querySelector('img').src;
  
    zoomedImage.src = imgSrc;
    modal.style.display = 'block';
  }
  
  function closeZoom() {
    const modal = document.getElementById('zoom-modal');
    modal.style.display = 'none';
  }
  