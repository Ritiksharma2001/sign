document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('signature-canvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clear-button');
    const downloadButton = document.getElementById('download-button');
    const backgroundColorInput = document.getElementById('background-color');
    const textColorInput = document.getElementById('text-color');

    let drawing = false;
    let currentColor = textColorInput.value;

    function setCanvasBackgroundColor() {
        ctx.fillStyle = backgroundColorInput.value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setCanvasBackgroundColor();

    function startDrawing(event) {
        event.preventDefault();
        drawing = true;
        ctx.beginPath();
        draw(event); // Immediately draw to register a dot
    }

    function stopDrawing(event) {
        event.preventDefault();
        drawing = false;
        ctx.beginPath();
    }

    function draw(event) {
        event.preventDefault();
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if (window.innerWidth <= 480) {
            const offsetX = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
            const offsetY = event.touches ? rect.right - event.touches[0].clientX : rect.right - event.clientX;
            x = offsetX;
            y = offsetY;
        } else {
            const offsetX = event.touches ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
            const offsetY = event.touches ? event.touches[0].clientY - rect.top : event.clientY - rect.top;
            x = offsetX;
            y = offsetY;
        }

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Event listeners for canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);

    // Event listeners for buttons
    clearButton.addEventListener('click', setCanvasBackgroundColor);
    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'signature.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Event listeners for color inputs
    backgroundColorInput.addEventListener('input', setCanvasBackgroundColor);
    textColorInput.addEventListener('input', () => {
        currentColor = textColorInput.value;
    });

    // Resize the canvas to fit the container
    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        setCanvasBackgroundColor();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});
