document.addEventListener('DOMContentLoaded', () => {
    const animalCheckboxes = document.querySelectorAll('input[name="animal"]');
    const animalImageDiv = document.getElementById('animal-image');
    const fileInput = document.getElementById('fileInput');
    const fileDetailsDiv = document.getElementById('file-details');

    animalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            animalImageDiv.innerHTML = ''; // Clear previous images
            if (checkbox.checked) {
                const img = document.createElement('img');
                img.src = `static/images/${checkbox.value}.jpg`; // Ensure images are stored in a folder named 'images'
                animalImageDiv.appendChild(img);
            }
        });
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                fileDetailsDiv.innerHTML = `
                    <p>Name: ${data.name}</p>
                    <p>Size: ${data.size} bytes</p>
                    <p>Type: ${data.type}</p>
                `;
            })
            .catch(error => console.error('Error:', error));
        }
    });
});