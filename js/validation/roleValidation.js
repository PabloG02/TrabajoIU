"use strict";

function checkFormRole(e, action) {
    if(checkRoleId(action) & checkRoleName(action) & checkRoleDescription(action)){
        return true;
    } else {
        return false;
    }
}

function checkRoleId(action) {
    const roleIdField = document.getElementById('roleId');
    const maxLength = 4;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(roleIdField)){
        addErrorMessage('error_roleId_empty', 'roleId');
        errorDetected = true;
    } else if (checkMaxLenght(roleIdField, maxLength)) {
        addErrorMessage('error_roleId_too_long', "roleId");
        errorDetected = true;
    } else if (checkRegex(roleIdField, "[^0-9]")) {
        addErrorMessage('error_roleId_invalid_characters', "roleId");
        errorDetected = true;
    }

    if(errorDetected){
        roleIdField.classList.add('error');
    } else {
        roleIdField.classList.remove('error');
        removeErrorMessage('roleId');
    }

    return !errorDetected;
}

function checkRoleName(action) {
    const roleNameField = document.getElementById('roleName');
    const minLength = 6, maxLength = 48;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(roleNameField)){
        addErrorMessage('error_roleName_empty', "roleName");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(roleNameField, minLength)){
        addErrorMessage('error_roleName_too_short', "roleName");
        errorDetected = true;
    } else if (checkMaxLenght(roleNameField, maxLength)) {
        addErrorMessage('error_roleName_too_long', "roleName");
        errorDetected = true;
    } else if (checkRegex(roleNameField, "[^a-zA-Z]")) {
        addErrorMessage('error_roleName_invalid_characters', "roleName");
        errorDetected = true;
    }

    if(errorDetected){
        roleNameField.classList.add('error');
    } else {
        roleNameField.classList.remove('error');
        removeErrorMessage('roleName');
    }

    return !errorDetected;
}

function checkRoleDescription(action) {
    const roleDescriptionField = document.getElementById('roleDescription');
    const minLength = 20, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(roleDescriptionField)){
        addErrorMessage('error_roleDescription_empty', "roleDescription");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(roleDescriptionField, minLength)){
        addErrorMessage('error_roleDescription_too_short', "roleDescription");
        errorDetected = true;
    } else if (checkMaxLenght(roleDescriptionField, maxLength)) {
        addErrorMessage('error_roleDescription_too_long', "roleDescription");
        errorDetected = true;
    } else if (checkRegex(roleDescriptionField, "[=<>$#{}[\\]]")) {
        addErrorMessage('error_roleDescription_invalid_characters', "roleDescription");
        errorDetected = true;
    }

    if(errorDetected){
        roleDescriptionField.classList.add('error');
    } else {
        roleDescriptionField.classList.remove('error');
        removeErrorMessage('roleDescription');
    }

    return !errorDetected;
}