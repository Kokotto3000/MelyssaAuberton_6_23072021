//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
// importe les globals
import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_MEDIAS, PHOTOGRAPHER_LIKES, FORM, LIGHTBOX } from './js/globals';
// importe les classes
import { Photographer } from './js/Photographer';
import { Medias } from './js/Medias';
import { Contact } from './js/Contact';
import { Lightbox } from './js/Lightbox';

//CONSTANTES ET VARIABLES
const photographersData= FishEyeData.photographers;
const mediasData= FishEyeData.media;

//création d'un tableau pour la création de la barre de nav
const tags= ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
const NAV= document.querySelector('.accueil-header__nav');
const navList= document.createElement('ul');

// récupérère les infos de l'url
const urlParams= window.location.search;
const params= new URLSearchParams(urlParams);

// DROPDOWN
const DROPDOWN= document.querySelector('.photographer-medias__filter-dropdown');
let BUTTON= document.querySelector('.photographer-medias__filter-dropdown-button--original');
const dropdownElements= ["popularité", "date", "titre"];

let disabledLikes= false;
let isValidFirst= false;
let isValidLast= false;
let isValidMail= false;

let sliderArray= [];

let likes= 0;

if(NAV){
    NAV.appendChild(navList);
    tags.forEach(tag=> {
        const newTag= document.createElement('li');
        newTag.innerHTML=`<a class="tag" href="?id=${tag}" role="link" aria-label="tri des photographes par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a>`;
        navList.appendChild(newTag);
    });
}

// fonction de filtre des boutons tags
// génère les cartes des photographes
function init(){
    let filter;
    for(let p of params){
        if(p){
            filter= p[1];
            console.log(filter);
        }
    }
    console.log(filter);
    if(filter){
        const filteredPhotographers= photographersData.filter(photographer => photographer.tags.includes(filter));
        // console.log(filteredPhotographers);        
        filteredPhotographers.forEach(photographer =>{            
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
        });
    }else{
        // console.log(photographersData);
        photographersData.forEach(photographer =>{
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
        });
        





        
    } 
    /*// création de l'évènement sur les boutons tag
    const TAG_FILTERS= document.querySelectorAll('.tag');
    // console.log(TAG_FILTERS);
    TAG_FILTERS.forEach(tagFilter => {    
        tagFilter.addEventListener("click", (e)=> {
            e.preventDefault();
            // console.log(tagFilter.target);
            PHOTOGRAPHERS_SECTION.innerHTML="";
            init(tagFilter.target);
        });
    });*/
}

if(PHOTOGRAPHERS_SECTION) init();

// fonction pour l'affichage de la présentation sur la page photographe
function displayPhotographerPresentation(){
    // console.log(window.location);
    // console.log(window.location.search);
    // const urlParams= window.location.search;
    // const params= new URLSearchParams(urlParams);

    for (let p of params) {
        // console.log(p[1]);
        photographersData.forEach(photographer => {
            // console.log(photographer.id)
            if(photographer.id == p[1]){
                const photographerPresentation = new Photographer(photographer);
                photographerPresentation.updatePhotographerPresentation();
                

                if(PHOTOGRAPHER_MEDIAS){
                    updatePhotographerMedias(photographer.id);
                } 

                if(FORM){
                    const contact= new Contact();
                    // DOM Elements, toutes les recherches qui ne concerne que la page photographer à ne mettre que quand la page photographer est ouverte !!!
                    const modalbg = document.querySelector(".photographer-modal");
                    const modalBtn = document.querySelector(".contact-button");
                    const modalCloseBtn = document.querySelector(".close");                    
                    const SUCCESS= document.getElementById("success-message");
                    const modalTitle= document.querySelector(".photographer-modal__content-title span");
                    const MAIN_WRAPPER= document.getElementById('photographer-page');
                    modalTitle.innerText= photographer.name;
                    
                    // modal events
                    modalBtn.addEventListener("click", ()=> {
                        modalbg.style.display = "block";
                        MAIN_WRAPPER.setAttribute("aria-hidden", "true");
                        MAIN_WRAPPER.style.overflow= "hidden";
                        modalbg.setAttribute("aria-hidden", "false");
                        modalCloseBtn.focus();
                    });
                    modalCloseBtn.addEventListener("click", ()=> {
                        modalbg.style.display = "none";
                        MAIN_WRAPPER.setAttribute("aria-hidden", "false");
                        MAIN_WRAPPER.style.overflow= "scroll";
                        modalbg.setAttribute("aria-hidden", "true");
                        contact.resetForm();
                        isValidFirst= isValidLast= isValidMail= false;
                        modalBtn.focus();
                    });
                    FORM.addEventListener("submit", e => {
                        e.preventDefault();
                        contact.stringValidation("first") ? isValidFirst= true : false;
                        contact.stringValidation("last") ? isValidLast= true : false;
                        contact.emailValidation() ? isValidMail= true : false;
                        if(isValidFirst && isValidLast && isValidMail) {
                            console.log("Message pour : " + photographer.name + "\nPrénom : " + contact.getInputs('first').value + "\nNom : " + contact.getInputs('last').value + "\nEmail : " + contact.getInputs('email').value + "\nMessage : " + contact.getInputs('message').value);                            
                            contact.resetForm();
                            isValidFirst= isValidLast= isValidMail= false; 
                            SUCCESS.innerText= "Message bien envoyé !";                           
                        }
                        else SUCCESS.innerText= "Vérifiez les champs du formulaire.";
                    });
                }
            }
        });
    }
}

if(PHOTOGRAPHER_PRESENTATION) displayPhotographerPresentation();

