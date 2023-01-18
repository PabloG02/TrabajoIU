"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerUserManagement', getCookie('user'), undefined);
createSidebar();

// Populates table on site load.
requestAjax('usuario', 'SEARCH', false);

let controller;
const addButton = document.getElementsByClassName('add')[0];
const searchButton = document.getElementsByClassName('search')[0];

addButton.addEventListener('click', populateModal);
searchButton.addEventListener('click', populateModal);

function populateModal(e, fieldsData){
    resetModalContents();
    controller = new AbortController();
    
    let trigger = e.currentTarget.classList[1];
    console.log(fieldsData);
    switch(trigger){
        case 'add':
            populateModalWithAction('usuario', 'ADD');
            break;
        case 'search':
            populateModalWithAction('usuario', 'SEARCH');
            break;
        case 'edit':
            populateModalWithAction('usuario', 'EDIT', fieldsData);
            break;
        case 'delete':
            populateModalWithAction('usuario', 'DELETE', fieldsData);
            break;
        case 'details':
            populateModalWithDetails(fieldsData);
            break;
    }

    const modal = document.getElementsByClassName('modal')[0];
    window.addEventListener('click', (e) => {
        if(e.target == modal){
            resetModalContents();
            modal.style.display = '';
            controller.abort();
        }
    }, {signal: controller.signal});
    modal.style.display = 'block';
}


function createTableHeader(tableElement){
    let tableHeaders = ['dni', 'username', 'role', 'edit', 'delete', 'details'];
    let tableHead = tableElement.createTHead();
    let rowTableHead = tableHead.insertRow();
    let cell;
    for(let i = 0; i < tableHeaders.length; i++){
        cell = document.createElement('th');
        cell.id = `${tableHeaders[i]}Th`;
        rowTableHead.appendChild(cell);
    }
}

function populateRow(tableElement, rowData){
    let row = tableElement.insertRow();
    let cells = [];
    for(let i = 0; i < 6; i++){
        cells[i] = row.insertCell(i);
    }

    cells[0].innerHTML = rowData.dni;
    cells[1].innerHTML = rowData.usuario;
    cells[2].innerHTML = rowData.id_rol.nombre_rol;
    cells[3].innerHTML = '<img src="images/pencil_color.svg" class="svg edit" translate="no" data-text-id="editTitle">';
    cells[4].innerHTML = '<img src="images/wastebasket_color.svg" class="svg delete" translate="no" data-text-id="deleteTitle">';
    cells[5].innerHTML = '<img src="images/page_facing_up_color.svg" class="svg details" translate="no" data-text-id="detailsTitle">';

    cells[3].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});
    cells[4].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});
    cells[5].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});

}

function createForm(fieldsContent, action){
    let flags = setParamsPerAction(action);

    let form = document.createElement('form');
    form.id = 'managementForm';
    
    let dni = createInputWithLabel('text', 'dni', 'dni', fieldsContent, flags.readOnly || flags.dontEditPK);
    let username = createInputWithLabel('text', 'username', 'usuario', fieldsContent, flags.readOnly);
    let roleLabel = document.createElement('label');
    let roleSelect = document.createElement('select');
    let submitButton = document.createElement('img');

    form.method = 'dialog';

    roleLabel.htmlFor = 'roleId';
    roleLabel.innerHTML = `${locale['role']}: `;
    roleLabel.style.display = 'inline-block';
    roleLabel.style.width = '80px';
    roleSelect.id = 'roleId';
    roleSelect.name = 'id_rol';

    populateSelectionDropdown(roleSelect, 'rol', action, fieldsContent);
    
    if(flags.readOnly === true){
        roleSelect.style.backgroundColor = 'var(--div-color)';
        roleSelect.style.pointerEvents = 'none';
    }

    // <input> elements of type image are used to create graphical submit buttons, 
    // i.e. submit buttons that take the form of an image rather than text.
    if(flags.noSubmit === false){
        submitButton.id = 'submitImage';
        submitButton.src = 'images\\send_color_unofficial.png';
    }

    form.appendChild(dni.label);
    form.appendChild(dni.field);
    form.appendChild(dni.errorMessage);
    form.appendChild(username.label);
    form.appendChild(username.field);
    form.appendChild(username.errorMessage);
    form.appendChild(roleLabel);
    form.appendChild(roleSelect);
    let errorMessage = document.createElement('p');
    errorMessage.id = `roleIdError`;
    form.appendChild(errorMessage);
    if(flags.noSubmit === false){
        form.appendChild(submitButton);
    }
    
    
    dni.field.addEventListener("blur", () => checkDNI(action), {signal: controller.signal});
    username.field.addEventListener("blur", () => checkUsername(action), {signal: controller.signal});
    if(flags.noSubmit === false)
    submitButton.addEventListener("click", (e) => {
        if(checkFormUserManagement(e, action))
            form.requestSubmit();
    }, {signal: controller.signal});

    return form;
}

async function populateSelectionDropdown(roleSelect, controlador, action, fieldsContent){
    const roles = await getSelectAjax(controlador);
    console.log(roles);
    let roleOption;
    if(action === 'SEARCH'){
        roleOption = document.createElement('option');
        roleSelect.appendChild(roleOption);
    }
    for(let i = 0; i < roles.length; i++){
        roleOption = document.createElement('option');
        roleOption.value = roles[i][`id_${controlador}`];
        roleOption.innerHTML = roles[i][`nombre_${controlador}`];
        if(fieldsContent != undefined && fieldsContent.id_rol.id_rol == roles[i].id_rol){
            roleOption.selected = true;
        }
        roleSelect.appendChild(roleOption);
    }
}

function createInputWithLabel(inputType, idTextBox, inputName, fieldsContent, readOnly){
    let label = document.createElement('label');
    let field = document.createElement('input');
    let errorMessage = document.createElement('p');

    label.htmlFor = idTextBox;
    label.textContent = `${locale[idTextBox]}: `;
    label.style.display = 'inline-block';
    label.style.width = '80px';
    field.className = 'textBox';
    field.type = inputType;
    field.id = idTextBox;
    field.name = inputName;
    if(locale[`${field.id}Placeholder`] !== undefined)
        field.placeholder = locale[`${field.id}Placeholder`];
    if(fieldsContent != null && fieldsContent[inputName] !== undefined)
        field.value = fieldsContent[inputName];
    field.readOnly = readOnly;
    errorMessage.id = `${field.id}Error`;

    return {label, field, errorMessage};
}