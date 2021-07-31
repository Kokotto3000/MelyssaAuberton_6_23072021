//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
const photographersData= FishEyeData.photographers;
const mediasData= FishEyeData.media;
// const PHOTOGRAPHERS_SECTION= document.getElementById('photographers');
import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_MEDIAS, PHOTOGRAPHER_LIKES} from './js/globals';

//création d'un tableau pour la création de la barre de nav
const tags= ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
const NAV= document.querySelector('.header-nav');
const navList= document.createElement('ul');

if(NAV){
    NAV.appendChild(navList);
    tags.forEach(tag=> {
        const newTag= document.createElement('li');
        newTag.innerHTML=`<a class="tag" target="${tag}" href="#${tag}">#${tag}</a>`;
        navList.appendChild(newTag);
    });
}

import { Photographer } from './js/Photographer';
import { Medias } from './js/Medias';

// fonction de filtre des boutons tags
// génère les cartes des photographes
function init(filter){
    // console.log(filter);
    if(!filter){
        // console.log(photographersData);
        photographersData.forEach(photographer =>{
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
        });
    }else{        
        const filteredPhotographers= photographersData.filter(photographer => photographer.tags.includes(filter));
        // console.log(filteredPhotographers);        
        filteredPhotographers.forEach(photographer =>{            
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
        });
    } 
    // création de l'évènement sur les boutons tag
    const TAG_FILTERS= document.querySelectorAll('.tag');
    // console.log(TAG_FILTERS);
    TAG_FILTERS.forEach(tagFilter => {    
        tagFilter.addEventListener("click", (e)=> {
            e.preventDefault();
            // console.log(tagFilter.target);
            PHOTOGRAPHERS_SECTION.innerHTML="";
            init(tagFilter.target);
        });
    });
}

if(PHOTOGRAPHERS_SECTION) init();

const urlParams= window.location.search;
const params= new URLSearchParams(urlParams);

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
                // création de l'évènement sur les boutons contact
                const CONTACT_BUTTON= document.querySelector('.contact-button');
                CONTACT_BUTTON.addEventListener("click", (e)=> {
                    e.preventDefault();
                    console.log('ouverture de la modale contact');
                });
                if(PHOTOGRAPHER_MEDIAS) updatePhotographerMedias(photographer.id);
            }
        });
    }
}

if(PHOTOGRAPHER_PRESENTATION) displayPhotographerPresentation();

function updatePhotographerMedias(id, filter){
    // console.log(id + " " + filter);
    const filteredMedias= mediasData.filter(media => media.photographerId == id);
    // console.log(filteredMedias);  
    filteredMedias.forEach(media =>{            
        const mediaCard = new Medias(media);
        mediaCard.displayPhotographerMedias(id, filter);
    });

    // création de l'évènement sur les boutons tag pour les medias
    const TAG_FILTERS= document.querySelectorAll('.tag');
    // console.log(TAG_FILTERS);
    TAG_FILTERS.forEach(tagFilter => {    
        tagFilter.addEventListener("click", (e)=> {
            e.preventDefault();
            // console.log(tagFilter.target);
            PHOTOGRAPHER_MEDIAS.innerHTML="";
            updatePhotographerMedias(id, tagFilter.target);
        });
    });
}


// DOM Elements, toutes les recherches qui ne concerne que la page photographer à ne mettre que quand la page photographer est ouverte !!!
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".contact-button");
const modalCloseBtn = document.querySelector(".close");
const inputs= document.querySelector('form').elements;

// Regex
//attention cette regex n'accepte pas les accents et caractères "spéciaux" ( -, ', ...)
const checkString = /^[a-zA-Z]{2}/;
const checkMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//EVENTS
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
  }
  
// close modal form
function closeModal() {
modalbg.style.display = "none";
}

//DROPDOWN
const DROPDOWN= document.querySelector('.filter-buttons');
const BUTTON= document.querySelector('.filter-button__original');

const dropdownElements= ["popularité", "date", "titre"];

BUTTON.addEventListener('click', openDropdown);

function openDropdown(){
    console.log("openDropdown");
    DROPDOWN.innerHTML= dropdownElements.map(element => `<button class="button filter-buttons__button">${element}</button>`).join('');
    const DROPDOWN_BUTTONS= document.querySelectorAll('.filter-buttons__button');
    DROPDOWN_BUTTONS.forEach(button=> button.addEventListener('click', filterDropdown));
}

function filterDropdown(e){
    // console.log(e.target.textContent);
    // console.log(params);
    switch(e.target.textContent) {
        case "popularité" :
            mediasData.sort((a, b) => a.likes - b.likes);
            for (let p of params){
                PHOTOGRAPHER_MEDIAS.innerHTML="";
                updatePhotographerMedias(p[1]);
            }
            break;
        case "date" :
            mediasData.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));   
            for (let p of params){
                PHOTOGRAPHER_MEDIAS.innerHTML="";
                updatePhotographerMedias(p[1]);
            }
            break;
        case "titre" :
            mediasData.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
            for (let p of params){
                PHOTOGRAPHER_MEDIAS.innerHTML="";
                updatePhotographerMedias(p[1]);
            }
            break;
        default :
            console.log("error");
    }

    DROPDOWN.innerHTML= `<button class="button filter-button__original">${e.target.textContent}</button>`;
    const BUTTON= document.querySelector('.filter-button__original');
    BUTTON.addEventListener('click', openDropdown);
}

// LIKES
const LIKE_BUTTONS= document.querySelectorAll('.like-button');
LIKE_BUTTONS.forEach(button=> button.addEventListener('click', ()=> {
    const LIKES= button.querySelector('span');
    LIKES.innerText++;
    PHOTOGRAPHER_LIKES.innerText++;
}));
