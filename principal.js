let initialMainContent = '';

document.addEventListener('DOMContentLoaded', function() {
    // Guardar el contenido inicial de main-content
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        initialMainContent = mainContent.innerHTML;
    }

    // Mostrar nombre del usuario logueado
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const userNameElement = document.getElementById('user-name');
    if (loggedUser && userNameElement) {
        userNameElement.textContent = loggedUser.name;
    }

    // Configurar el toggle del sidebar
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Configurar el menú desplegable del usuario
    const userMenu = document.getElementById('user-menu');
    const dropdownContent = document.getElementById('dropdown-content');
    if (userMenu && dropdownContent) {
        userMenu.addEventListener('click', function() {
            dropdownContent.classList.toggle('show');
        });
    }
});

function logout() {
    localStorage.removeItem('loggedUser');
}

function loadSection(section) {
    if (section === 'inicio') {
        const mainContent = document.getElementById('main-content');
        if (mainContent && initialMainContent) {
            mainContent.innerHTML = initialMainContent;
        }
    } else if (section === 'areas') {
        loadAreas();
    } else if (section === 'sedes') {
        loadSedes();
    } else if (section === 'cursos') {
        loadCursos();
    } else if (section === 'profesores') {
        loadProfesores();
    } else if (section === 'alumnos') {
        loadAlumnos();
    } else if (section === 'usuarios') {
        loadUsuarios();
    }
}