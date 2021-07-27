//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
const photographersData= FishEyeData.photographers;
const mediasData= FishEyeData.media;
// const PHOTOGRAPHERS_SECTION= document.getElementById('photographers');
import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_MEDIAS } from './js/globals';

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

// fonction pour l'affichage de la présentation sur la page photographe
function displayPhotographerPresentation(){
    // console.log(window.location);
    // console.log(window.location.search);
    const urlParams= window.location.search;
    const params= new URLSearchParams(urlParams);

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
                if(PHOTOGRAPHER_MEDIAS) displayPhotographerMedias(photographer.id);
            }
        });
    }
}

if(PHOTOGRAPHER_PRESENTATION) displayPhotographerPresentation();

function displayPhotographerMedias(id){
    console.log(id);
    const filteredMedias= mediasData.filter(media => media.photographerId == id);
        console.log(filteredMedias);        
        filteredMedias.forEach(media =>{            
            const mediaCard = new Medias(media);
            mediaCard.displayPhotographerMedias(id);
        });
}

//petit commentaire pour recommencer mon merge
