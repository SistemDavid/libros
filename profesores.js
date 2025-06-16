function loadProfesores() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="crud-section">
            <div class="fixed-header">
                <h2>Gestión de Profesores</h2>
                <form id="profesor-form">
                    <input type="hidden" id="profesor-id">
                    <input type="text" id="profesor-name" placeholder="Nombre del Profesor" required>
                    <select id="profesor-cursos" multiple placeholder="Seleccionar Cursos">
                        <!-- Cursos se cargarán dinámicamente -->
                    </select>
                    <button type="submit">GUARDAR</button>
                </form>
            </div>
            <div class="scrollable-content">
                <div class="table-wrapper">
                    <table id="profesor-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cursos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="profesor-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Cargar los cursos desde localStorage
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const selectCursos = document.getElementById('profesor-cursos');
    selectCursos.innerHTML = ''; // Limpiar opciones previas
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.name;
        option.textContent = curso.name;
        selectCursos.appendChild(option);
    });

    // Cargar los profesores
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    const profesorList = document.getElementById('profesor-list');
    profesorList.innerHTML = '';
    profesores.forEach((profesor, index) => {
        const row = document.createElement('tr');
        // Crear una lista desplegable para los cursos
        const cursosList = profesor.cursos && profesor.cursos.length > 0
            ? `<details>
                  <summary>Ver cursos (${profesor.cursos.length})</summary>
                  <ul>
                      ${profesor.cursos.map(curso => `<li>${curso}</li>`).join('')}
                  </ul>
               </details>`
            : 'Sin cursos';
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${profesor.name}</td>
            <td>${cursosList}</td>
            <td>
                <button class="edit" onclick="editProfesor(${index})">Editar</button>
                <button class="delete" onclick="deleteProfesor(${index})">Eliminar</button>
            </td>
        `;
        profesorList.appendChild(row);
    });

    document.getElementById('profesor-form').addEventListener('submit', saveProfesor);
}

function saveProfesor(event) {
    event.preventDefault();
    const id = document.getElementById('profesor-id').value;
    const name = document.getElementById('profesor-name').value;
    const cursosSelect = document.getElementById('profesor-cursos');
    const selectedCursos = Array.from(cursosSelect.selectedOptions).map(option => option.value);
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];

    if (id !== '') {
        profesores[id] = { name, cursos: selectedCursos };
    } else {
        profesores.push({ name, cursos: selectedCursos });
    }

    localStorage.setItem('profesores', JSON.stringify(profesores));
    document.getElementById('profesor-form').reset();
    document.getElementById('profesor-id').value = '';
    loadProfesores();
}

function editProfesor(index) {
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    const profesor = profesores[index];
    document.getElementById('profesor-id').value = index;
    document.getElementById('profesor-name').value = profesor.name;

    const cursosSelect = document.getElementById('profesor-cursos');
    Array.from(cursosSelect.options).forEach(option => {
        option.selected = profesor.cursos && profesor.cursos.includes(option.value);
    });
}

function deleteProfesor(index) {
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    profesores.splice(index, 1);
    localStorage.setItem('profesores', JSON.stringify(profesores));
    loadProfesores();
}