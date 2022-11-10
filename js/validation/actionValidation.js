"use strict";

function checkFormAction(e, action) {
    if(checkActionId(action) & checkActionName(action) & checkActionDescription(action)){
        return true;
    } else {
        return false;
    }
}

function checkActionId(action) {
    const actionIdField = document.getElementById('actionId');
    const maxLength = 4;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(actionIdField)){
        addErrorMessage('error_actionId_empty', 'actionId');
        errorDetected = true;
    } else if (checkMaxLenght(actionIdField, maxLength)) {
        addErrorMessage('error_actionId_too_long', "actionId");
        errorDetected = true;
    } else if (checkRegex(actionIdField, "[^0-9]")) {
        addErrorMessage('error_actionId_invalid_characters', "actionId");
        errorDetected = true;
    }

    if(errorDetected){
        actionIdField.classList.add('error');
    } else {
        actionIdField.classList.remove('error');
        removeErrorMessage('actionId');
    }

    return !errorDetected;
}

function checkActionName(action) {
    const actionNameField = document.getElementById('actionName');
    const minLength = 6, maxLength = 48;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(actionNameField)){
        addErrorMessage('error_actionName_empty', "actionName");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(actionNameField, minLength)){
        addErrorMessage('error_actionName_too_short', "actionName");
        errorDetected = true;
    } else if (checkMaxLenght(actionNameField, maxLength)) {
        addErrorMessage('error_actionName_too_long', "actionName");
        errorDetected = true;
    } else if (checkRegex(actionNameField, "[^a-zA-Z]")) {
        addErrorMessage('error_actionName_invalid_characters', "actionName");
        errorDetected = true;
    }

    if(errorDetected){
        actionNameField.classList.add('error');
    } else {
        actionNameField.classList.remove('error');
        removeErrorMessage('actionName');
    }

    return !errorDetected;
}

function checkActionDescription(action) {
    const actionDescriptionField = document.getElementById('actionDescription');
    const minLength = 20, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(actionDescriptionField)){
        addErrorMessage('error_actionDescription_empty', "actionDescription");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(actionDescriptionField, minLength)){
        addErrorMessage('error_actionDescription_too_short', "actionDescription");
        errorDetected = true;
    } else if (checkMaxLenght(actionDescriptionField, maxLength)) {
        addErrorMessage('error_actionDescription_too_long', "actionDescription");
        errorDetected = true;
    } else if (checkRegex(actionDescriptionField, "[=<>$#{}[\\]]")) {
        addErrorMessage('error_actionDescription_invalid_characters', "actionDescription");
        errorDetected = true;
    }

    if(errorDetected){
        actionDescriptionField.classList.add('error');
    } else {
        actionDescriptionField.classList.remove('error');
        removeErrorMessage('actionDescription');
    }

    return !errorDetected;
}