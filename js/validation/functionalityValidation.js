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
        addErrorMessageNearField('error_functionalityId_empty', 'functionalityId');
        errorDetected = true;
    } else if (checkMaxLenght(functionalityIdField, maxLength)) {
        addErrorMessageNearField('error_functionalityId_too_long', "functionalityId");
        errorDetected = true;
    } else if (checkRegex(functionalityIdField, "[^0-9]")) {
        addErrorMessageNearField('error_functionalityId_invalid_characters', "functionalityId");
        errorDetected = true;
    }

    if(errorDetected){
        functionalityIdField.classList.remove('correct');
        functionalityIdField.classList.add('error');
    } else {
        functionalityIdField.classList.remove('error');
        functionalityIdField.classList.add('correct');
        removeErrorMessageNearField('functionalityId');
    }

    return !errorDetected;
}

function checkFunctionalityName(action) {
    const functionalityNameField = document.getElementById('functionalityName');
    const minLength = 6, maxLength = 48;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(functionalityNameField)){
        addErrorMessageNearField('error_functionalityName_empty', "functionalityName");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(functionalityNameField, minLength)){
        addErrorMessageNearField('error_functionalityName_too_short', "functionalityName");
        errorDetected = true;
    } else if (checkMaxLenght(functionalityNameField, maxLength)) {
        addErrorMessageNearField('error_functionalityName_too_long', "functionalityName");
        errorDetected = true;
    } else if (checkRegex(functionalityNameField, "[^a-zA-Z]")) {
        addErrorMessageNearField('error_functionalityName_invalid_characters', "functionalityName");
        errorDetected = true;
    }

    if(errorDetected){
        functionalityNameField.classList.remove('correct');
        functionalityNameField.classList.add('error');
    } else {
        functionalityNameField.classList.remove('error');
        functionalityNameField.classList.add('correct');
        removeErrorMessageNearField('functionalityName');
    }

    return !errorDetected;
}

function checkFunctionalityDescription(action) {
    const functionalityDescriptionField = document.getElementById('functionalityDescription');
    const minLength = 20, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(functionalityDescriptionField)){
        addErrorMessageNearField('error_functionalityDescription_empty', "functionalityDescription");
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(functionalityDescriptionField, minLength)){
        addErrorMessageNearField('error_functionalityDescription_too_short', "functionalityDescription");
        errorDetected = true;
    } else if (checkMaxLenght(functionalityDescriptionField, maxLength)) {
        addErrorMessageNearField('error_functionalityDescription_too_long', "functionalityDescription");
        errorDetected = true;
    } else if (checkRegex(functionalityDescriptionField, "[=<>$#{}[\\]]")) {
        addErrorMessageNearField('error_functionalityDescription_invalid_characters', "functionalityDescription");
        errorDetected = true;
    }

    if(errorDetected){
        functionalityDescriptionField.classList.remove('correct');
        functionalityDescriptionField.classList.add('error');
    } else {
        functionalityDescriptionField.classList.remove('error');
        functionalityDescriptionField.classList.add('correct');
        removeErrorMessageNearField('functionalityDescription');
    }

    return !errorDetected;
}