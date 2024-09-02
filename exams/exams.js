document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.exam-image');
    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');

    images.forEach(image => {
        image.addEventListener('click', () => {
            overlay.style.display = 'flex';
            overlayImage.src = image.src;
        });
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
});
