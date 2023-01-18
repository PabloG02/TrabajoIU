"use strict";

document.addEventListener('DOMContentLoaded', isUserAuthenticated);
createHeader('headerRolAccFunManagement', getCookie('user'), undefined);
createSidebar();

// Populates table on site load.
requestAjaxRolAccFun();

let controller;

const searchButton = document.getElementsByClassName('search')[0];
searchButton.addEventListener('click', populateModal);

function populateModal(e, fieldsData){
    resetModalContents();
    controller = new AbortController();
    
    let trigger = e.currentTarget.classList[1];
    console.log(fieldsData);
    switch(trigger){
        case 'search':
            populateModalWithAction('rolaccionfuncionalidad', 'SEARCH');
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


async function populateTableRolAccFun(tableData){
    console.log('Dentro de populate table');
    let tableContainer = document.getElementById('table-container');
    let table = document.createElement('table');
    createTableHeader(table, tableData.roles);
    //raceWorkaround = false;
    console.log(tableContainer);
    console.log(tableData);
    //console.log('RolFunAccion');
    //console.log(tableData.rolAccFun[0].id_rol.id_rol);

    let tableBody = table.createTBody();
    for(let i = 0; i < tableData.functionalities.length; i++){
        for(let j = 0; j < tableData.actions.length; j++){
            populateRow(tableBody, tableData.roles, tableData.functionalities[i], tableData.actions[j], tableData.rolAccFun);
        }
    }

    tableContainer.appendChild(table);
    /* Workaround */
    populatePage(getCookie('lang'));
}

function createTableHeader(tableElement, roles){
    let tableHeaders = ['functionality', 'action'];
    let tableHead = tableElement.createTHead();
    let rowTableHead = tableHead.insertRow();
    let cell;
    for(let i = 0; i < tableHeaders.length; i++){
        cell = document.createElement('th');
        cell.id = `${tableHeaders[i]}Th`;
        rowTableHead.appendChild(cell);
    }

    for(let i = 0; i < roles.length; i++){
        cell = document.createElement('th');
        cell.innerText = `${roles[i].nombre_rol}`;
        rowTableHead.appendChild(cell);
    }
}

function populateRow(tableElement, roles, functionality, action, rolAccFun){
    let row = tableElement.insertRow();
    let cells = [];
    for(let i = 0; i < roles.length+2; i++){
        cells[i] = row.insertCell(i);
    }

    cells[0].innerHTML = functionality.nombre_funcionalidad;
    cells[1].innerHTML = action.nombre_accion;

    //console.log(rolAccFun);
    let rolesWithPermissions = getRolesWithPermission(functionality.id_funcionalidad, action.id_accion, rolAccFun);

    for(let i = 0; i < roles.length; i++){
        if(rolesWithPermissions.includes(roles[i].id_rol)){
            //disable 0
            cells[i+2].innerHTML = '<img src="images/plus_color_green.svg" class="svg add imageButtonDisabled" translate="no" data-text-id="addTitle"> <img src="images/minus_color_red.svg" class="svg delete">';
            cells[i+2].children[1].addEventListener('click', (e) => {changeRolAccFun(e, roles[i].id_rol, functionality.id_funcionalidad, action.id_accion);});
        } else {
            //disable 1
            cells[i+2].innerHTML = '<img src="images/plus_color_green.svg" class="svg add" translate="no" data-text-id="addTitle"> <img src="images/minus_color_red.svg" class="svg delete imageButtonDisabled">';
            cells[i+2].children[0].addEventListener('click', (e) => {changeRolAccFun(e, roles[i].id_rol, functionality.id_funcionalidad, action.id_accion);});
        }
    }
}

function getRolesWithPermission(id_funcionalidad, id_accion, rolAccFun){
    let roles = [];
    for(let i = 0; i < rolAccFun.length; i++){
        if(rolAccFun[i].id_accion.id_accion == id_accion && rolAccFun[i].id_funcionalidad.id_funcionalidad == id_funcionalidad){
            //console.log(rolAccFun[i].id_accion.id_accion + '  ' + rolAccFun[i].id_funcionalidad.id_funcionalidad + '  ' + rolAccFun[i].id_rol.id_rol);
            roles.push(rolAccFun[i].id_rol.id_rol);
        }
    }

    return roles;
}

function createForm(fieldsContent, action){
    let flags = setParamsPerAction(action);

    console.log(fieldsContent);
    let form = document.createElement('form');
    form.id = 'managementForm';
    
    let roleLabel = document.createElement('label');
    let roleSelect = document.createElement('select');
    let functionalityLabel = document.createElement('label');
    let functionalitySelect = document.createElement('select');
    let actionLabel = document.createElement('label');
    let actionSelect = document.createElement('select');
    let submitButton = document.createElement('img');

    form.method = 'dialog';

    roleLabel.htmlFor = 'roleId';
    roleLabel.innerHTML = `${locale['role']}: `;
    roleLabel.style.display = 'inline-block';
    roleLabel.style.width = '115px';
    roleSelect.id = 'roleId';
    roleSelect.name = 'id_rol';

    populateSelectionDropdown(roleSelect, 'rol', action, fieldsContent);

    functionalityLabel.htmlFor = 'functionalityId';
    functionalityLabel.innerHTML = `${locale['functionality']}: `;
    functionalityLabel.style.display = 'inline-block';
    functionalityLabel.style.width = '115px';
    functionalitySelect.id = 'functionalityId';
    functionalitySelect.name = 'id_funcionalidad';

    populateSelectionDropdown(functionalitySelect, 'funcionalidad', action, fieldsContent);

    actionLabel.htmlFor = 'actionId';
    actionLabel.innerHTML = `${locale['action']}: `;
    actionLabel.style.display = 'inline-block';
    actionLabel.style.width = '115px';
    actionSelect.id = 'actionId';
    actionSelect.name = 'id_accion';

    populateSelectionDropdown(actionSelect, 'accion', action, fieldsContent);

    // <input> elements of type image are used to create graphical submit buttons, 
    // i.e. submit buttons that take the form of an image rather than text.
    if(flags.noSubmit === false){
        submitButton.id = 'submitImage';
        submitButton.src = 'images\\send_color_unofficial.png';
    }

    form.appendChild(roleLabel);
    form.appendChild(roleSelect);
    form.appendChild(functionalityLabel);
    form.appendChild(functionalitySelect);
    form.appendChild(actionLabel);
    form.appendChild(actionSelect);
    if(flags.noSubmit === false){
        form.appendChild(submitButton);
    }
    
    
    //dniField.addEventListener("blur", () => checkDNI(action), {signal: controller.signal});
    //usernameField.addEventListener("blur", () => checkName(action), {signal: controller.signal});
    //if(flags.noSubmit === false)
    if(flags.noSubmit === false)
    submitButton.addEventListener("click", (e) => {
        if(checkFormRolAccFun(e, action))
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

async function changeRolAccFun(e, rolId, functionalityId, actionId){
    let dataToSend = `controlador=rolaccionfuncionalidad&action=${e.currentTarget.classList[1].toUpperCase()}&id_rol=${rolId}&id_funcionalidad=${functionalityId}&id_accion=${actionId}`;
    console.log(dataToSend);

    let promise = new Promise(function(resolve, reject) {
        // Request sent to the backend
        $.ajax({
            method: "POST",
            url: 'http://193.147.87.202/Back/index.php',
            data: dataToSend, /* Coma needed????? */
        }).done(res => {    // Backend response
            console.log(res);
            if (res.ok != true) {
                reject(res);
            }
            else{
                resolve(res);
            }
        }).fail( function( jqXHR ) {  //TODO
            httpStatusCodeToMessage(jqXHR.status);
            console.log(jqXHR.status);
        });
    });
    await promise.then((res) => {
        console.log(res);
        
        resetModalContents();
        controller = new AbortController();
        const modal = document.getElementsByClassName('modal')[0];
        window.addEventListener('click', (e) => {
            if(e.target == modal){
                modal.style.display = '';
                controller.abort();
            }
        }, {signal: controller.signal});
        document.getElementsByClassName('modal')[0].style.display = 'block';
        document.getElementsByClassName('modal-content')[0].style.display = 'none';
        const successDiv = document.getElementById("success-messages");
        successDiv.innerHTML = '';
        successDiv.style.display = "block";

        let success = document.createElement('p');
        success.innerText = locale[res.code];

        successDiv.appendChild(success);


        resetTable();
        requestAjaxRolAccFun();
    })
    .catch((res) => {
        console.log(res);
        
        resetModalContents();
        const modal = document.getElementsByClassName('modal')[0];
        addErrorMessage(res.code, 'request-error');
        controller = new AbortController();
        window.addEventListener('click', (e) => {
            if(e.target == modal){
                modal.style.display = '';
                controller.abort();
            }
        }, {signal: controller.signal});
        document.getElementsByClassName('modal')[0].style.display = 'block';
        document.getElementsByClassName('modal-content')[0].style.display = 'none';
        

    });
}