function updatePhotographerMedias(id, filter){
    // console.log(sliderArray);
    sliderArray= [];
    likes= 0;    
    // console.log(id + " " + filter);
    const filteredMedias= mediasData.filter(media => media.photographerId == id);
    // console.log(filteredMedias);  
    filteredMedias.forEach(media =>{            
        const mediaCard = new Medias(media);
        mediaCard.displayPhotographerMedias(id, filter);

        if(filter){
            if(media.tags[0] === filter) sliderArray.push(mediaCard);   
        }else sliderArray.push(mediaCard);

        // FOOTER
        if(!disabledLikes){
            likes += mediaCard.likes;
            PHOTOGRAPHER_LIKES.innerText= likes;
        }
        
    });

    /*
    // création de l'évènement sur les boutons tag pour les medias
    const TAG_FILTERS= document.querySelectorAll('.tag');
    // console.log(TAG_FILTERS);
    TAG_FILTERS.forEach(tagFilter => {    
        tagFilter.addEventListener("click", (e)=> {
            //e.preventDefault();
            // console.log(tagFilter.target);
            //PHOTOGRAPHER_MEDIAS.innerHTML="";
            //updatePhotographerMedias(id, tagFilter.target);
        });
    });
    */

    // LIKES event
    const LIKE_BUTTONS= document.querySelectorAll('.like-button');
    LIKE_BUTTONS.forEach(button=> {
        let isCliquable= true;
        button.addEventListener('click', ()=> {
            if(isCliquable){
                const LIKES= button.querySelector('span');
                LIKES.innerText++;
                PHOTOGRAPHER_LIKES.innerText++;
                isCliquable= false;
            }
        });
    });

    disabledLikes= true;

    //LIGHTBOX
    
    const MEDIAS= document.querySelectorAll('.photographer-media');
    // const LIGHTBOX= document.getElementById('lightbox');
    // console.log(sliderArray);
    MEDIAS.forEach(media => media.addEventListener('click', ()=> {
        // console.log(media);
        const sliderIndex= sliderArray.map(sliderId => sliderId.id).indexOf(Number(media.id));
        // console.log(sliderIndex);
        LIGHTBOX.style.display= 'block';
        // console.log(sliderIds.indexOf(Number(media.id)));
        const lightbox= new Lightbox(sliderArray);
        lightbox.displayLightbox(sliderIndex);
    }));
}

//DROPDOWN


if(BUTTON) BUTTON.addEventListener('click', openDropdown);

function openDropdown(e){
    DROPDOWN.innerHTML= `<ul id="exp_elem_list" arialabelledby="exp_elem" aria-activedescendant= "exp_elem_${e.target.textContent}" role="listbox" aria-expended="true">` + dropdownElements.map(element => `<li role="option" id="exp_elem_${element}" tabindex= "0" class="button photographer-medias__filter-dropdown-button">${element}</li>`).join('') + `</ul>`;
    const DROPDOWN_BUTTONS= document.querySelectorAll('.photographer-medias__filter-dropdown-button');
    DROPDOWN_BUTTONS.forEach(button=> {
        button.addEventListener('click', filterDropdown);
        button.addEventListener('keydown', e => {
            if(e.code === "Enter") filterDropdown(e);
        });
    })
    document.addEventListener("keydown", e=> {
        if(e.code === "Escape") closeDropdown(BUTTON.textContent);
    });
}

function filterDropdown(e){
    switch(e.target.textContent) {
        case "popularité" :
            // const POPULARITE= document.getElementById('exp_elem_popularité').setAttribute("aria-selected", "true");
            mediasData.sort((a, b) => a.likes - b.likes);
            for (let p of params){
                PHOTOGRAPHER_MEDIAS.innerHTML="";
                likes= 0;
                updatePhotographerMedias(p[1]);
            }
            break;
        case "date" :
            mediasData.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));   
            for (let p of params){
                PHOTOGRAPHER_MEDIAS.innerHTML="";
                likes= 0;
                updatePhotographerMedias(p[1]);
            }
            break;
        case "titre" :
            mediasData.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
            for (let p of params){
                PHOTOGRAPHER_MEDIAS.innerHTML="";
                likes= 0;
                updatePhotographerMedias(p[1]);
            }
            break;
        default :
            console.log('error dropdown');
    }
    DROPDOWN.innerHTML= `<button role="button" id="exp_button" class="button photographer-medias__filter-dropdown-button--original" role="button" id="exp_button" class="button photographer-medias__filter-dropdown-button--original" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button">${e.target.textContent}</button>`;
    BUTTON= document.querySelector('.photographer-medias__filter-dropdown-button--original');
    BUTTON.addEventListener('click', openDropdown);   
}

function closeDropdown(content){
    DROPDOWN.innerHTML= `<button role="button" id="exp_button" class="button photographer-medias__filter-dropdown-button--original" role="button" id="exp_button" class="button photographer-medias__filter-dropdown-button--original" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button">${content}</button>`;
    BUTTON= document.querySelector('.photographer-medias__filter-dropdown-button--original');
    BUTTON.addEventListener('click', openDropdown);
} 

let isScrolling= false;

if(PHOTOGRAPHERS_SECTION){
    window.addEventListener('scroll', ()=> {

        if(!isScrolling){
            const scrollButton= document.createElement('a');
            scrollButton.classList.add('accueil__scroll-button');
            scrollButton.setAttribute('href', '#accueil-main');
            scrollButton.innerText= "Passer au contenu";
            PHOTOGRAPHERS_SECTION.appendChild(scrollButton);
            isScrolling= true;
        }        
    });
}