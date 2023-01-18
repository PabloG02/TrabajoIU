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
        addErrorMessageNearField('error_actionId_empty', 'actionId');
        errorDetected = true;
    } else if (checkMaxLenght(actionIdField, maxLength)) {
        addErrorMessageNearField('error_actionId_too_long', "actionId");
        errorDetected = true;
    } else if (checkRegex(actionIdField, "[^0-9]")) {
        addErrorMessageNearField('error_actionId_invalid_characters', "actionId");
        errorDetected = true;
    }

    if(errorDetected){
        actionIdField.classList.remove('correct');
        actionIdField.classList.add('error');
    } else {
        actionIdField.classList.remove('error');
        actionIdField.classList.add('correct');
        removeErrorMessageNearField('actionId');
    }

    return !errorDetected;
}

function checkActionName(action) {
    const actionNameField = document.getElementById('actionName');
    const minLength = 6, maxLength = 48;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(actionNameField)){
        addErrorMessageNearField('error_actionName_empty', "actionName");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(actionNameField, minLength)){
        addErrorMessageNearField('error_actionName_too_short', "actionName");
        errorDetected = true;
    } else if (checkMaxLenght(actionNameField, maxLength)) {
        addErrorMessageNearField('error_actionName_too_long', "actionName");
        errorDetected = true;
    } else if (checkRegex(actionNameField, "[^a-zA-Z]")) {
        addErrorMessageNearField('error_actionName_invalid_characters', "actionName");
        errorDetected = true;
    }

    if(errorDetected){
        actionNameField.classList.remove('correct');
        actionNameField.classList.add('error');
    } else {
        actionNameField.classList.remove('error');
        actionNameField.classList.add('correct');
        removeErrorMessageNearField('actionName');
    }

    return !errorDetected;
}

function checkActionDescription(action) {
    const actionDescriptionField = document.getElementById('actionDescription');
    const minLength = 20, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(actionDescriptionField)){
        addErrorMessageNearField('error_actionDescription_empty', "actionDescription");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(actionDescriptionField, minLength)){
        addErrorMessageNearField('error_actionDescription_too_short', "actionDescription");
        errorDetected = true;
    } else if (checkMaxLenght(actionDescriptionField, maxLength)) {
        addErrorMessageNearField('error_actionDescription_too_long', "actionDescription");
        errorDetected = true;
    } else if (checkRegex(actionDescriptionField, "[=<>$#{}[\\]]")) {
        addErrorMessageNearField('error_actionDescription_invalid_characters', "actionDescription");
        errorDetected = true;
    }

    if(errorDetected){
        actionDescriptionField.classList.remove('correct');
        actionDescriptionField.classList.add('error');
    } else {
        actionDescriptionField.classList.remove('error');
        actionDescriptionField.classList.add('correct');
        removeErrorMessageNearField('actionDescription');
    }

    return !errorDetected;
}