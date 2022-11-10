function requestAjaxPromise(controlador, action, readFormFields){
    /* JQuery funcion https://api.jquery.com/jquery.ajax/ */
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise */
    /* https://developer.mozilla.org/es/docs/Web/API/FormData/Using_FormData_Objects */

    let dataToSend = `controlador=${controlador}&action=${action}`;
    if(document.getElementsByTagName('form')[0] !== undefined && readFormFields){
        dataToSend += `&${$("form").serialize()}`;
        if(document.querySelector('input[type=file]') != undefined){
            // Enables the ability to send the name of the image.
            dataToSend += `&foto_persona=${document.querySelector('input[type=file]').files[0].name}`;
        }
    }
    console.log(dataToSend);
    
    return new Promise(function(resolve, reject) {
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
            //mensajeHTTPFAIL(jqXHR.status);
            console.log(jqXHR);
            console.log(jqXHR.status);
        });
    });
}

/**
 * General function to make a request to the backend and display the results in the management tables.
 * @param {string} controlador - Database table where we want to perform an action. 
 * @param {string} action - Action to be done (ADD/EDIT/DELETE/SEARCH).
 * @param {boolean} readFormFields - When doing a SEARCH, expresses the desire to read the form's fields or to just make an empty request.
 * @param {boolean} resetTable - ¿?¿?¿?¿?¿?¡
 */
async function requestAjax(controlador, action, readFormFields = true, resetTable = false){
    await requestAjaxPromise(controlador, action, readFormFields)
        .then((res) => {
            console.log(res);
            addSuccessMessage(res.code);
            /* Update table to show the new data */
            console.log('Reset table');
            document.getElementById('table-container').innerHTML = '';

            console.log(action);
            if(action == 'SEARCH'){
			    populateTable(res.resource);
            } else {
                requestAjax(controlador, 'SEARCH', false);
            }
		})
		.catch((res) => {
            console.log("Error requestAyax")
            console.log(res);
			addErrorMessage(res.code, 'request-error');
		});
}

async function sendAuthLoginRequestAjax(){
    const password = document.getElementById('password').value;
    document.getElementById('password').value = hex_md5(password);
    await requestAjaxPromise('AUTH', 'LOGIN', true)
        .then((res) => {
            console.log(res);
            setCookie('user', document.getElementById('username').value);
            window.location.assign('./menu.html');
		})
		.catch((res) => {
            document.getElementById('password').value = password;
			console.log(res.code);
            addErrorMessage(res.code, 'request-error');
		});
}

async function sendAuthSignUpRequestAjax(){
    const password = document.getElementById('password').value;
    document.getElementById('password').value = hex_md5(password);
    await requestAjaxPromise('AUTH', 'REGISTRAR', true)
        .then((res) => {
            console.log(res);
            document.getElementsByClassName('modal')[0].style.display = 'block';
            const successDiv = document.getElementById("success-messages");
            successDiv.style.display = "block";

            let success = document.createElement('p');
            success.innerText = 'Te has registrado con éxito';

            successDiv.appendChild(success);
            setTimeout(() => { window.location.assign('./login.html'); }, 5000);
		})
		.catch((res) => {
            document.getElementById('password').value = password;
			console.log(res.code);
            addErrorMessage(res.code, 'request-error');
		});
}

async function sendAuthChangePasswordRequestAjax(){
    const password = document.getElementById('password').value;
    document.getElementById('password').value = hex_md5(password);
    await requestAjaxPromise('AUTH', 'CAMBIAR_CONTRASENA', true)
        .then((res) => {
            console.log(res);
            document.getElementsByClassName('modal')[0].style.display = 'block';
            const successDiv = document.getElementById("success-messages");
            successDiv.style.display = "block";

            let success = document.createElement('p');
            success.innerText = 'Has cambiado la contraseña con éxito';

            successDiv.appendChild(success);
            setTimeout(() => { window.location.assign('./login.html'); }, 5000);
		})
		.catch((res) => {
            document.getElementById('password').value = password;
			console.log(res.code);
            addErrorMessage(res.code, 'request-error');
		});
}

async function getSelectAjax(controlador){
    let rolesData;
    await requestAjaxPromise(controlador, 'SEARCH')
        .then((res) => {
            rolesData = res.resource;
		})
		.catch((res) => {
			console.log(res.code);
		});

    return rolesData;
}

async function requestAjaxRolAccFun(){
    let roles = await requestAjaxPromise('rol', 'SEARCH').then((res) => res.resource);
    let actions = await requestAjaxPromise('accion', 'SEARCH').then((res) => res.resource);
    let functionalities = await requestAjaxPromise('funcionalidad', 'SEARCH').then((res) => res.resource);
    let rolAccFun = await requestAjaxPromise('rolaccionfuncionalidad', 'SEARCH').then((res) => res.resource);

    populateTableRolAccFun({roles, actions, functionalities, rolAccFun});
}

async function requestAjaxSEARCHRolAccFun(){
    let roles = await requestAjaxSEARCHPromiseRolAccFun('rol', 'SEARCH', 'roleId').then((res) => res);
    let actions = await requestAjaxSEARCHPromiseRolAccFun('accion', 'SEARCH', 'actionId').then((res) => res);
    let functionalities = await requestAjaxSEARCHPromiseRolAccFun('funcionalidad', 'SEARCH', 'functionalityId').then((res) => res);
    let rolAccFun = await requestAjaxPromise('rolaccionfuncionalidad', 'SEARCH').then((res) => res);

    addSuccessMessage(roles.code);
    addSuccessMessage(actions.code);
    addSuccessMessage(functionalities.code);
    addSuccessMessage(rolAccFun.code);
    /* Update table to show the new data */
    console.log('Reset table');
    document.getElementById('table-container').innerHTML = '';

    roles = roles.resource;
    actions = actions.resource;
    functionalities = functionalities.resource;
    rolAccFun = rolAccFun.resource;
    
    if(document.getElementById('roleId').value != '')
        roles = roles.filter(role => role.id_rol == document.getElementById('roleId').value);
    if(document.getElementById('actionId').value != '')
        actions = actions.filter(action => action.id_accion == document.getElementById('actionId').value);
    if(document.getElementById('functionalityId').value != '')
        functionalities = functionalities.filter(functionaly => functionaly.id_funcionalidad == document.getElementById('functionalityId').value);

    populateTableRolAccFun({roles, actions, functionalities, rolAccFun});
}

function requestAjaxSEARCHPromiseRolAccFun(controlador, action, id){
    let dataToSend = `controlador=${controlador}&action=${action}&${$(`#${id}`).serialize()}`;
    console.log(dataToSend);
    
    return new Promise(function(resolve, reject) {
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
            //mensajeHTTPFAIL(jqXHR.status);
            console.log(jqXHR);
            console.log(jqXHR.status);
        });
    });
}