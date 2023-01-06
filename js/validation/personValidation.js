"use strict";

function setMaxDate(birthDateField) {
    let today = new Date();
    birthDateField.setAttribute("max", today.toISOString().substring(0, 10));
}

function checkFormPerson(e, action) {
    if(checkDNI(action) & checkName(action) & checkSurname(action) & checkBirthDate(action) & checkAddress(action) & checkEmail(action) & checkPhone(action) & checkPhoto(action)){
        return true;
    } else {
        return false;
    }
}

function checkDNI(action) {
    const dniField = document.getElementById("dni");
    const minLength = 9, maxLength = 9;
    let errorDetected = false;
    console.log(action);
    switch(action){
        case 'SEARCH':
            console.log('hola search');
            if (checkMaxLenght(dniField, maxLength)) {
                addErrorMessage('error_dni_too_long', "dni");
                errorDetected = true;
            } else if (checkRegex(dniField, "[^0-9a-zA-Z]")){
                addErrorMessage('error_dni_invalid_characters', "dni");
                errorDetected = true;
            } else if (checkRegex(dniField, "[0-9]{9}")) {
                addErrorMessage('error_dni_invalid_structure', "dni");
                errorDetected = true;
            } else if (checkRegex(dniField, "[a-zA-Z].*[a-zA-Z]")) {
                // 2 or more letters
                addErrorMessage('error_dni_invalid_structure', "dni");
                errorDetected = true;
            } else if (checkRegex(dniField, "[a-zA-Z][0-9]")) {
                // letter not in last position
                addErrorMessage('error_dni_invalid_structure', "dni");
                errorDetected = true;
            }else if (dniField.value.length === 9 && !checkDNILetter(dniField)) {
                addErrorMessage('error_dni_letter_does_not_match', "dni");
                errorDetected = true;
            }
            break;
        default:
            console.log('hola resto');
            if(isEmpty(dniField)){
                addErrorMessage('error_dni_empty', "dni");
                errorDetected = true;
            } else if (checkMinLenght(dniField, minLength)) {
                addErrorMessage('error_dni_too_short', "dni");
                errorDetected = true;
            } else if (checkMaxLenght(dniField, maxLength)) {
                addErrorMessage('error_dni_too_long', "dni");
                errorDetected = true;
            } else if (checkRegex(dniField, "[^0-9a-zA-Z]")){
                addErrorMessage('error_dni_invalid_characters', "dni");
                errorDetected = true;
            } else if (!checkRegex(dniField, "[0-9]{8}[a-zA-Z]")) {
                addErrorMessage('error_dni_invalid_structure', "dni");
                errorDetected = true;
            } else if (!checkDNILetter(dniField)) {
                addErrorMessage('error_dni_letter_does_not_match', "dni");
                errorDetected = true;
            }
            break;
    }

    if(errorDetected){
        dniField.classList.remove('correct');
        dniField.classList.add('error');
    } else {
        dniField.classList.remove('error');
        dniField.classList.add('correct');
        removeErrorMessage('dni');
    }

    return !errorDetected;
}

function checkName(action) {
    const nameField = document.getElementById("name");
    const minLength = 3, maxLength = 45;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(nameField)){
        addErrorMessage('error_name_empty', 'name');
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(nameField, minLength)){
        addErrorMessage('error_name_too_short', "name");
        errorDetected = true;
    } else if (checkMaxLenght(nameField, maxLength)) {
        addErrorMessage('error_name_too_long', "name");
        errorDetected = true;
    } else if (checkRegex(nameField, "[^a-zA-Záéíóú\\- ]")) {
        addErrorMessage('error_name_invalid_characters', "name");
        errorDetected = true;
    }

    if(errorDetected){
        nameField.classList.remove('correct');
        nameField.classList.add('error');
    } else {
        nameField.classList.remove('error');
        nameField.classList.add('correct');
        removeErrorMessage('name');
    }

    return !errorDetected;
}

function checkSurname(action) {
    const surnameField = document.getElementById("surname");
    const minLength = 5, maxLength = 100;
    let errorDetected = false;
    
    if(action != 'SEARCH' && isEmpty(surnameField)){
        addErrorMessage('error_surname_empty', 'surname');
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(surnameField, minLength)){
        addErrorMessage('error_surname_too_short', "surname");
        errorDetected = true;
    } else if (checkMaxLenght(surnameField, maxLength)) {
        addErrorMessage('error_surname_too_long', "surname");
        errorDetected = true;
    } else if (checkRegex(surnameField, '[^a-zA-Záéíóú\\- ]')){
        addErrorMessage('error_surname_invalid_characters', "surname");
        errorDetected = true;
    }

    if(errorDetected){
        surnameField.classList.remove('correct');
        surnameField.classList.add('error');
    } else {
        surnameField.classList.remove('error');
        surnameField.classList.add('correct');
        removeErrorMessage('surname');
    }

    return !errorDetected;
}

function checkBirthDate(action){
    const birthDateField = document.getElementById("birthDate");
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(birthDateField)){
        addErrorMessage('error_birthDate_empty', 'birthDate');
        errorDetected = true;
    } else if (new Date(document.getElementById('birthDate').value) > new Date()){
        addErrorMessage('error_birthDate_future', 'birthDate');
        errorDetected = true;
    }

    if(errorDetected){
        birthDateField.classList.remove('correct');
        birthDateField.classList.add('error');
    } else {
        birthDateField.classList.remove('error');
        birthDateField.classList.add('correct');
        removeErrorMessage('birthDate');
    }

    return !errorDetected;
}

