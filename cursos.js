function loadCursos() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="crud-section">
            <div class="fixed-header">
                <h2>Gestión de Cursos</h2>
                <form id="curso-form">
                    <input type="hidden" id="curso-id">
                    <input type="text" id="curso-name" placeholder="Nombre del Curso" required>
                    <select id="curso-areas" multiple placeholder="Seleccionar Áreas">
                        <!-- Áreas se cargarán dinámicamente -->
                    </select>
                    <button type="submit">GUARDAR</button>
                </form>
            </div>
            <div class="scrollable-content">
                <div class="table-wrapper">
                    <table id="curso-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Áreas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="curso-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Cargar las áreas desde localStorage
    const areas = JSON.parse(localStorage.getItem('areas')) || [];
    const selectAreas = document.getElementById('curso-areas');
    selectAreas.innerHTML = ''; // Limpiar opciones previas
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area.name;
        option.textContent = area.name;
        selectAreas.appendChild(option);
    });

    // Cargar los cursos
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const cursoList = document.getElementById('curso-list');
    cursoList.innerHTML = '';
    cursos.forEach((curso, index) => {
        const row = document.createElement('tr');
        // Crear una lista desplegable para las áreas
        const areasList = curso.areas && curso.areas.length > 0
            ? `<details>
                  <summary>Ver áreas (${curso.areas.length})</summary>
                  <ul>
                      ${curso.areas.map(area => `<li>${area}</li>`).join('')}
                  </ul>
               </details>`
            : 'Sin áreas';
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${curso.name}</td>
            <td>${areasList}</td>
            <td>
                <button class="edit" onclick="editCurso(${index})">Editar</button>
                <button class="delete" onclick="deleteCurso(${index})">Eliminar</button>
            </td>
        `;
        cursoList.appendChild(row);
    });

    document.getElementById('curso-form').addEventListener('submit', saveCurso);
}

function saveCurso(event) {
    event.preventDefault();
    const id = document.getElementById('curso-id').value;
    const name = document.getElementById('curso-name').value;
    const areasSelect = document.getElementById('curso-areas');
    const selectedAreas = Array.from(areasSelect.selectedOptions).map(option => option.value);
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    if (id !== '') {
        cursos[id] = { name, areas: selectedAreas };
    } else {
        cursos.push({ name, areas: selectedAreas });
    }

    localStorage.setItem('cursos', JSON.stringify(cursos));
    document.getElementById('curso-form').reset();
    document.getElementById('curso-id').value = '';
    loadCursos();
}

function editCurso(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    const curso = cursos[index];
    document.getElementById('curso-id').value = index;
    document.getElementById('curso-name').value = curso.name;

    const areasSelect = document.getElementById('curso-areas');
    Array.from(areasSelect.options).forEach(option => {
        option.selected = curso.areas && curso.areas.includes(option.value);
    });
}

function deleteCurso(index) {
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];
    cursos.splice(index, 1);
    localStorage.setItem('cursos', JSON.stringify(cursos));
    loadCursos();
}