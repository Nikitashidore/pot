// script.js
document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('uploadedImage').src = e.target.result;

            // Making API call to Remove.bg
            const formData = new FormData();
            formData.append('image_file', file);
            formData.append('size', 'auto');

            fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': 'nJfx4K95NHR1UsoUdb5hyzS4'
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('Error in removing background');
                return response.blob();
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                document.getElementById('resultImage').src = url;
            })
            .catch(error => console.error('Error:', error));
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image file.');
    }
});
