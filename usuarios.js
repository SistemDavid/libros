function loadUsuarios() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="crud-section">
            <div class="fixed-header">
                <h2>Gestión de Usuarios</h2>
                <form id="usuario-form">
                    <input type="hidden" id="usuario-id">
                    <input type="text" id="usuario-name" placeholder="Nombre Completo" required>
                    <input type="text" id="usuario-username" placeholder="Nombre de Usuario" required>
                    <input type="password" id="usuario-password" placeholder="Contraseña" required>
                    <select id="usuario-rol" required>
                        <option value="" disabled selected>Seleccionar Rol</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Director">Director</option>
                    </select>
                    <button type="submit">GUARDAR</button>
                </form>
            </div>
            <div class="scrollable-content">
                <div class="table-wrapper">
                    <table id="usuario-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Usuario</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="usuario-list"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Cargar los usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioList = document.getElementById('usuario-list');
    usuarioList.innerHTML = '';
    usuarios.forEach((usuario, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.name}</td>
            <td>${usuario.username}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="edit" onclick="editUsuario(${index})">Editar</button>
                <button class="delete" onclick="deleteUsuario(${index})">Eliminar</button>
            </td>
        `;
        usuarioList.appendChild(row);
    });

    document.getElementById('usuario-form').addEventListener('submit', saveUsuario);
}

function saveUsuario(event) {
    event.preventDefault();
    const id = document.getElementById('usuario-id').value;
    const name = document.getElementById('usuario-name').value;
    const username = document.getElementById('usuario-username').value;
    const password = document.getElementById('usuario-password').value;
    const rol = document.getElementById('usuario-rol').value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    try {
        // Usar la contraseña directamente (sin hasheo)
        let storedPassword = password;
        if (!password && id !== '') {
            // Mantener la contraseña existente si no se proporciona una nueva
            storedPassword = usuarios[id].password;
        }

        if (id !== '') {
            usuarios[id] = { name, username, password: storedPassword, rol };
        } else {
            usuarios.push({ name, username, password: storedPassword, rol });
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        document.getElementById('usuario-form').reset();
        document.getElementById('usuario-id').value = '';
        loadUsuarios();
    } catch (error) {
        console.error('Error al procesar el usuario:', error);
        alert('Error al guardar el usuario: ' + error.message);
    }
}

function editUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];
    document.getElementById('usuario-id').value = index;
    document.getElementById('usuario-name').value = usuario.name;
    document.getElementById('usuario-username').value = usuario.username;
    document.getElementById('usuario-password').value = '';
    document.getElementById('usuario-rol').value = usuario.rol;
}

function deleteUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    loadUsuarios();
}