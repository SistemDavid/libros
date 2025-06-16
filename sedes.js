function loadSedes() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="crud-section">
            <h2>Gestión de Sedes</h2>
            <form id="sede-form">
                <input type="hidden" id="sede-id">
                <input type="text" id="sede-name" placeholder="Nombre de la Sede" required>
                <button type="submit">GUARDAR</button>
            </form>
            <div class="table-wrapper">
                <table id="sede-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="sede-list"></tbody>
                </table>
            <div/>
        </div>
    `;

    // Cargar las sedes desde LocalStorage
    const sedes = JSON.parse(localStorage.getItem('sedes')) || [];
    const sedeList = document.getElementById('sede-list');
    sedeList.innerHTML = '';
    sedes.forEach((sede, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${sede.name}</td>
            <td>
                <button class="edit" onclick="editSede(${index})">Editar</button>
                <button class="delete" onclick="deleteSede(${index})">Eliminar</button>
            </td>
        `;
        sedeList.appendChild(row);
    });

    // Añadir evento al formulario
    document.getElementById('sede-form').addEventListener('submit', saveSede);
}

function saveSede(event) {
    event.preventDefault();
    const id = document.getElementById('sede-id').value;
    const name = document.getElementById('sede-name').value;
    const sedes = JSON.parse(localStorage.getItem('sedes')) || [];

    if (id) {
        sedes[id] = { name };
    } else {
        sedes.push({ name });
    }

    localStorage.setItem('sedes', JSON.stringify(sedes));
    document.getElementById('sede-form').reset();
    document.getElementById('sede-id').value = '';
    loadSedes();
}

function editSede(index) {
    const sedes = JSON.parse(localStorage.getItem('sedes')) || [];
    const sede = sedes[index];
    document.getElementById('sede-id').value = index;
    document.getElementById('sede-name').value = sede.name;
}

function deleteSede(index) {
    const sedes = JSON.parse(localStorage.getItem('sedes')) || [];
    sedes.splice(index, 1);
    localStorage.setItem('sedes', JSON.stringify(sedes));
    loadSedes();
}