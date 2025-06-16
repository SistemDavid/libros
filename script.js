// Seleccionamos los elementos del DOM
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const userMenu = document.getElementById('user-menu');
const dropdownContent = document.getElementById('dropdown-content');

// Alternar el menú lateral
toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');

    // En móvil, también alternamos la clase 'expanded'
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('expanded');
    }
});

// Ajustar al redimensionar y establecer estado inicial
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('expanded');
    } else {
        sidebar.classList.remove('collapsed'); // En móvil, no colapsado por defecto
        sidebar.classList.remove('expanded'); // Aseguramos que inicie oculto
    }
});

// Estado inicial al cargar la página
if (window.innerWidth <= 768) {
    sidebar.classList.remove('collapsed'); // No colapsado
    sidebar.classList.remove('expanded'); // Oculto por defecto en móvil
}

// Mostrar/ocultar el combo de usuario con clic
userMenu.addEventListener('click', (e) => {
    dropdownContent.classList.toggle('active');
    e.stopPropagation();
});

document.addEventListener('click', (e) => {
    if (!userMenu.contains(e.target)) {
        dropdownContent.classList.remove('active');
    }
});