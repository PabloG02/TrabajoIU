"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerFunctionalityManagement', getCookie('user'), './menu.html');
createSidebar();

// Populates table on site load.
requestAjax('funcionalidad', 'SEARCH');

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
            populateModalWithAction('funcionalidad', 'ADD');
            break;
        case 'search':
            populateModalWithAction('funcionalidad', 'SEARCH');
            break;
        case 'edit':
            populateModalWithAction('funcionalidad', 'EDIT', fieldsData);
            break;
        case 'delete':
            populateModalWithAction('funcionalidad', 'DELETE', fieldsData);
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
    let tableHeaders = ['functionalityId', 'functionalityName', 'functionalityDescription', 'edit', 'delete', 'details'];
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

    cells[0].innerHTML = rowData.id_funcionalidad;
    cells[1].innerHTML = rowData.nombre_funcionalidad;
    cells[2].innerHTML = rowData.descrip_funcionalidad;
    cells[3].innerHTML = '<img src="images/pencil_color.svg" class="svg edit">';
    cells[4].innerHTML = '<img src="images/wastebasket_color.svg" class="svg delete">';
    cells[5].innerHTML = '<img src="images/page_facing_up_color.svg" class="svg details">';

    cells[3].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});
    cells[4].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});
    cells[5].children[0].addEventListener('click', (e) => {populateModal(e, rowData);});

}

function createForm(fieldsContent, action){
    let flags = setParamsPerAction(action);

    let form = document.createElement('form');
    form.id = 'managementForm';
    
    let functionalityId = createInputWithLabel('text', 'functionalityId', 'id_funcionalidad', fieldsContent, flags.readOnly || flags.dontEditPK);
    let functionalityName = createInputWithLabel('text', 'functionalityName', 'nombre_funcionalidad', fieldsContent, flags.readOnly);
    let functionalityDescription = createInputWithLabel('text', 'functionalityDescription', 'descrip_funcionalidad', fieldsContent, flags.readOnly); /*TEXTAREA ¿?¿?¿?¿?¿??¿?¿¿?¿*/
    let submitButton = document.createElement('img');

    form.method = 'dialog';

    // <input> elements of type image are used to create graphical submit buttons, 
    // i.e. submit buttons that take the form of an image rather than text.
    if(flags.noSubmit === false){
        submitButton.id = 'submitImage';
        submitButton.src = 'images\\send_color_unofficial.png';
    }

    form.appendChild(functionalityId.label);
    form.appendChild(functionalityId.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(functionalityName.label);
    form.appendChild(functionalityName.field);
    form.appendChild(document.createElement('br'));
    form.appendChild(functionalityDescription.label);
    form.appendChild(functionalityDescription.field);
    if(flags.noSubmit === false){
        let submitDiv = document.createElement('div');
        submitDiv.style.display = 'flex';
        submitDiv.style.justifyContent = 'right';
        submitDiv.appendChild(submitButton);
        form.appendChild(submitDiv);
    }


    functionalityId.field.addEventListener("blur", () => checkFunctionalityId(action), {signal: controller.signal});
    functionalityName.field.addEventListener("blur", () => checkFunctionalityName(action), {signal: controller.signal});
    functionalityDescription.field.addEventListener("blur", () => checkFunctionalityDescription(action), {signal: controller.signal});
    if(flags.noSubmit === false)
    submitButton.addEventListener("click", (e) => {
        if(checkFormFunctionality(e, action))
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

async function populateRolSelectionDropdown(functionalitySelect, fieldsContent){
    const functionalitys = await getFunctionalitysAjax();
    console.log(functionalitys);
    for(let i = 0; i < functionalitys.length; i++){
        let functionalityOption = document.createElement('option');
        functionalityOption.value = functionalitys[i].id_rol;
        functionalityOption.innerHTML = functionalitys[i].nombre_rol;
        if(fieldsContent != undefined && fieldsContent.id_rol.id_rol == functionalitys[i].id_rol){
            functionalityOption.selected = true;
        }
        functionalitySelect.appendChild(functionalityOption);
    }
}