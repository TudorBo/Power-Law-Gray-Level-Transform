
let link = "https://picsum.photos/300/400";

// elementele canvas
const before_canvas = document.getElementById('before_canvas');
const after_canvas = document.getElementById('after_canvas');


// contextele canvas in format 2d
const before_ctx = before_canvas.getContext('2d');
const after_ctx = after_canvas.getContext('2d');

before_canvas.width = 300;
before_canvas.height = 400;

after_canvas.width = 300;
after_canvas.height = 400;

// functia de generare a imaginiiA
function generateImage() {

//setare timp de inceput pentru a calcula timpul de executie
var start_time = performance.now();

fetch(link)
    .then(function(response) {
        return response;
    })
    .then(function(data) {
        
        // crearea imaginii
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = data.url;

        // cand imaginea este incarcata
        img.onload = function() {

        // desenarea imaginii initiale in canvasul before_canvas
        before_ctx.drawImage(img, 0, 0);

        // preluarea datelor imaginii initiale
        const imageData = before_ctx.getImageData(0, 0, before_canvas.width, before_canvas.height);

        // preluarea datelor pixelilor
        const pixelData = imageData.data;

        // aplicarea transformarii Power-Law Grey Level
        const c = 1;
        const gamma = 2; //acesta valoare se poate mofica pentru a vedea efectul transformarii (valoare subunitara pentru iluminare, valoare pesteunitara pentru intunecare)
        for (let i = 0; i < pixelData.length; i += 4) {
        pixelData[i] = c * Math.pow(pixelData[i] / 255, gamma) * 255;
        pixelData[i + 1] = c * Math.pow(pixelData[i + 1] / 255, gamma) * 255;
        pixelData[i + 2] = c * Math.pow(pixelData[i + 2] / 255, gamma) * 255;
        }
        
        // actualizarea datelor imaginii
        imageData.data = pixelData;

        // desenarea imaginii transformate in canvasul after_canvas
        after_ctx.putImageData(imageData, 0, 0);

        }
    })

    //setare timp de sfarsit pentru a calcula timpul de executie
    var end_time = performance.now();

    //afisarea timpului de executie
    document.getElementById("time").innerHTML = "Time: " + (end_time - start_time).toFixed(2) + " ms";
}

