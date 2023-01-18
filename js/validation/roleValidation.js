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
        addErrorMessageNearField('error_roleId_empty', 'roleId');
        errorDetected = true;
    } else if (checkMaxLenght(roleIdField, maxLength)) {
        addErrorMessageNearField('error_roleId_too_long', "roleId");
        errorDetected = true;
    } else if (checkRegex(roleIdField, "[^0-9]")) {
        addErrorMessageNearField('error_roleId_invalid_characters', "roleId");
        errorDetected = true;
    }

    if(errorDetected){
        roleIdField.classList.remove('correct');
        roleIdField.classList.add('error');
    } else {
        roleIdField.classList.remove('error');
        roleIdField.classList.add('correct');
        removeErrorMessageNearField('roleId');
    }

    return !errorDetected;
}

function checkRoleName(action) {
    const roleNameField = document.getElementById('roleName');
    const minLength = 6, maxLength = 48;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(roleNameField)){
        addErrorMessageNearField('error_roleName_empty', "roleName");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(roleNameField, minLength)){
        addErrorMessageNearField('error_roleName_too_short', "roleName");
        errorDetected = true;
    } else if (checkMaxLenght(roleNameField, maxLength)) {
        addErrorMessageNearField('error_roleName_too_long', "roleName");
        errorDetected = true;
    } else if (checkRegex(roleNameField, "[^a-zA-Z]")) {
        addErrorMessageNearField('error_roleName_invalid_characters', "roleName");
        errorDetected = true;
    }

    if(errorDetected){
        roleNameField.classList.remove('correct');
        roleNameField.classList.add('error');
    } else {
        roleNameField.classList.remove('error');
        roleNameField.classList.add('correct');
        removeErrorMessageNearField('roleName');
    }

    return !errorDetected;
}

function checkRoleDescription(action) {
    const roleDescriptionField = document.getElementById('roleDescription');
    const minLength = 20, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(roleDescriptionField)){
        addErrorMessageNearField('error_roleDescription_empty', "roleDescription");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(roleDescriptionField, minLength)){
        addErrorMessageNearField('error_roleDescription_too_short', "roleDescription");
        errorDetected = true;
    } else if (checkMaxLenght(roleDescriptionField, maxLength)) {
        addErrorMessageNearField('error_roleDescription_too_long', "roleDescription");
        errorDetected = true;
    } else if (checkRegex(roleDescriptionField, "[=<>$#{}[\\]]")) {
        addErrorMessageNearField('error_roleDescription_invalid_characters', "roleDescription");
        errorDetected = true;
    }

    if(errorDetected){
        roleDescriptionField.classList.remove('correct');
        roleDescriptionField.classList.add('error');
    } else {
        roleDescriptionField.classList.remove('error');
        roleDescriptionField.classList.add('correct');
        removeErrorMessageNearField('roleDescription');
    }

    return !errorDetected;
}