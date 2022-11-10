// Common to all pages
function createHeader(h1Id, loginInfo, goBackPageName){
    let headerElement = document.createElement('header');
    let goBackContainer = document.createElement('div');
    let h1Element = document.createElement('h1');
    let headerLeftContainer = document.createElement('div');
    let languagesDiv = document.createElement('div');
    let userDiv = document.createElement('div');

    goBackContainer.innerHTML = `<a href="${goBackPageName}"><img src="./images/left_arrow_color.svg" id="goBack"></a>`;

    h1Element.id = h1Id;

    headerLeftContainer.id = 'headerLeftContainer';

    languagesDiv.id = 'languagesDiv';
    languagesDiv.innerHTML = '<span id="en_US">EN</span> <span id="es_ES">ES</span> <span id="gl_ES">GL</span>';

    userDiv.id = 'userDiv';
    userDiv.innerHTML = `<img src="./images/person_color_default.svg"><span>${loginInfo}</span><img src="./images/cross_mark_color.svg" id="signOut">`;

    headerLeftContainer.appendChild(languagesDiv);
    if(loginInfo !== undefined)
        headerLeftContainer.appendChild(userDiv);

    if(goBackPageName !== undefined)
        headerElement.appendChild(goBackContainer);
    headerElement.appendChild(h1Element);
    headerElement.appendChild(headerLeftContainer);
    document.body.prepend(headerElement);

    if(loginInfo !== undefined){
        document.getElementById('signOut').addEventListener('click', () => {
            deleteCookie('user');
            document.location.assign('./login.html');
        });
    }
}

/* -- Used in Management pages -- */
// Common functions related to the table that shows the database info
function setParamsPerAction(action){
    // Flag to make fields read-only
    let readOnly = action === 'DELETE' || action === 'DETAILS';
    // Flag to not create the submit button.
    let noSubmit = action === 'DETAILS';

    return {readOnly, noSubmit};
}

function populateTable(tableData){
    console.log('Dentro de populate table');
    let tableContainer = document.getElementById('table-container');
    let table = document.createElement('table');
    createTableHeader(table);
    console.log('Headers creados');
    raceWorkaround = false;
    console.log(tableContainer);

    let tableBody = table.createTBody();
    for(let i = 0; i < tableData.length; i++){
        populateRow(tableBody, tableData[i]);
    }

    tableContainer.appendChild(table);
    /* Workaround */
    populatePage(getCookie('lang'));
}

function resetTable(){
    document.getElementById('table-container').innerHTML = '';
}

// Common functions related to the modal that is used to create the forms for the Ayax request.
function populateModalWithAction(controlador, action, fieldsData){
    const modalContent = document.getElementsByClassName('modal-content')[0];
    const form = createForm(fieldsData, action);

    form.addEventListener('submit', () => {
        if(controlador === 'rolaccionfuncionalidad') requestAjaxSEARCHRolAccFun();
        else    requestAjax(controlador, action);
        // Loading image
        // let x = document.createElement("img");
        // x.src = "images/progress.gif";
        // modalContent.appendChild(x);
    }, {signal: controller.signal});

    modalContent.appendChild(form);
}

function populateModalWithDetails(fieldsData){
    const modalContent = document.getElementsByClassName('modal-content')[0];
    const form = createForm(fieldsData, 'DETAILS');

    modalContent.appendChild(form);
}

function resetModalContents(){
    document.getElementsByClassName('modal-content')[0].innerHTML = '';
    document.getElementsByClassName('modal-content')[0].style.display = '';
    document.getElementById('success-messages').innerHTML = '';
    document.getElementById('success-messages').style.display = '';
    document.getElementById('error-messages').innerHTML = '';
    document.getElementById('error-messages').style.display = '';
}



function addErrorMessage(errorCode, errorType) {
    const errorDiv = document.getElementById("error-messages");
    errorDiv.style.display = "block";

    let error = document.createElement('p');
    error.ariaLabel = errorType;
    error.id = errorCode;
    error.innerHTML = locale[errorCode];

    let errorList = errorDiv.childNodes;
    let i = 0;
    let found = false;

    while (i < errorList.length && !found) {
        if (errorList[i].ariaLabel == errorType) {
            found = true;
            errorDiv.replaceChild(error, errorList[i]);
        }
        i++;
    }
    console.log(i + 'error' + errorList.length);
    if(!found){
        errorDiv.appendChild(error);
    }

    if (errorType !== 'request-error') removeErrorMessage('request-error');
}

function addSuccessMessage(message) {
    document.getElementsByClassName('modal-content')[0].style.display = 'none';
    document.getElementById('error-messages').style.display = 'none';
    const successDiv = document.getElementById("success-messages");
    successDiv.style.display = "block";

    let success = document.createElement('p');
    success.innerText = message;

    successDiv.appendChild(success);
}






/**
 * Shows the preview of an uploaded image.
 * @param {*} idElement 
 * @param {*} photo 
 */
 function showPreview(idElement, photo){
    const previewContainer = document.getElementById(idElement);
    let toRemove = previewContainer.getElementsByTagName('img')[0];
    if (toRemove != null){
        previewContainer.removeChild(toRemove);
    }
    const image = document.createElement('img');
    image.src = URL.createObjectURL(photo);
    image.style.height = '63px'
    previewContainer.appendChild(image);
}