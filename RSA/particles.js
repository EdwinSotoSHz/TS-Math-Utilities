const container = document.getElementById('effectBackground');

var numParticles = 20;
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

        let size = `${randomNum(5, 20)}%`;
        particle.style.width = size;
        particle.style.height = size;
        particle.style.left = `${randomNum(-50, 120)}%`;
        particle.style.bottom = `-30%`;
        particle.style.animationDelay = `${randomNum(0, 12)}s`;

        for (let i = 0; i < 2; i++) {
            const span = document.createElement('span');
            span.classList.add('particles');
            span.style.width = size;
            span.style.height = size;
            span.innerHTML = `  
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path class="bubble" fill="#9789FF" d="M44.6,-61.9C55.2,-53.6,59.5,-37.2,60.3,-22.5C61.1,-7.8,58.3,5.1,56.6,20.9C55,36.7,54.4,55.4,45.2,68.1C35.9,80.7,17.9,87.4,4,81.8C-9.9,76.3,-19.9,58.7,-29.3,46.1C-38.8,33.5,-47.7,26,-55,15.2C-62.2,4.4,-67.7,-9.7,-63.9,-20.5C-60,-31.3,-46.8,-38.8,-34.6,-46.5C-22.4,-54.2,-11.2,-62.2,2.9,-66.2C17,-70.1,33.9,-70.1,44.6,-61.9Z" transform="translate(100 100)" />
            </svg>
            `;
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

function randomElement(array) {
    var indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}
var blobs = document.querySelectorAll('.bubble');
var dProperty = [
    'M48.3,-62C62.4,-56.2,73.4,-41.8,77.6,-25.9C81.9,-10,79.4,7.5,73.7,23.6C68,39.7,59.1,54.4,46.3,60.2C33.5,66,16.7,62.9,2,60.1C-12.7,57.3,-25.3,54.8,-39.8,49.5C-54.2,44.2,-70.5,36.2,-79.7,22.5C-88.9,8.7,-91,-10.8,-83,-24.3C-75,-37.9,-56.8,-45.6,-41.3,-50.9C-25.8,-56.2,-12.9,-59.2,2.1,-62.1C17.1,-65,34.2,-67.8,48.3,-62Z',
    'M41,-56.1C53,-47.8,62.5,-35.6,65.4,-22.3C68.4,-9,64.7,5.4,58.4,17.1C52,28.7,42.9,37.6,32.7,49C22.5,60.3,11.3,74.2,-0.1,74.4C-11.5,74.6,-23.1,61.1,-35.1,50.4C-47,39.6,-59.5,31.5,-63.7,20.3C-68,9,-64.1,-5.3,-61,-21.4C-58,-37.6,-55.8,-55.6,-45.7,-64.6C-35.7,-73.5,-17.8,-73.4,-1.7,-71.1C14.5,-68.8,29,-64.4,41,-56.1Z',
    'M25.8,-40.8C32.3,-30.8,35.8,-21.8,45.2,-10.5C54.7,0.8,70.2,14.3,71.7,27.5C73.3,40.8,60.8,53.7,46.6,54.3C32.3,54.9,16.1,43.1,4.7,36.6C-6.8,30.2,-13.5,29,-28.2,28.6C-42.9,28.1,-65.6,28.4,-72.7,20.4C-79.8,12.3,-71.3,-4.1,-64.9,-20.2C-58.4,-36.3,-53.9,-52.1,-43.4,-60.9C-32.9,-69.7,-16.5,-71.4,-3.4,-66.7C9.6,-62,19.3,-50.9,25.8,-40.8Z',
    'M39.5,-56.9C49.5,-47.1,54.7,-33.3,59.2,-19.3C63.7,-5.3,67.5,9,67,25.3C66.5,41.6,61.8,60,49.9,68.5C38,77.1,19,75.7,3.2,71.4C-12.7,67.1,-25.4,59.7,-36.2,50.8C-47.1,42,-56.1,31.6,-56.8,20.6C-57.5,9.5,-49.8,-2.1,-44.6,-13.4C-39.4,-24.7,-36.7,-35.7,-29.7,-46.5C-22.6,-57.2,-11.3,-67.7,1.7,-70.1C14.8,-72.5,29.5,-66.7,39.5,-56.9Z',
    'M37.9,-51.6C51.7,-42.1,67.3,-34.5,72.4,-22.6C77.5,-10.8,72,5.4,66.7,21.6C61.3,37.8,56.1,53.9,45,59.7C33.9,65.5,17,61,-0.8,62.1C-18.6,63.2,-37.2,70.1,-51.3,65.2C-65.3,60.4,-74.8,43.9,-80.2,26.3C-85.6,8.7,-87,-10,-78.2,-21.8C-69.5,-33.7,-50.6,-38.7,-35.9,-47.9C-21.2,-57.1,-10.6,-70.6,0.7,-71.6C12,-72.6,24,-61.1,37.9,-51.6Z',
    'M39,-57.3C50.9,-45.2,60.9,-34.1,66.2,-20.8C71.5,-7.5,72,8,68.7,23.6C65.4,39.2,58.3,54.8,46.2,67.5C34.1,80.2,17.1,89.9,0,89.9C-17.1,89.9,-34.2,80.2,-47.2,67.9C-60.2,55.5,-69.2,40.5,-69.4,25.9C-69.5,11.3,-60.8,-2.8,-52,-12.9C-43.2,-23,-34.4,-29,-25.7,-42.3C-17,-55.5,-8.5,-75.8,2.6,-79.3C13.6,-82.9,27.2,-69.5,39,-57.3Z'
];

function changeBlobls(){
    blobs.forEach(element => {
        element.setAttribute("d", randomElement(dProperty));        
    });
}
setInterval(() => {
    changeBlobls();
}, 700);
