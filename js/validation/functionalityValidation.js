"use strict";

function checkFormFunctionality(e, action) {
    if(checkFunctionalityId(action) & checkFunctionalityName(action) & checkFunctionalityDescription(action)){
        return true;
    } else {
        return false;
    }
}

function checkFunctionalityId(action) {
    const functionalityIdField = document.getElementById('functionalityId');
    const maxLength = 4;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(functionalityIdField)){
        addErrorMessage('error_functionalityId_empty', 'functionalityId');
        errorDetected = true;
    } else if (checkMaxLenght(functionalityIdField, maxLength)) {
        addErrorMessage('error_functionalityId_too_long', "functionalityId");
        errorDetected = true;
    } else if (checkRegex(functionalityIdField, "[^0-9]")) {
        addErrorMessage('error_functionalityId_invalid_characters', "functionalityId");
        errorDetected = true;
    }

    if(errorDetected){
        functionalityIdField.classList.add('error');
    } else {
        functionalityIdField.classList.remove('error');
        removeErrorMessage('functionalityId');
    }

    return !errorDetected;
}

function checkFunctionalityName(action) {
    const functionalityNameField = document.getElementById('functionalityName');
    const minLength = 6, maxLength = 48;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(functionalityNameField)){
        addErrorMessage('error_functionalityName_empty', "functionalityName");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(functionalityNameField, minLength)){
        addErrorMessage('error_functionalityName_too_short', "functionalityName");
        errorDetected = true;
    } else if (checkMaxLenght(functionalityNameField, maxLength)) {
        addErrorMessage('error_functionalityName_too_long', "functionalityName");
        errorDetected = true;
    } else if (checkRegex(functionalityNameField, "[^a-zA-Z]")) {
        addErrorMessage('error_functionalityName_invalid_characters', "functionalityName");
        errorDetected = true;
    }

    if(errorDetected){
        functionalityNameField.classList.add('error');
    } else {
        functionalityNameField.classList.remove('error');
        removeErrorMessage('functionalityName');
    }

    return !errorDetected;
}

function checkFunctionalityDescription(action) {
    const functionalityDescriptionField = document.getElementById('functionalityDescription');
    const minLength = 20, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(functionalityDescriptionField)){
        addErrorMessage('error_functionalityDescription_empty', "functionalityDescription");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(functionalityDescriptionField, minLength)){
        addErrorMessage('error_functionalityDescription_too_short', "functionalityDescription");
        errorDetected = true;
    } else if (checkMaxLenght(functionalityDescriptionField, maxLength)) {
        addErrorMessage('error_functionalityDescription_too_long', "functionalityDescription");
        errorDetected = true;
    } else if (checkRegex(functionalityDescriptionField, "[=<>$#{}[\\]]")) {
        addErrorMessage('error_functionalityDescription_invalid_characters', "functionalityDescription");
        errorDetected = true;
    }

    if(errorDetected){
        functionalityDescriptionField.classList.add('error');
    } else {
        functionalityDescriptionField.classList.remove('error');
        removeErrorMessage('functionalityDescription');
    }

    return !errorDetected;
}