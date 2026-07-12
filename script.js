document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. DECLARACIÓN DE VARIABLES Y ELEMENTOS
    // ==========================================
    const tooltip = document.getElementById('tooltip');
    const mapa = document.getElementById('mapa-venezuela');
    const botonesEpoca = document.querySelectorAll('.step-btn');
    const sliderOculto = document.getElementById('decade-slider');
    const menuBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const navLinks = document.querySelectorAll('.sidebar a');

    // ==========================================
    // 2. SISTEMA DE ÉPOCAS (Memoria y Sincronización)
    // ==========================================
    // Carga la época guardada del LocalStorage; si está vacío, inicia en la Época 1
    const epocaGuardada = localStorage.getItem('epocaActual') || '1';
    document.body.className = 'epoca-' + epocaGuardada;
    if (sliderOculto) sliderOculto.value = epocaGuardada;

    // Control único para cambiar de época al pulsar los botones
    botonesEpoca.forEach(boton => {
        boton.addEventListener('click', function() {
            const numeroEpoca = this.getAttribute('data-step');
            
            // 1. Cambia la clase del body para activar los estilos CSS correspondientes
            document.body.className = 'epoca-' + numeroEpoca;
            
            // 2. Guarda la selección en la memoria del navegador
            localStorage.setItem('epocaActual', numeroEpoca);
            
            // 3. Sincroniza y activa el slider invisible del mapa
            if (sliderOculto) {
                sliderOculto.value = numeroEpoca;
                sliderOculto.dispatchEvent(new Event('input'));
            }
        });
    });

    // ==========================================
    // 3. LÓGICA DEL TOOLTIP (Nombres de los Estados)
    // ==========================================
    if (mapa && tooltip) {
        // Al pasar el mouse sobre un estado
        mapa.addEventListener('mouseover', (e) => {
            if (e.target.tagName === 'path') {
                const bodyClass = document.body.className || "epoca-1";
                const numeroEpoca = bodyClass.split('-')[1] || "1";
                
                // Busca el atributo dinámico del SVG (data-1, data-2, etc.)
                const textoDinamico = e.target.getAttribute('data-' + numeroEpoca);
                const textoFinal = textoDinamico || "Estado: " + e.target.id;

                tooltip.innerText = textoFinal.toUpperCase();
                tooltip.style.opacity = "1";
            }
        });

        // Movimiento del tooltip junto al cursor
        mapa.addEventListener('mousemove', (e) => {
            tooltip.style.left = (e.pageX + 15) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        });

        // Ocultar tooltip al salir del estado
        mapa.addEventListener('mouseout', () => {
            tooltip.style.opacity = "0";
        });
    }

    // ==========================================
    // 4. CONTROL DEL MENÚ LATERAL (Sidebar)
    // ==========================================
    if (menuBtn && sidebar) {
        // Abrir/Cerrar menú
        menuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            this.classList.toggle('open');
        });

        // Cerrar menú automáticamente al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

   // ==========================================
    // 5. REDIRECCIÓN CON DETECCION AUTOMÁTICA (FETCH)
    // ==========================================
    document.querySelectorAll('path').forEach(estado => {
        estado.addEventListener('click', function() {
            const epocaActual = document.body.className || 'epoca-1';
            const listaClases = Array.from(this.classList);
            let archivoDestino = "";
            
            if (epocaActual === 'epoca-1') {
                archivoDestino = listaClases.find(c => c.startsWith('indigena-'));
            } else if (epocaActual === 'epoca-2') {
                archivoDestino = listaClases.find(c => c.startsWith('colonia-'));
            } else if (epocaActual === 'epoca-3') {
                archivoDestino = listaClases.find(c => c.startsWith('republica-'));
            } else {
                archivoDestino = this.id; 
            }

            if (archivoDestino) {
                const rutaDestino = `articulos/${epocaActual}/${archivoDestino}.html`;
                const rutaErrorPersonalizado = `articulos/pantalla-espera.html`;

                // Hacemos una consulta rápida al sistema de archivos para ver si el HTML existe
                fetch(rutaDestino, { method: 'HEAD' })
                    .then(response => {
                        if (response.ok) {
                            // El archivo existe, entramos
                            window.location.href = rutaDestino;
                        } else {
                            // El archivo no existe (404), redirigimos al error personalizado
                            window.location.href = rutaErrorPersonalizado;
                        }
                    })
                    .catch(() => {
                        // Por si falla la red o bloquea el acceso local, por seguridad redirige al error
                        window.location.href = rutaErrorPersonalizado;
                    });
            }
        });
    });

});
















