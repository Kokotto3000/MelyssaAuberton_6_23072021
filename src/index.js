//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
// importe les globals
import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_MEDIAS, PHOTOGRAPHER_LIKES, FORM } from './js/globals';
// importe les classes
import { Photographer } from './js/Photographer';
import { Medias } from './js/Medias';
import { Contact } from './js/Contact';

//CONSTANTES ET VARIABLES
const photographersData= FishEyeData.photographers;
const mediasData= FishEyeData.media;

//création d'un tableau pour la création de la barre de nav
const tags= ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
const NAV= document.querySelector('.header-nav');
const navList= document.createElement('ul');

// récupérère les infos de l'url
const urlParams= window.location.search;
const params= new URLSearchParams(urlParams);

let disabledLikes= false;
let isValidFirst= false;
let isValidLast= false;
let isValidMail= false;

let mediasArray= [];

if(NAV){
    NAV.appendChild(navList);
    tags.forEach(tag=> {
        const newTag= document.createElement('li');
        newTag.innerHTML=`<a class="tag" target="${tag}" href="#${tag}">#${tag}</a>`;
        navList.appendChild(newTag);
    });
}

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

                    // //LIGHTBOX
                    // const MEDIAS= document.querySelectorAll('.photographer-media');
                    // const LIGHTBOX= document.getElementById('lightbox');
                    // MEDIAS.forEach(media => media.addEventListener('click', ()=> {
                    //     LIGHTBOX.style.display= 'block';
                    // }));
                    // console.log(mediasArray);                                       

                    // LIGHTBOX.innerHTML= `<div class='lightbox-content'><span class="lightbox-content__close-button"></span></div>`;
                    // const LIGHTBOX_CLOSE= document.querySelector('.lightbox-content__close-button');    
                    // LIGHTBOX_CLOSE.addEventListener('click', ()=> {
                    //     LIGHTBOX.style.display= "none";
                    // });
                } 

                if(FORM){
                    const contact= new Contact();
                    // DOM Elements, toutes les recherches qui ne concerne que la page photographer à ne mettre que quand la page photographer est ouverte !!!
                    const modalbg = document.querySelector(".bground");
                    const modalBtn = document.querySelector(".contact-button");
                    const modalCloseBtn = document.querySelector(".close");                    
                    const SUCCESS= document.getElementById("success-message");
                    
                    // modal events
                    modalBtn.addEventListener("click", ()=> {
                        modalbg.style.display = "block";
                    });
                    modalCloseBtn.addEventListener("click", ()=> {
                        modalbg.style.display = "none";
                        contact.resetForm();
                        isValidFirst= isValidLast= isValidMail= false;
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

                    // function launchModal() {
                    //     modalbg.style.display = "block";
                    // }
                    
                    // function closeModal() {
                    //     modalbg.style.display = "none";
                    //     contact.resetForm();
                    //     isValidFirst= isValidLast= isValidMail= false;
                    // }
                }
            }
        });
    }
}

if(PHOTOGRAPHER_PRESENTATION) displayPhotographerPresentation();



function updatePhotographerMedias(id, filter){
    mediasArray= [];
    let likes= 0;    
    // console.log(id + " " + filter);
    const filteredMedias= mediasData.filter(media => media.photographerId == id);
    // console.log(filteredMedias);  
    filteredMedias.forEach(media =>{            
        const mediaCard = new Medias(media);
        mediaCard.displayPhotographerMedias(id, filter);
        // création du tableau pour la lightbox
        mediasArray.push({"media" : mediaCard.image || mediaCard.video, "title" : mediaCard.title});

        // FOOTER
        if(!disabledLikes){
            likes += mediaCard.likes;
            PHOTOGRAPHER_LIKES.innerText= likes;
        }
        
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
    const LIGHTBOX= document.getElementById('lightbox');
    MEDIAS.forEach(media => media.addEventListener('click', ()=> {
        LIGHTBOX.style.display= 'block';
    }));
    console.log(mediasArray);                                       

    LIGHTBOX.innerHTML= `<div class='lightbox-content'><span class="lightbox-content__close-button"></span></div>`;
    const LIGHTBOX_CLOSE= document.querySelector('.lightbox-content__close-button');    
    LIGHTBOX_CLOSE.addEventListener('click', ()=> {
        LIGHTBOX.style.display= "none";
    });
}

//DROPDOWN
const DROPDOWN= document.querySelector('.filter-buttons');
const BUTTON= document.querySelector('.filter-button__original');

const dropdownElements= ["popularité", "date", "titre"];

if(BUTTON) BUTTON.addEventListener('click', openDropdown);

function openDropdown(){
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
            console.log("error");
    }

    DROPDOWN.innerHTML= `<button class="button filter-button__original">${e.target.textContent}</button>`;
    const BUTTON= document.querySelector('.filter-button__original');
    BUTTON.addEventListener('click', openDropdown);

}

