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

    // TODO: refactor
    let ths = document.getElementsByTagName('th');
    for(let i = 0; i < ths.length; i++){
        // Do not delete roles from table's header in rolaccionfuncionalidad
        if(ths[i].id.includes('Th')){
            ths[i].textContent = locale[`${ths[i].id.replace('Th','')}`];
        }
        console.log(ths[i].textContent);
    }

    let errors = document.getElementById('error-messages')?.childNodes;
    if (errors != undefined){
        for(let error of errors){
            error.innerText = locale[`${error.id}`];
        }
    }

    let ps = document.getElementsByTagName('p');
    for(let p of ps){
        if(p.dataset.textId != undefined && p.dataset.textId != '')
            p.innerText = locale[`${p.dataset.textId}`];
    }

    // Refactored :)
    let title = document.getElementsByTagName('title')[0];
    title.textContent = locale[`${title.id.replace('title', 'header')}`];

    let header = document.getElementsByTagName('h1')[0];
    header.textContent = locale[`${header.id}`];

    let divs = document.getElementsByTagName('div');
    for(let div of divs){
        if(div.translate == false)
            div.innerText = locale[`${div.dataset.textId}`];
    }

    let spans = document.getElementsByTagName('span');
    for(let span of spans){
        if(span.translate == false)
            span.innerText = locale[`${span.dataset.textId}`];
    }

    let imgs = document.getElementsByTagName('img');
    for(let img of imgs){
        if(img.translate == false)
            img.title = locale[`${img.dataset.textId}`];
    }

    let as = document.getElementsByTagName('a');
    for(let a of as){
        if(a.translate == false)
            a.innerText = locale[`${a.dataset.textId}`];
    }

    let labels = document.getElementsByTagName('label');
    for(let label of labels){
        label.innerText = locale[`${label.htmlFor}`];
    }

    // Not completely refactored
    let inputs = document.getElementsByTagName('input');
    for(let input of inputs){
        if(input.type == 'submit' && input.translate == false){
            input.value = locale[`${input.dataset.textId}`];
        } else if(['text','password','tel','email'].includes(input.type)){
            if(locale[input.id+'Placeholder'] !== undefined)
                input.placeholder = locale[input.id+'Placeholder'];
        }
    }
}