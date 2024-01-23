
let Name = document.getElementById("name")
let Email = document.getElementById("email")
let Location = document.getElementById("location")
let Followers = document.getElementById("followers")
let Following = document.getElementById("following")
let Repos = document.getElementById("repos")
var form=document.getElementById("myForm")
let pfp = document.getElementById("pfp")

form.addEventListener('submit',function(e){
    e.preventDefault()
    var search = document.getElementById("search").value

    var originalName = search.split('').join('')
    fetch("https://api.github.com/users/"+originalName)
    .then((result) => result.json())
    .then((data) => {
    pfp.src =data.avatar_url; 
    Name.innerHTML = data.name
    Location.innerHTML = data.location
    Repos.innerHTML = data.public_repos
    Followers.innerHTML = data.followers
    Following.innerHTML = data.following
    Email.innerHTML = data.email

})

})
const canvas = document.getElementById('interactiveCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = (Math.random() - 0.5) * 2; // Random horizontal velocity
    this.dy = (Math.random() - 0.5) * 2; // Random vertical velocity

    this.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx; // Reverse horizontal velocity on collision with the canvas edges
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy; // Reverse vertical velocity on collision with the canvas edges
        }

        this.draw();
    };
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        const radius = Math.random() * 5 + 2; // Random radius between 2 and 7
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.8)`;

        particles.push(new Particle(x, y, radius, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
}

createParticles();
animate();
