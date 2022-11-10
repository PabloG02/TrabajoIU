let locale;
// Cannot populate management pages from here as this will create a race with the creation of the table.
populatePage(getCookie('lang'));
/* Race condition, createTableHeader executing after setting locale */

// When a language is clicked, change page to that language.
for(let lang of document.getElementById('languagesDiv').childNodes){
    lang.addEventListener('click', (e) => {
        let language = e.currentTarget.id;
        populatePage(language);
    })
}

// Functions declaration

/**
 * Loads the corresponding locale file and sets a cookie to remember the selection.
 */
async function getLocale(language = 'en_US'){
    locale = await fetch(`./locale/${language}.json`);
    locale = await locale.json();

    setCookie('lang', language);

    return locale;
}

/**
 * Changes displayed text to match the locale selected.
 */
async function populatePage(language){
    let locale = await getLocale(language);
    console.log(locale);

    let header = document.getElementsByTagName('h1')[0];
    console.log(`${header.id}`);
    header.textContent = locale[`${header.id}`];
    
    let buttons = ['add', 'search', 'edit', 'delete', 'details'];
    for(let buttonType of buttons){
        for(let button of document.querySelectorAll(`.${buttonType}`)){
            button.title = locale[`${buttonType}Title`];
        }
    }

    let ths = document.getElementsByTagName('th');
    console.log('Language ths  ' + ths.length);
    console.log(ths);
    for(let i = 0; i < ths.length; i++){
        // Do not delete roles from table's header in rolaccionfuncionalidad
        if(ths[i].id.includes('Th')){
            ths[i].textContent = locale[`${ths[i].id.replace('Th','')}`];
        }
        console.log(ths[i].textContent);
    }

    let labels = document.getElementsByTagName('label');
    console.log('Language labels  ' + ths.length);
    console.log(labels);
    for(let label of labels){
        console.log(label.htmlFor);
        label.innerText = locale[`${label.htmlFor}`];
    }

    let hyperlinks = document.querySelectorAll('.hyperlink .hyperlinkText');
    for(let hyperlink of hyperlinks){
        hyperlink.innerText = locale[`${hyperlink.id}`];
    }

    let signUp = document.getElementById('signUp');
    if (signUp != undefined)
        signUp.innerText = locale['signUp'];

    let forgotPassword = document.getElementById('forgotPassword');
    if (forgotPassword != undefined)
        forgotPassword.innerText = locale['forgotPassword'];

    let logIn = document.getElementById('submitButton');
    console.log(logIn != undefined && logIn.ariaLabel === 'logIn');
    if (logIn != undefined && logIn.ariaLabel === 'logIn')
        logIn.value = locale['logIn'];

    let changePassword = document.getElementById('submitButton');
    console.log(changePassword != undefined && changePassword.ariaLabel === 'changePassword');
    if (changePassword != undefined && changePassword.ariaLabel === 'changePassword')
        changePassword.value = locale['changePassword'];

    let errors = document.getElementById('error-messages')?.childNodes;
    for(let error of errors){
        error.innerText = locale[`${error.id}`];
    }
    
}