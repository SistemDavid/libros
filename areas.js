function loadAreas() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="crud-section">
            <h2>Gestión de Áreas</h2>
            <form id="area-form">
                <input type="hidden" id="area-id">
                <input type="text" id="area-name" placeholder="Nombre del Área" required>
                <button type="submit">GUARDAR</button>
            </form>
            <div class="table-wrapper">
                <table id="area-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="area-list"></tbody>
                </table>
            </div>
        </div>
    `;

    // Cargar las áreas desde LocalStorage
    const areas = JSON.parse(localStorage.getItem('areas')) || [];
    const areaList = document.getElementById('area-list');
    areaList.innerHTML = '';
    areas.forEach((area, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${area.name}</td>
            <td>
                <button class="edit" onclick="editArea(${index})">Editar</button>
                <button class="delete" onclick="deleteArea(${index})">Eliminar</button>
            </td>
        `;
        areaList.appendChild(row);
    });

    // Añadir evento al formulario
    document.getElementById('area-form').addEventListener('submit', saveArea);
}

function saveArea(event) {
    event.preventDefault();
    const id = document.getElementById('area-id').value;
    const name = document.getElementById('area-name').value;
    const areas = JSON.parse(localStorage.getItem('areas')) || [];

    if (id) {
        areas[id] = { name };
    } else {
        areas.push({ name });
    }

    localStorage.setItem('areas', JSON.stringify(areas));
    document.getElementById('area-form').reset();
    document.getElementById('area-id').value = '';
    loadAreas();
}

function editArea(index) {
    const areas = JSON.parse(localStorage.getItem('areas')) || [];
    const area = areas[index];
    document.getElementById('area-id').value = index;
    document.getElementById('area-name').value = area.name;
}

function deleteArea(index) {
    const areas = JSON.parse(localStorage.getItem('areas')) || [];
    areas.splice(index, 1);
    localStorage.setItem('areas', JSON.stringify(areas));
    loadAreas();
}