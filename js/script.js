document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL MENÚ HAMBURGUESA ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked (for single-page navigation)
        document.querySelectorAll('#nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // --- LÓGICA DEL FONDO ESTELAR ---
    const canvas = document.getElementById('starfield');
    if (canvas) { // Solo ejecuta si el canvas existe en el HTML
        const ctx = canvas.getContext('2d');

        let stars = [];
        const NUM_STARS = 800; // Número de estrellas
        const SPEED = 0.5; // Velocidad de movimiento

        // Ajusta el tamaño del canvas al de la ventana
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Clase para cada estrella
        class Star {
            constructor() {
                this.reset();
                this.z = Math.random() * 1000; // Posición Z inicial aleatoria
            }

            reset() {
                this.x = (Math.random() - 0.5) * 2000;
                this.y = (Math.random() - 0.5) * 2000;
                this.z = 1000;
                this.prevX = this.x;
                this.prevY = this.y;
            }

            update() {
                this.prevX = this.x / this.z * canvas.width / 2 + canvas.width / 2;
                this.prevY = this.y / this.z * canvas.height / 2 + canvas.height / 2;

                this.z -= SPEED;

                if (this.z <= 0) {
                    this.reset();
                }
            }

            draw() {
                const x = this.x / this.z * canvas.width / 2 + canvas.width / 2;
                const y = this.y / this.z * canvas.height / 2 + canvas.height / 2;

                const size = (1 - this.z / 1000) * 2;
                const opacity = 1 - this.z / 1000;

                // Dibuja la estela de la estrella (efecto "hipervelocidad" sutil)
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                ctx.lineWidth = size * 0.5;
                ctx.beginPath();
                ctx.moveTo(this.prevX, this.prevY);
                ctx.lineTo(x, y);
                ctx.stroke();

                // Dibuja la estrella
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Crea las estrellas
        for (let i = 0; i < NUM_STARS; i++) {
            stars.push(new Star());
        }

        // Bucle de animación
        function animate() {
            // Crea un efecto de estela al no limpiar el canvas por completo
            ctx.fillStyle = 'rgba(10, 14, 39, 0.2)'; // Color de fondo con transparencia
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();
    }
});