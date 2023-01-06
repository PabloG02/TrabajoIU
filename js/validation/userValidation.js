"use strict";
/** Depends on personValidation.json */
function checkFormUserManagement(e, action) {
    if(checkDNI(action) & checkUsername(action) & checkRoleId(action)){
        return true;
    } else {
        return false;
    }
}

function checkUsername(action) {
    const userField = document.getElementById('username');
    const minLength = 3, maxLength = 45;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(userField)){
        addErrorMessage('error_username_empty', 'usuario');
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(userField, minLength)){
        addErrorMessage('error_username_too_short', "usuario");
        errorDetected = true;
    } else if (checkMaxLenght(userField, maxLength)) {
        addErrorMessage('error_username_too_long', "usuario");
        errorDetected = true;
    } else if (checkRegex(userField, "[^a-zA-Z0-9]")) {
        addErrorMessage('error_username_invalid_characters', "usuario");
        errorDetected = true;
    }

    if(errorDetected){
        userField.classList.add('error');
    } else {
        userField.classList.remove('error');
        removeErrorMessage('usuario');
    }

    return !errorDetected;
}

function checkPassword(action) {
    const passwordField = document.getElementById('password');
    const minLength = 3, maxLength = 45;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(passwordField)){
        addErrorMessage('error_password_empty', "password");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(passwordField, minLength)){
        addErrorMessage('error_password_too_short', "password");
        errorDetected = true;
    } else if (checkMaxLenght(passwordField, maxLength)) {
        addErrorMessage('error_password_too_long', "password");
        errorDetected = true;
    } else if (checkRegex(passwordField, "[^a-zA-Z0-9\\-_]")) {
        addErrorMessage('error_password_invalid_characters', "password");
        errorDetected = true;
    }

    if(errorDetected){
        passwordField.classList.add('error');
    } else {
        passwordField.classList.remove('error');
        removeErrorMessage('password');
    }

    return !errorDetected;
}

function checkPasswordCustom(fieldId, action) {
    const passwordField = document.getElementById(fieldId);
    const minLength = 3, maxLength = 45;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(passwordField)){
        addErrorMessage('error_password_empty', "password");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(passwordField, minLength)){
        addErrorMessage('error_password_too_short', "password");
        errorDetected = true;
    } else if (checkMaxLenght(passwordField, maxLength)) {
        addErrorMessage('error_password_too_long', "password");
        errorDetected = true;
    } else if (checkRegex(passwordField, "[^a-zA-Z0-9\\-_]")) {
        addErrorMessage('error_password_invalid_characters', "password");
        errorDetected = true;
    }

    if(errorDetected){
        passwordField.classList.add('error');
    } else {
        passwordField.classList.remove('error');
        removeErrorMessage('password');
    }

    return !errorDetected;
}