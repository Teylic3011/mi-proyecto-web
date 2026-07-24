document.addEventListener('DOMContentLoaded', () => {

    // --- MODALES ---
    const modals = document.querySelectorAll('.modal-overlay');

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                window.location.hash = '#';
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.location.hash = '#';
        }
    });

    // --- BÚSQUEDA ---
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();

                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- MENÚ RESPONSIVE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        // Abrir/cerrar menú
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al presionar una opción
        const categoryLabels = navLinks.querySelectorAll('label');
        categoryLabels.forEach(label => {
            label.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Cerrar menú si se hace clic fuera
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // --- AUDIO RETRO ---
    const playRetroSound = (freq = 440, type = 'sine') => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = type; 
            oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.15);
        } catch (e) {
            // Manejo silencioso en caso de restricciones del navegador
        }
    };

    // Añadido .menu-toggle para incluir sonido retro en el menú hamburguesa
    const interactiveElements = document.querySelectorAll('.btn, .nav-links label, .menu-toggle');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => playRetroSound(587.33, 'square')); // Re5
        element.addEventListener('click', () => playRetroSound(880, 'sawtooth'));      // La5
    });

});