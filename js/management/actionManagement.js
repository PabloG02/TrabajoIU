"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerActionManagement', getCookie('user'), undefined);
createSidebar();

// Populates table on site load.
requestAjax('accion', 'SEARCH');

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
            populateModalWithAction('accion', 'ADD');
            break;
        case 'search':
            populateModalWithAction('accion', 'SEARCH');
            break;
        case 'edit':
            populateModalWithAction('accion', 'EDIT', fieldsData);
            break;
        case 'delete':
            populateModalWithAction('accion', 'DELETE', fieldsData);
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
    let tableHeaders = ['actionId', 'actionName', 'actionDescription', 'edit', 'delete', 'details'];
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

    cells[0].innerHTML = rowData.id_accion;
    cells[1].innerHTML = rowData.nombre_accion;
    cells[2].innerHTML = rowData.descrip_accion;
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
    
    let actionId = createInputWithLabel('text', 'actionId', 'id_accion', fieldsContent, flags.readOnly || flags.dontEditPK);
    let actionName = createInputWithLabel('text', 'actionName', 'nombre_accion', fieldsContent, flags.readOnly);
    let actionDescription = createInputWithLabel('text', 'actionDescription', 'descrip_accion', fieldsContent, flags.readOnly); /*TEXTAREA ¿?¿?¿?¿?¿??¿?¿¿?¿*/
    let submitButton = document.createElement('img');

    form.method = 'dialog';

    // <input> elements of type image are used to create graphical submit buttons, 
    // i.e. submit buttons that take the form of an image rather than text.
    if(flags.noSubmit === false){
        submitButton.id = 'submitImage';
        submitButton.src = 'images\\send_color_unofficial.png';
    }

    form.appendChild(actionId.label);
    form.appendChild(actionId.field);
    form.appendChild(actionId.errorMessage);
    form.appendChild(actionName.label);
    form.appendChild(actionName.field);
    form.appendChild(actionName.errorMessage);
    form.appendChild(actionDescription.label);
    form.appendChild(actionDescription.field);
    form.appendChild(actionDescription.errorMessage);
    if(flags.noSubmit === false){
        form.appendChild(submitButton);
    }


    actionId.field.addEventListener("blur", () => checkActionId(action), {signal: controller.signal});
    actionName.field.addEventListener("blur", () => checkActionName(action), {signal: controller.signal});
    actionDescription.field.addEventListener("blur", () => checkActionDescription(action), {signal: controller.signal});
    if(flags.noSubmit === false)
    submitButton.addEventListener("click", (e) => {
        if(checkFormAction(e, action))
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
    errorMessage.id = `${field.id}Error`;

    return {label, field, errorMessage};
}
