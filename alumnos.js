function loadAlumnos() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="crud-section">
            <div class="fixed-header">
                <h2>Gestión de Alumnos</h2>
                <form id="alumno-form">
                    <input type="hidden" id="alumno-id">
                    <input type="text" id="alumno-name" placeholder="Nombre del Alumno" required>
                    <select id="alumno-cursos" multiple placeholder="Seleccionar Cursos">
                        <!-- Cursos se cargarán dinámicamente -->
                    </select>
                    <button type="submit">GUARDAR</button>
                </form>
            </div>
            <div class="scrollable-content">
                <div class="table-wrapper">
                    <table id="alumno-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Cursos</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="alumno-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Cargar los cursos desde localStorage
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const selectCursos = document.getElementById('alumno-cursos');
    selectCursos.innerHTML = ''; // Limpiar opciones previas
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.name;
        option.textContent = curso.name;
        selectCursos.appendChild(option);
    });

    // Cargar los alumnos
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    const alumnoList = document.getElementById('alumno-list');
    alumnoList.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const row = document.createElement('tr');
        // Crear una lista desplegable para los cursos
        const cursosList = alumno.cursos && alumno.cursos.length > 0
            ? `<details>
                  <summary>Ver cursos (${alumno.cursos.length})</summary>
                  <ul>
                      ${alumno.cursos.map(curso => `<li>${curso}</li>`).join('')}
                  </ul>
               </details>`
            : 'Sin cursos';
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${alumno.name}</td>
            <td>${cursosList}</td>
            <td>
                <button class="edit" onclick="editAlumno(${index})">Editar</button>
                <button class="delete" onclick="deleteAlumno(${index})">Eliminar</button>
            </td>
        `;
        alumnoList.appendChild(row);
    });

    document.getElementById('alumno-form').addEventListener('submit', saveAlumno);
}

function saveAlumno(event) {
    event.preventDefault();
    const id = document.getElementById('alumno-id').value;
    const name = document.getElementById('alumno-name').value;
    const cursosSelect = document.getElementById('alumno-cursos');
    const selectedCursos = Array.from(cursosSelect.selectedOptions).map(option => option.value);
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

    if (id !== '') {
        alumnos[id] = { name, cursos: selectedCursos };
    } else {
        alumnos.push({ name, cursos: selectedCursos });
    }

    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    document.getElementById('alumno-form').reset();
    document.getElementById('alumno-id').value = '';
    loadAlumnos();
}

function editAlumno(index) {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    const alumno = alumnos[index];
    document.getElementById('alumno-id').value = index;
    document.getElementById('alumno-name').value = alumno.name;

    const cursosSelect = document.getElementById('alumno-cursos');
    Array.from(cursosSelect.options).forEach(option => {
        option.selected = alumno.cursos && alumno.cursos.includes(option.value);
    });
}

function deleteAlumno(index) {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    alumnos.splice(index, 1);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    loadAlumnos();
}