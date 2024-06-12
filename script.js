const canvas = document.getElementById('signature-canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const downloadButton = document.getElementById('download-button');
const backgroundColorInput = document.getElementById('background-color');
const textColorInput = document.getElementById('text-color');

let drawing = false;
let currentColor = textColorInput.value;

// Set initial canvas background color
function setCanvasBackgroundColor() {
    ctx.fillStyle = backgroundColorInput.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
setCanvasBackgroundColor();

// Mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Touch events
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', draw);


//dot events

function startDrawing(event) {
    event.preventDefault();
    drawing = true;
    ctx.beginPath();
    draw(event);  // Immediately draw to register a dot
}


backgroundColorInput.addEventListener('input', setCanvasBackgroundColor);
textColorInput.addEventListener('input', () => {
    currentColor = textColorInput.value;
});

clearButton.addEventListener('click', setCanvasBackgroundColor);

downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});


// Define the relative path to your Paytm QR code image
const paytmQRCodeImageURL = 'http://localhost/C:\Users\om\Desktop\sign'; // Adjust the path as needed

downloadButton.addEventListener('click', redirectToPaytmQRCode);

function redirectToPaytmQRCode() {
    // Replace 'paytmQRCodeImageURL' with the relative path to your Paytm QR code image
    window.location.href = paytmQRCodeImageURL;
}


function startDrawing(event) {
    event.preventDefault();
    drawing = true;
    ctx.beginPath();
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
    const offsetX = rect.left;
    const offsetY = rect.top;
    
    let clientX, clientY;
    if (event.touches) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(clientX - offsetX, clientY - offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(clientX - offsetX, clientY - offsetY);
}
