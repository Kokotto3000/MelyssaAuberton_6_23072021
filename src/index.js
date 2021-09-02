//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
// importe les globals
import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_MEDIAS, FORM, LIGHTBOX, tabbableElements, keepFocus } from './js/globals';

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

//likes
let disabledLikes= false;
let likes= 0;

//form
let isValidFirst= false;
let isValidLast= false;
let isValidMail= false;
let isValidMessage= false;

//lightbox
let sliderArray= [];

// passer au contenu
let isScrolling= false;


//FONCTIONS

// fonction de filtre des boutons tags, génère les cartes des photographes
function init(){
    NAV.appendChild(navList);
    tags.forEach(tag=> {
        const newTag= document.createElement('li');
        newTag.innerHTML=`<a class="tag" href="?id=${tag}" role="link" aria-label="tri des photographes par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a>`;
        navList.appendChild(newTag);
    });

    let filter;
    for(let p of params){
        if(p) filter= p[1];
    }
    
    if(filter){
        const filteredPhotographers= photographersData.filter(photographer => photographer.tags.includes(filter));       
        filteredPhotographers.forEach(photographer =>{            
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
            document.title= `FishEye | Accueil, tri des photographes par ${filter}`;
        });
    }else{
        photographersData.forEach(photographer =>{
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
        });
    }

    //  bouton passer au contenu
    window.addEventListener('scroll', ()=> {
        const SCROLL_BUTTON= document.getElementById("scroll-button");
        if(!isScrolling){
            SCROLL_BUTTON.className= "accueil__scroll-button";
        }      
    });
}

// fonction pour l'affichage de la présentation sur la page photographe
function displayPhotographerPresentation(){
    for (let p of params) {
        photographersData.forEach(photographer => {
            if(photographer.id == p[1]){
                const photographerPresentation = new Photographer(photographer);
                photographerPresentation.updatePhotographerPresentation();

                if(PHOTOGRAPHER_MEDIAS){
                    updatePhotographerMedias(photographer.id);
                } 

                if(FORM){
                    const contact= new Contact();
                    const modalbg = document.querySelector(".photographer-modal");
                    const modalBtn = document.querySelector(".contact-button");
                    const modalCloseBtn = document.querySelector(".close");                    
                    const SUCCESS= document.getElementById("success-message");
                    const modalTitle= document.querySelector(".photographer-modal__content-title span");
                    modalTitle.innerText= photographer.name;
                    
                    // modal events
                    modalBtn.addEventListener("click", ()=> {
                        modalbg.style.display = "block";
                        modalbg.setAttribute("aria-modal", "true");
                        keepFocus(modalbg);
                        modalbg.focus();
                    });

                    function closeFormModal(){
                        modalbg.style.display = "none";
                        modalbg.setAttribute("aria-modal", "false");
                        contact.resetForm();
                        isValidFirst= isValidLast= isValidMail= false;
                        modalBtn.focus();
                    }
                    modalCloseBtn.addEventListener("click", closeFormModal);
                    document.addEventListener('keydown', e => {
                        if(e.code === "Escape") closeFormModal();
                    });

                    contact.inputs.first.addEventListener("change", ()=>{
                        contact.stringValidation("first");
                    });
                    contact.inputs.last.addEventListener("change", ()=>{
                        contact.stringValidation("last");
                    });
                    contact.inputs.email.addEventListener("change", ()=>{
                        contact.emailValidation();
                    });
                    contact.inputs.message.addEventListener("change", ()=>{
                        contact.messageValidation();
                    });

                    FORM.addEventListener("submit", e => {
                        e.preventDefault();
                        contact.stringValidation("first") ? isValidFirst= true : false;
                        contact.stringValidation("last") ? isValidLast= true : false;
                        contact.emailValidation() ? isValidMail= true : false;
                        contact.messageValidation() ? isValidMessage= true : false;
                        if(isValidFirst && isValidLast && isValidMail && isValidMessage) {
                            console.log("Message pour : " + photographer.name + "\nPrénom : " + contact.getInputs('first').value + "\nNom : " + contact.getInputs('last').value + "\nEmail : " + contact.getInputs('email').value + "\nMessage : " + contact.getInputs('message').value);                            
                            contact.resetForm();
                            isValidFirst= isValidLast= isValidMail= false; 
                            SUCCESS.innerText= "Le message a bien été envoyé !";                           
                        }
                    });
                }
            }
        });
    }
}

// fonction pour l'affichage de medias de la page photographe
function updatePhotographerMedias(id, filter){
    sliderArray= [];
    likes= 0;
    const PHOTOGRAPHER_LIKES= document.getElementById('likes');
    const filteredMedias= mediasData.filter(media => media.photographerId == id);
    filteredMedias.forEach(media =>{            
        const mediaCard = new Medias(media);
        mediaCard.displayPhotographerMedias(id, filter);

        if(filter){
            if(media.tags[0] === filter) sliderArray.push(mediaCard);   
        }else sliderArray.push(mediaCard);

        // FOOTER
        //ne charge les likes du .json qu'au chargement de la page
        if(!disabledLikes){
            likes += mediaCard.likes;
            PHOTOGRAPHER_LIKES.innerText= likes;
        }        
    });

    // LIKES event
    const LIKE_BUTTONS= document.querySelectorAll('.like-button');
    LIKE_BUTTONS.forEach(button=> {
        let isCliquable= true;
        button.addEventListener('click', ()=> {
            // on ne peut cliquer qu'une fois sur les coeurs des medias, par page...
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
    
    const MEDIAS= document.querySelectorAll('.photographer-media__link');
    
    MEDIAS.forEach(media => media.addEventListener('click', ()=> {
        const sliderIndex= sliderArray.map(sliderId => sliderId.id).indexOf(Number(media.id));
        LIGHTBOX.style.display= 'block';
        LIGHTBOX.setAttribute("aria-modal", "true");
        
        const lightbox= new Lightbox(sliderArray);
        lightbox.displayLightbox(sliderIndex);        
    }));
}

//DROPDOWN
function openDropdown(e){
    DROPDOWN.innerHTML = `<ul id="exp_elem_list" arialabelledby="exp_elem" aria-activedescendant= "exp_elem_${e.target.textContent}" role="listbox" aria-expended="true">` + dropdownElements.map(element => `<li role="option" id="exp_elem_${element}" tabindex= "0" class="button photographer-medias__filter-dropdown-button">${element}</li>`).join('') + `</ul>`;
    
    keepFocus(DROPDOWN);
    const FIRST_BUTTON= DROPDOWN.querySelector('li');
    FIRST_BUTTON.focus();
    
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
    for(let p of params){
        if(p){
            photographersData.forEach(photographer => {
                if(photographer.id == p[1]) document.title= `FishEye | Page Photographe de ${photographer.name}, tri des images par ${e.target.textContent}`;
            });
        }
    }
    switch(e.target.textContent) {
        case "popularité" :
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
    closeDropdown(e.target.textContent);   
}

function closeDropdown(content){
    DROPDOWN.innerHTML= `<button role="button" id="exp_button" class="button photographer-medias__filter-dropdown-button--original" role="button" id="exp_button" class="button photographer-medias__filter-dropdown-button--original" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button">${content}</button>`;
    BUTTON= document.querySelector('.photographer-medias__filter-dropdown-button--original');
    BUTTON.addEventListener('click', openDropdown);
}


//CODE PRINCIPAL
if(PHOTOGRAPHERS_SECTION) init();

if(PHOTOGRAPHER_PRESENTATION) displayPhotographerPresentation();

if(BUTTON) BUTTON.addEventListener('click', openDropdown);