function checkAddress(action){
    const addressField = document.getElementById("address");
    const minLength = 10, maxLength = 200;
    let errorDetected = false;

    if(action != 'SEARCH' && isEmpty(addressField)){
        addErrorMessage('error_address_empty', 'address');
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(addressField, minLength)){
        addErrorMessage('error_address_too_short', "address");
        errorDetected = true;
    } else if (checkMaxLenght(addressField, maxLength)) {
        addErrorMessage('error_address_too_long', "address");
        errorDetected = true;
    } else if (checkRegex(addressField, '[^a-zA-Záéíóú0-9 /\\-ºª,]')){
        addErrorMessage('error_address_invalid_characters', "address");
        errorDetected = true;
    }

    if(errorDetected){
        addressField.classList.remove('correct');
        addressField.classList.add('error');
    } else {
        addressField.classList.remove('error');
        addressField.classList.add('correct');
        removeErrorMessage('address');
    }

    return !errorDetected;
}

function checkEmail(action) {
    const emailField = document.getElementById("email");
    emailField.value = emailField.value.toLowerCase();
    const minLength = 8, maxLength = 45;
    let errorDetected = false;
    // RFC 2822
    let mailFormat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if(action != 'SEARCH' && isEmpty(emailField)){
        addErrorMessage('error_email_empty', 'email');
        errorDetected = true;
    } else if(action != 'SEARCH' && checkMinLenght(emailField, minLength)){
        addErrorMessage('error_email_too_short', "email");
        errorDetected = true;
    } else if (checkMaxLenght(emailField, maxLength)) {
        addErrorMessage('error_email_too_long', "email");
        errorDetected = true;
    } else if (action != 'SEARCH' && !checkRegex(emailField, mailFormat)) {
        addErrorMessage('error_email_invalid_characters', "email");
        errorDetected = true;
    } else if (action == 'SEARCH' && checkRegex(emailField, /[^a-z0-9@#$%&'*+/=?^_`{|}\.-]/)) {
        addErrorMessage('error_email_invalid_characters', "email");
        errorDetected = true;
    }
    
    if(errorDetected){
        emailField.classList.remove('correct');
        emailField.classList.add('error');
    } else {
        emailField.classList.remove('error');
        emailField.classList.add('correct');
        removeErrorMessage('email');
    }

    return !errorDetected;
}

function checkPhone(action) {
    const phoneField = document.getElementById("phone");
    const minLength = 9, maxLength = 9;
    let errorDetected = false;

    if (action != 'SEARCH' && checkMinLenght(phoneField, minLength)) {
        addErrorMessage('error_phone_too_short', "phone");
        errorDetected = true;
    } else if (checkMaxLenght(phoneField, maxLength)) {
        addErrorMessage('error_phone_too_long', "phone");
        errorDetected = true;
    } else if (checkRegex(phoneField, "[^0-9]")) {
        addErrorMessage('error_phone_invalid_characters', "phone");
        errorDetected = true;
    }
    
    if(errorDetected){
        phoneField.classList.remove('correct');
        phoneField.classList.add('error');
    } else {
        phoneField.classList.remove('error');
        phoneField.classList.add('correct');
        removeErrorMessage('phone');
    }

    return !errorDetected;
}

function checkPhoto(action) {
    const photoField = document.getElementById("photo");
    const minLength = 6, maxLength = 40;
    let errorDetected = false;
    
    console.log(photoField.type + ' Valor: ' + photoField.name);
    if(!isEmpty(photoField)){
        switch(photoField.type){
            case 'file':
                let photo = photoField.files[0];
                if (photo.name.length < minLength) {
                    addErrorMessage('error_photo_too_short', "photo");
                    errorDetected = true;
                } else if (photo.name.length > maxLength) {
                    addErrorMessage('error_photo_too_long', "photo");
                    errorDetected = true;
                } else if (/[^\.a-zA-Z]/.test(photo.name)) {
                    addErrorMessage('error_photo_invalid_characters', "photo");
                    errorDetected = true;
                } else if (!(/\.png$/.test(photo.name)) && !(/\.jpg$/.test(photo.name))) {
                    addErrorMessage('error_photo_invalid_extension', "photo");
                    errorDetected = true;
                } else {
                    showPreview("photo-container", photo);
                }
                break;
            case 'text':
                if (action != 'SEARCH' && checkMinLenght(photoField, minLength)) {
                    addErrorMessage('error_photo_too_short', "photo");
                    errorDetected = true;
                } else if (checkMaxLenght(photoField, maxLength)) {
                    addErrorMessage('error_photo_too_long', "photo");
                    errorDetected = true;
                } else if (checkRegex(photoField, "[^\\.a-zA-Z]")){
                    addErrorMessage('error_photo_invalid_characters', "photo");
                    errorDetected = true;
                } else if (action != 'SEARCH' && !checkRegex(photoField, "\\.png$") && !checkRegex(photoField, "\\.jpg$")){
                    addErrorMessage('error_photo_invalid_extension', "photo");
                    errorDetected = true;
                }
                break;
        }
        
    } 
    
    if(errorDetected){
        photoField.classList.remove('correct');
        photoField.classList.add('error');
    } else {
        photoField.classList.remove('error');
        photoField.classList.add('correct');
        removeErrorMessage('photo');
    }

    return !errorDetected;
}