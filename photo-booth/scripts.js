const videoElement = document.querySelector('.player');
const canvasElement = document.querySelector('.photo');
const canvasContext = canvasElement.getContext('2d');
const stripElement = document.querySelector('.strip');
const snapSound = document.querySelector('.snap');

// Access the user's webcam
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            videoElement.srcObject = localMediaStream;
            videoElement.play();
        })
        .catch(err => {
            console.error('Error accessing webcam:', err);
        });
}

// Paint video stream to canvas
function paintToCanvas() {
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    canvasElement.width = width;
    canvasElement.height = height;

    return setInterval(() => {
        canvasContext.drawImage(videoElement, 0, 0, width, height);
        let pixels = canvasContext.getImageData(0, 0, width, height);
        pixels = applyEffects(pixels);
        canvasContext.putImageData(pixels, 0, 0);
    }, 16);
}

// Take a photo from the canvas
function takePhoto() {
    snapSound.currentTime = 0;
    snapSound.play();

    const data = canvasElement.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Person" />`;
    stripElement.insertBefore(link, stripElement.firstChild);
}

// Apply effects to the pixels
function applyEffects(pixels) {
    pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    pixels = greenScreen(pixels);
    return pixels;
}

// Add red effect to the pixels
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] += 200; // RED
        pixels.data[i + 1] -= 50; // GREEN
        pixels.data[i + 2] *= 0.5; // Blue
    }
    return pixels;
}

// Split RGB channels
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

// Apply green screen effect
function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        const red = pixels.data[i];
        const green = pixels.data[i + 1];
        const blue = pixels.data[i + 2];
        const alpha = pixels.data[i + 3];

        if (red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin &&
            red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
            pixels.data[i + 3] = 0; // Set alpha to 0 to make it transparent
        }
    }

    return pixels;
}

// Initialize
getVideo();
videoElement.addEventListener('canplay', paintToCanvas);
