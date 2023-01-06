"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerPersonManagement', getCookie('user'), './menu.html');
createSidebar();

// Populates table on site load.
requestAjax('persona', 'SEARCH', false);

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
            populateModalWithAction('persona', 'ADD');
            break;
        case 'search':
            populateModalWithAction('persona', 'SEARCH');
            break;
        case 'edit':
            populateModalWithAction('persona', 'EDIT', fieldsData);
            break;
        case 'delete':
            populateModalWithAction('persona', 'DELETE', fieldsData);
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
    let tableHeaders = ['dni', 'name', 'surname', 'email', 'photo', 'edit', 'delete', 'details'];
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
    for(let i = 0; i < 8; i++){
        cells[i] = row.insertCell(i);
    }

    cells[0].innerHTML = rowData.dni;
    cells[1].innerHTML = rowData.nombre_persona;
    cells[2].innerHTML = rowData.apellidos_persona;
    cells[3].innerHTML = rowData.email_persona;
    cells[4].innerHTML = rowData.foto_persona;
    cells[5].innerHTML = '<img src="images/pencil_color.svg" class="svg edit">';
    cells[6].innerHTML = '<img src="images/wastebasket_color.svg" class="svg delete">';
    cells[7].innerHTML = '<img src="images/page_facing_up_color.svg" class="svg details">';

    cells[5].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});
    cells[6].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});
    cells[7].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});

}



function createForm(fieldsContent, action){
    let flags = setParamsPerAction(action);

    let form = document.createElement('form');
    form.id = 'managementForm';
    
    let dni = createInputWithLabel('text', 'dni', 'dni', fieldsContent, flags.readOnly || flags.dontEditPK);
    let name = createInputWithLabel('text', 'name', 'nombre_persona', fieldsContent, flags.readOnly);
    let surname = createInputWithLabel('text', 'surname', 'apellidos_persona', fieldsContent, flags.readOnly);
    let birthDate = createInputWithLabel('date', 'birthDate', 'fechaNacimiento_persona', fieldsContent, flags.readOnly);
    setMaxDate(birthDate.field);
    let address = createInputWithLabel('text', 'address', 'direccion_persona', fieldsContent, flags.readOnly);
    let phone = createInputWithLabel('text', 'phone', 'telefono_persona', fieldsContent, flags.readOnly);
    let email = createInputWithLabel('text', 'email', 'email_persona', fieldsContent, flags.readOnly);
    let photo = createInputWithLabel('text', 'photo', 'foto_persona', fieldsContent, flags.readOnly);
    let submitButton = document.createElement('img');

    form.method = 'dialog';

    if(flags.noSubmit === false){
        submitButton.id = 'submitImage';
        submitButton.src = 'images\\send_color_unofficial.png';
    }

    form.appendChild(dni.label);
    form.appendChild(dni.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(name.label);
    form.appendChild(name.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(surname.label);
    form.appendChild(surname.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(birthDate.label);
    form.appendChild(birthDate.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(address.label);
    form.appendChild(address.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(phone.label);
    form.appendChild(phone.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(email.label);
    form.appendChild(email.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(photo.label);
    form.appendChild(photo.field);
    form.appendChild(document.createElement('br'));
    if(flags.noSubmit === false){
        let submitDiv = document.createElement('div');
        submitDiv.style.display = 'flex';
        submitDiv.style.justifyContent = 'right';
        submitDiv.appendChild(submitButton);
        form.appendChild(submitDiv);
    }

    
    dni.field.addEventListener("blur", () => checkDNI(action), {signal: controller.signal});
    name.field.addEventListener("blur", () => checkName(action), {signal: controller.signal});
    surname.field.addEventListener("blur", () => checkSurname(action), {signal: controller.signal});
    birthDate.field.addEventListener("blur", () => checkBirthDate(action), {signal: controller.signal});
    address.field.addEventListener("blur", () => checkAddress(action), {signal: controller.signal});
    email.field.addEventListener("blur", () => checkEmail(action), {signal: controller.signal});
    phone.field.addEventListener("blur", () => checkPhone(action), {signal: controller.signal});
    photo.field.addEventListener("change", () => checkPhoto(action), {signal: controller.signal});
    if(flags.noSubmit === false)
        submitButton.addEventListener("click", (e) => {
            if(checkFormPerson(e, action))
                form.requestSubmit();
        }, {signal: controller.signal});

    return form;
}

function createInputWithLabel(inputType, idTextBox, inputName, fieldsContent, readOnly){
    let label = document.createElement('label');
    let field = document.createElement('input');

    label.htmlFor = idTextBox;
    label.textContent = `${locale[idTextBox]}: `;
    label.style.display = 'inline-block';
    label.style.width = '175px';
    field.className = 'textBox';
    field.type = inputType;
    field.id = idTextBox;
    field.name = inputName;
    if(locale[`${field.id}Placeholder`] !== undefined)
        field.placeholder = locale[`${field.id}Placeholder`];
    if(fieldsContent != null && fieldsContent[inputName] !== undefined)
        field.value = fieldsContent[inputName];
    field.readOnly = readOnly;

    return {label, field};
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