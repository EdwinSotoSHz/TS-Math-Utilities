const canvas = document.getElementById('effectBackground');
const ctx = canvas.getContext('2d');

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

var numberParticles = 50;
var particles = Array(1).fill(0);

function addSquare() {
    for (let i = 0; i < numberParticles; i++) {
        let size = 6;
        let x = randomNum(1, canvas.width) - size;
        let y = 0 - size;
        let rotation = randomNum(0, 180);
        let speed = randomNum(0.7, 1.5);

        particles.push({
            size: size,
            x: x,
            y: y,
            rotation: rotation,
            speed: speed
        }); 
    }
}
function drawSquare() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "green";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 2; // Ancho del contorno
    for (let i = 0; i < particles.length; i++) {
        ctx.beginPath();
        ctx.strokeRect(particles[i].x - particles[i].size, particles[i].y - particles[i].size, particles[i].size, particles[i].size);
        ctx.fillRect(particles[i].x - particles[i].size, particles[i].y - particles[i].size, particles[i].size, particles[i].size);
    }
}
function updateSquare() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].y += particles[i].speed;
        particles[i].rotation += particles[i].speed*2;
        if (particles[i].y > canvas.height) {
            particles.splice(i, 1);
            i--;
        }
    }
}


function releaseAnimation() {   
    if (particles.length < numberParticles/2) {
        addSquare();
    }
    drawSquare();
    updateSquare();
    // console.log(particles.length)
    requestAnimationFrame(releaseAnimation);
}
releaseAnimation();