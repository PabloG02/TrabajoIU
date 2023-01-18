function getCookie(cookieName){
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${cookieName}=`))
        ?.split('=')[1];

    return cookieValue;
}

function setCookie(cookieName, value){
    document.cookie = `${cookieName}=${value}`;
}

function deleteCookie(cookieName){
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}


function isUserAuthenticated(){
    if(getCookie('user') === undefined){
        window.location.replace('./login.html');
    }
}




function getFieldValue(element) {
    return element.value;
}


function removeErrorMessageNearField(errorType) {  
    const errorP = document.getElementById(`${errorType}Error`);
    errorP.innerHTML = "";
}

function removeErrorMessage(errorType) {  
    const errorDiv = document.getElementById("error-messages");
    let errorList = errorDiv.childNodes;
    let i = 0;
    let found = false;
    
    while (i < errorList.length && !found) {
        if (errorList[i].ariaLabel == errorType) {
            found = true;
            errorDiv.removeChild(errorList[i]);
        }
        i++;
    }
    
    // console.log(errorList.length);
    // console.log(errorDiv.childNodes.length);

    if(errorList.length == 0){
        errorDiv.style.display = "none";
    }
}

/**
 * @returns true if the regex is met.
 */
function checkRegex(element, regex) {
    const fieldValue = getFieldValue(element);
    console.log(RegExp(regex));
    return RegExp(regex).test(fieldValue);
}

function isEmpty(element) {
    const fieldValue = getFieldValue(element);
    return fieldValue.length === 0;
}

function checkMinLenght(element, minLength) {
    const fieldValue = getFieldValue(element);
    // console.log(fieldValue.length < minLength);
    return fieldValue.length < minLength;
}

function checkMaxLenght(element, maxLength) {
    const fieldValue = getFieldValue(element);
    return fieldValue.length > maxLength;
}

function checkDNILetter(element) {
    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const fieldValue = getFieldValue(element);

    let num = parseInt(fieldValue.substring(0, 8));
    // console.log(num);
    return fieldValue.charAt(8).toUpperCase() === letters.charAt(num % 23);
}