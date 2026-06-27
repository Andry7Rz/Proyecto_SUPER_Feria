document.addEventListener("DOMContentLoaded", function() {

    // 1. MEMORIA: Cargar la época guardada inmediatamente al abrir la página
    const epocaGuardada = localStorage.getItem('epocaActual');
    if (epocaGuardada) {
        document.body.className = 'epoca-' + epocaGuardada;
    } else {
        document.body.className = 'epoca-4'; // Si es la primera vez, inicia en la Actual
    }

    // Variables del sistema
    const tooltip = document.getElementById('tooltip');
    const mapa = document.getElementById('mapa-venezuela');

    if (!mapa || !tooltip) {
        console.error("Error: No se encontró el mapa o el tooltip. Revisa los IDs en tu HTML.");
        return; 
    }

    console.log("Sistema de Tooltip e Historial inicializado.");

    // 2. DETECTAR CLICS EN LOS BOTONES (I, II, III, IV) Y GUARDAR LA ÉPOCA
    const botonesEpoca = document.querySelectorAll('.step-btn');
    botonesEpoca.forEach(boton => {
        boton.addEventListener('click', function() {
            const numeroEpoca = this.getAttribute('data-step');
            
            // Cambia la época visualmente
            document.body.className = 'epoca-' + numeroEpoca;
            
            // Guarda el número en la memoria del navegador
            localStorage.setItem('epocaActual', numeroEpoca);
        });
    });

    // 3. LÓGICA DEL TOOLTIP (Tu código original intacto)
    mapa.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'path') {
            const bodyClass = document.body.className || "epoca-4";
            const numeroEpoca = bodyClass.split('-')[1] || "4";
            const textoDinamico = e.target.getAttribute('data-' + numeroEpoca);
            let textoFinal = textoDinamico || "Estado: " + e.target.id;

            tooltip.innerText = textoFinal.toUpperCase();
            tooltip.style.opacity = "1";
        }
    });

    mapa.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 15 + 'px';
        tooltip.style.top = e.pageY + 15 + 'px';
    });

    mapa.addEventListener('mouseout', () => {
        tooltip.style.opacity = "0";
    });

});// Cierre vital








document.addEventListener("DOMContentLoaded", function() {
    // Seleccionamos todos los nuevos botones
    const botonesEpoca = document.querySelectorAll('.step-btn');
    const sliderOculto = document.getElementById('decade-slider');

    botonesEpoca.forEach(boton => {
        boton.addEventListener('click', function() {
            // Obtenemos el número de la época desde el atributo data-step
            const valorEpoca = this.getAttribute('data-step');
            
            // Movemos el slider invisible a ese valor
            sliderOculto.value = valorEpoca;
            
            // Disparamos manualmente el evento 'input' para engañar al sistema
            // y que el resto crea que el usuario arrastró el 
            sliderOculto.dispatchEvent(new Event('input'));
        });
    });
});










document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuBtn.addEventListener('click', function() {
        // Alternar clase active en la sidebar
        sidebar.classList.toggle('active');
        
        // Opcional: alternar clase en el body para empujar el contenido
        document.body.classList.toggle('menu-open');
        
        // Animación simple del botón (opcional)
        this.classList.toggle('open');
    });

    // Cerrar el menú si el usuario hace clic en un enlace de navegación
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
});

//cosa locas













































































































































document.querySelectorAll('path').forEach(estado => {
    estado.addEventListener('click', function() {
        // 1. Identificamos en qué época estamos (clase del body)
        const epocaActual = document.body.className; // Retorna "epoca-1", "epoca-2", etc.

        // 2. Buscamos entre todas las clases del estado (path) la que corresponde a esa época
        // Convertimos la lista de clases en un Array para poder buscar
        const listaClases = Array.from(this.classList);
        
        // Buscamos la clase que contenga el prefijo de la época actual
        // Ejemplo: Si estamos en epoca-1, buscará la clase que diga "indigena-"
        let archivoDestino = "";
        
        if (epocaActual === 'epoca-1') {
            archivoDestino = listaClases.find(c => c.startsWith('indigena-'));
        } else if (epocaActual === 'epoca-2') {
            archivoDestino = listaClases.find(c => c.startsWith('colonia-'));
        } else if (epocaActual === 'epoca-3') {
            archivoDestino = listaClases.find(c => c.startsWith('republica-'));
        } else {
            // Para la época 4 usamos el ID (VE-A, VE-B, etc.) porque cada estado es único
            archivoDestino = this.id; 
        }

        // 3. Si encontramos el nombre del archivo, redirigimos
        if (archivoDestino) {
            // Construimos la ruta: carpeta/subcarpeta/nombre.html
            const rutaFinal = `articulos/${epocaActual}/${archivoDestino}.html`;
            
            console.log("Navegando a: " + rutaFinal); // Para que tú veas si la ruta es correcta
            window.location.href = rutaFinal;
        } else {
            alert("No se encontró información para esta zona en esta época.");
        }
    });
});





























