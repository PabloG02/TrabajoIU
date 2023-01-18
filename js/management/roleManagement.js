"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerRoleManagement', getCookie('user'), undefined);
createSidebar();

// Populates table on site load.
requestAjax('rol', 'SEARCH');

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
            populateModalWithAction('rol', 'ADD');
            break;
        case 'search':
            populateModalWithAction('rol', 'SEARCH');
            break;
        case 'edit':
            populateModalWithAction('rol', 'EDIT', fieldsData);
            break;
        case 'delete':
            populateModalWithAction('rol', 'DELETE', fieldsData);
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
    let tableHeaders = ['roleId', 'roleName', 'roleDescription', 'edit', 'delete', 'details'];
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

    cells[0].innerHTML = rowData.id_rol;
    cells[1].innerHTML = rowData.nombre_rol;
    cells[2].innerHTML = rowData.descrip_rol;
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
    
    let roleId = createInputWithLabel('text', 'roleId', 'id_rol', fieldsContent, flags.readOnly || flags.dontEditPK);
    let roleName = createInputWithLabel('text', 'roleName', 'nombre_rol', fieldsContent, flags.readOnly);
    let roleDescription = createInputWithLabel('text', 'roleDescription', 'descrip_rol', fieldsContent, flags.readOnly); /*TEXTAREA ¿?¿?¿?¿?¿??¿?¿¿?¿*/
    let submitButton = document.createElement('img');

    form.method = 'dialog';

    // <input> elements of type image are used to create graphical submit buttons, 
    // i.e. submit buttons that take the form of an image rather than text.
    if(flags.noSubmit === false){
        submitButton.id = 'submitImage';
        submitButton.src = 'images\\send_color_unofficial.png';
    }

    form.appendChild(roleId.label);
    form.appendChild(roleId.field);
    form.appendChild(roleId.errorMessage);
    form.appendChild(roleName.label);
    form.appendChild(roleName.field);
    form.appendChild(roleName.errorMessage);
    form.appendChild(roleDescription.label);
    form.appendChild(roleDescription.field);
    form.appendChild(roleDescription.errorMessage);
    if(flags.noSubmit === false){
        form.appendChild(submitButton);
    }


    roleId.field.addEventListener("blur", () => checkRoleId(action), {signal: controller.signal});
    roleName.field.addEventListener("blur", () => checkRoleName(action), {signal: controller.signal});
    roleDescription.field.addEventListener("blur", () => checkRoleDescription(action), {signal: controller.signal});
    if(flags.noSubmit === false)
    submitButton.addEventListener("click", (e) => {
        if(checkFormRole(e, action))
            form.requestSubmit();
    }, {signal: controller.signal});

    return form;
}

function createInputWithLabel(inputType, idTextBox, inputName, fieldsContent, readOnly){
    let label = document.createElement('label');
    let field = document.createElement('input');
    let errorMessage = document.createElement('p');

    label.htmlFor = idTextBox;
    label.textContent = `${locale[idTextBox]}: `;
    label.style.display = 'inline-block';
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

async function populateRolSelectionDropdown(roleSelect, fieldsContent){
    const roles = await getRolesAjax();
    console.log(roles);
    for(let i = 0; i < roles.length; i++){
        let roleOption = document.createElement('option');
        roleOption.value = roles[i].id_rol;
        roleOption.innerHTML = roles[i].nombre_rol;
        if(fieldsContent != undefined && fieldsContent.id_rol.id_rol == roles[i].id_rol){
            roleOption.selected = true;
        }
        roleSelect.appendChild(roleOption);
    }
}