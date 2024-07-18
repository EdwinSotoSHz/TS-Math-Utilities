const container = document.getElementById('effectBackground');

var numParticles = 10;
var particles = [];

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}
function randomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}


const createParticles = function(){
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particlesBody');

        let size = `${randomNum(7, 27)}%`;
        particle.style.width = size;
        particle.style.height = size;
        particle.style.left = `${randomNum(-50, 80)}%`;
        particle.style.animationDelay = `${randomNum(0, 5)}s`;

        for (let i = 0; i < 2; i++) {
            const span = document.createElement('span');
            span.classList.add('particles');
            size = `${randomNum(50, 100)}px`;
            span.style.width = size;
            span.style.height = size;
            span.style.left = `${randomNum(-50, 150)}%`;
            span.style.top = `${randomNum(-50, 200)}%`; 
            particle.appendChild(span);
        }
        particles.push(particle);
    }
}
const visualizeParticles = function(){
    particles.forEach(element => {
        container.appendChild(element);
    });
} 

createParticles();
visualizeParticles();
