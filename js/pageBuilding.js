// Common to all pages
function createHeader(h1Id, loginInfo, goBackPageName){
    let headerElement = document.createElement('header');
    let goBackContainer = document.createElement('div');
    let h1Element = document.createElement('h1');
    let headerLeftContainer = document.createElement('div');
    let languagesDiv = document.createElement('div');
    let userDiv = document.createElement('div');

    goBackContainer.innerHTML = `<a href="${goBackPageName}"><img src="./images/left_arrow_color.svg" id="goBack" translate="no" data-text-id="goBack"></a>`;

    h1Element.id = h1Id;

    headerLeftContainer.id = 'headerLeftContainer';

    languagesDiv.id = 'languagesDiv';
    languagesDiv.innerHTML = '<span id="en_US">EN</span> <span id="es_ES">ES</span> <span id="gl_ES">GL</span>';

    userDiv.id = 'userDiv';
    userDiv.innerHTML = `<img src="./images/person_color_default.svg">
                        <span>${loginInfo}</span>
                        <a href="./changePassword.html"><img src="./images/locked_with_key_color.svg" id="changePassword" translate="no" data-text-id="changePassword"></a>
                        <img src="./images/cross_mark_color.svg" id="signOut" translate="no" data-text-id="signOut">`;

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
/**
 * TODO: TRAADUCIR!!!
 */
function createSidebar(){
    let navElement = document.createElement('nav');
    navElement.className = 'navbar close';
    let navigationElement = document.createElement('img');
    navigationElement.className = 'navigation';
    navigationElement.src = './images/ic_fluent_navigation_24_regular.svg';

    let ulElement = document.createElement('ul');
    ulElement.className = 'navbar-itemList';
    ulElement.appendChild(createHyperlinkSidebar('menu.html', 'ic_fluent_home_48_regular.svg', 'menu'));
    ulElement.appendChild(createHyperlinkSidebar('personManagement.html', 'ic_fluent_person_standing_16_regular.svg', 'personManagement'));
    ulElement.appendChild(createHyperlinkSidebar('userManagement.html', 'ic_fluent_person_32_regular.svg', 'userManagement'));
    ulElement.appendChild(createHyperlinkSidebar('roleManagement.html', 'ic_fluent_person_accounts_24_regular.svg', 'roleManagement'));
    ulElement.appendChild(createHyperlinkSidebar('functionalityManagement.html', 'ic_fluent_people_toolbox_20_regular.svg', 'functionalityManagement'));
    ulElement.appendChild(createHyperlinkSidebar('actionManagement.html', 'ic_fluent_person_running_20_regular.svg', 'actionManagement'));
    ulElement.appendChild(createHyperlinkSidebar('rolAccFunManagement.html', 'ic_fluent_person_key_20_regular.svg', 'rolAccFunManagement'));

    navElement.appendChild(navigationElement);
    navElement.appendChild(ulElement);
    document.body.append(navElement);
    document.body.style.marginLeft = `${navElement.getBoundingClientRect().width}px`;

    
    document.getElementsByClassName('navigation')[0].addEventListener('click', ()=>{
        document.getElementsByClassName('navbar')[0].classList.toggle('close');
    });
}

function createHyperlinkSidebar(href, img, textID){
    let liElement = document.createElement('li');
    liElement.className = 'navbar-item';
    let aElement = document.createElement('a');
    aElement.href = `./${href}`;

    let imgElement = document.createElement('img');
    let imgSrc = `./images/${img}`;
    if (window.location.pathname.split("/").pop() === href){
        liElement.classList.add('current');
        imgSrc = imgSrc.replace('regular', 'filled');
    }
    imgElement.src = imgSrc;

    let spanElement = document.createElement('span');
    spanElement.translate = false;
    spanElement.dataset.textId = textID;
    
    liElement.appendChild(aElement);
    aElement.appendChild(imgElement);
    aElement.appendChild(spanElement);

    return liElement;
}

/* -- Used in Management pages -- */
// Common functions related to the table that shows the database info
function setParamsPerAction(action){
    // Flag to make fields read-only
    let readOnly = action === 'DELETE' || action === 'DETAILS';
    // Flag to not create the submit button.
    let noSubmit = action === 'DETAILS';
    let dontEditPK = action === 'EDIT';

    return {readOnly, noSubmit, dontEditPK};
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
    try {
        error.innerText = locale[errorCode];
    } catch (err) {
        console.error('Locale files did not arrive in time');
        console.error(err);
        error.innerText = errorCode;
    }
    

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

function addSuccessMessage(successCode) {
    document.getElementsByClassName('modal-content')[0].style.display = 'none';
    document.getElementById('error-messages').style.display = 'none';
    const successDiv = document.getElementById("success-messages");
    successDiv.style.display = "block";

    let success = document.createElement('p');
    try {
        success.innerText = locale[successCode];
    } catch (error) {
        console.error('Locale files did not arrive in time');
        console.error(error);
        success.innerText = successCode;
    }

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