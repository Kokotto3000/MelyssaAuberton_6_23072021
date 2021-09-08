/********************IMPORTS*********************/

//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
//dans la version 5 de webpack, le fetch se fait automatiquement sur les fichiers .json

// importe les globals
import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_MEDIAS, FORM, LIGHTBOX, tabbableElements, keepFocus } from './js/globals';

// importe les classes
import { Photographer } from './js/Photographer';
import { Medias } from './js/Medias';
import { Contact } from './js/Contact';
import { Lightbox } from './js/Lightbox';

/********************CONSTANTES ET VARIABLES********************/

const photographersData= FishEyeData.photographers;
const mediasData= FishEyeData.media;

//console.log(photographersData);

//création d'un tableau pour la création de la barre de nav
const tags= ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
const NAV= document.querySelector('.accueil-header__nav');
const navList= document.createElement('ul');

// récupérère les infos de l'url
const urlParams= window.location.search;
const params= new URLSearchParams(urlParams);

// variables pour le DROPDOWN, récupération des éléments nécessaire du DOM et création d'un tableau avec les tags
const DROPDOWN= document.querySelector('.photographer-medias__filter-dropdown');
let BUTTON= document.querySelector('.photographer-medias__filter-dropdown-button--original');
const dropdownElements= ["popularité", "date", "titre"];

//variables utiles pour les likes
let disabledLikes= false;
let likes= 0;

// variables pour la validation du formulaire
let isValidFirst= false;
let isValidLast= false;
let isValidMail= false;
let isValidMessage= false;

// création d'un tableau pour la lightbox
let sliderArray= [];

// passer au contenu
let isScrolling= false;


/********************FONCTIONS********************/

// fonction qui initialise l'affichage de l'index du site en fonction ou non des filtres sur les boutons tags(utile aussi pour le retour sur la page index grâce aux tags de la page photographe), génère les cartes des photographes
function init(){
    //création de la barre de nav
    NAV.appendChild(navList);
    tags.forEach(tag=> {
        const newTag= document.createElement('li');
        newTag.innerHTML=`<a class="tag" href="?id=${tag}" aria-label="tri des photographes par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a>`;
        navList.appendChild(newTag);
    });

    //vérifie si un filtre à été rentré dans l'url
    let filter;
    //on récupère les infos dans l'url
    for(let p of params){
        if(p) filter= p[1];
    }
    
    if(filter){
        // affiche toutes les cartes photographes en fonction du filtre en instanciant la classe Photographer et en appelant la méthode updatePhotographerCards, et change le title du head
        const filteredPhotographers= photographersData.filter(photographer => photographer.tags.includes(filter));       
        filteredPhotographers.forEach(photographer =>{            
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
            document.title= `FishEye | Accueil, tri des photographes par ${filter}`;
        });
    }else{
        // s'il n'y a pas de filtre, on affiche tout
        photographersData.forEach(photographer =>{
            const photographerCard = new Photographer(photographer);
            photographerCard.updatePhotographerCards();
        });
    }

    //  event sur le scroll de cette page pour afficher le bouton "passer au contenu"
    window.addEventListener('scroll', ()=> {
        const SCROLL_BUTTON= document.getElementById("scroll-button");
        if(!isScrolling){
            SCROLL_BUTTON.className= "accueil__scroll-button";
        }      
    });
}

// fonction pour l'affichage de la présentation du photographe sélectionné sur la page photographe
function displayPhotographerPresentation(){
    //on récupère les infos dans l'url pour afficher le photographe qui correspond à l'id
    for (let p of params) {
        photographersData.forEach(photographer => {
            if(photographer.id == p[1]){
                const photographerPresentation = new Photographer(photographer);
                photographerPresentation.updatePhotographerPresentation();

                //on appelle la fonction qui va affiche les medias du photographe en lui passant son id en argument
                updatePhotographerMedias(photographer.id);

                //on va maintenant s'occuper du formulaire de contact, lié au bouton contacter-moi
                //on instancie la classe contact pour les vérifications
                const contact= new Contact();
                //on récupère les éléments nécessaire du DOM
                const modalbg = document.querySelector(".photographer-modal");
                const modalBtn = document.querySelector(".contact-button");
                const modalCloseBtn = document.querySelector(".close");                    
                const SUCCESS= document.getElementById("success-message");
                const modalTitle= document.querySelector(".photographer-modal__content-title span");
                //on affiche le nom du photographe dans le titre
                modalTitle.innerText= photographer.name;
                
                // event sur le bouton contact qui marche avec le click de la souris ou entrée quand on est focus dessus
                modalBtn.addEventListener("click", ()=> {
                    modalbg.style.display = "block";
                    modalbg.setAttribute("aria-modal", "true");
                    keepFocus(modalbg);
                    modalbg.focus();
                });

                //fonction pour la fermeture de la modal de contact qui sera appelée ou au click ou en appuyant sur escape
                function closeFormModal(){
                    modalbg.style.display = "none";
                    modalbg.setAttribute("aria-modal", "false");
                    contact.resetForm();
                    isValidFirst= isValidLast= isValidMail= false;
                    modalBtn.focus();
                }

                //les events pour la fermeture de la modal
                modalCloseBtn.addEventListener("click", closeFormModal);
                document.addEventListener('keydown', e => {
                    if(e.code === "Escape") closeFormModal();
                });

                //les events pour la vérification des entrées dans le formulaire, vérifie dès qu'on change le focus ou qu'on clique ailleurs sur le formulaire et appelle la methode de vérification de Contact, POUR UNE MEILLEURE EXPERIENCE UTILISATEUR plutôt que d'attendre le submit
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

                //event pour le bouton submit du formulaire
                FORM.addEventListener("submit", e => {
                    //on annule le comportement par défaut
                    e.preventDefault();
                    //on vérifie les champs
                    contact.stringValidation("first") ? isValidFirst= true : false;
                    contact.stringValidation("last") ? isValidLast= true : false;
                    contact.emailValidation() ? isValidMail= true : false;
                    contact.messageValidation() ? isValidMessage= true : false;
                    // si les champs sont tous bons, on enevoie le message de l'utilisateur dans la console et on affiche un message de succès
                    if(isValidFirst && isValidLast && isValidMail && isValidMessage) {
                        console.log("Message pour : " + photographer.name + "\nPrénom : " + contact.getInputs('first').value + "\nNom : " + contact.getInputs('last').value + "\nEmail : " + contact.getInputs('email').value + "\nMessage : " + contact.getInputs('message').value);                            
                        contact.resetForm();
                        isValidFirst= isValidLast= isValidMail= false; 
                        SUCCESS.innerText= "Le message a bien été envoyé !";                           
                    }
                });
            }
        });
    }
}

// fonction pour l'affichage des medias de la page photographe
function updatePhotographerMedias(id){
    //on vide le tableau des infos pour la lightbox à chaque fois qu'on appelle la fonction
    sliderArray= [];
    //on remets les likes à zero à chaque fois qu'on appelle cette fonction
    likes= 0;

    // pour les likes dans le footer
    const PHOTOGRAPHER_LIKES= document.getElementById('likes');

    // création d'un tableau avec les medias en fonction de l'id du photographe
    const filteredMedias= mediasData.filter(media => media.photographerId == id);

    // affichage des medias grâce à la méthode displayPhotographerMedias à chaque media filtré
    filteredMedias.forEach(media =>{            
        const mediaCard = new Medias(media);
        mediaCard.displayPhotographerMedias(id);

        //on ajoute nos mediaCard à notre array pour la lightbox
        sliderArray.push(mediaCard);

        // FOOTER
        //ne charge les likes du .json qu'au chargement de la page
        if(!disabledLikes){
            likes += mediaCard.likes;
            PHOTOGRAPHER_LIKES.innerText= likes;
        }        
    });

    // LIKES event quand on appuie sur les likes du photographe, ajoute 1 like sous la photo et dans le footer (une seule fois par media grâce à isCliquable)
    const LIKE_BUTTONS= document.querySelectorAll('.like-button');
    LIKE_BUTTONS.forEach(button=> {
        //on repasse isCliquable à true à chaque fois qu'on recharge la page (tant qu'on ne modifie pas la BDD)
        let isCliquable= true;
        button.addEventListener('click', ()=> {
            if(isCliquable){
                const LIKES= button.querySelector('span');
                LIKES.innerText++;
                PHOTOGRAPHER_LIKES.innerText++;
                //passe à false si cliqué, ne peut donc plus être cliqué
                isCliquable= false;
            }
        });
    });
    //si on reste sur cette page, les likes ne seront pas ajoutés à chaque différentes recherches
    disabledLikes= true;

    //LIGHTBOX    
    //on récupère tous les liens cliquable qui envoient vers la lighbox
    const MEDIAS= document.querySelectorAll('.photographer-media__link');
    //evenement qui affiche la lightbox et instancie la classe Lightbox avec le tableau de medias en arguments    
    MEDIAS.forEach(media => media.addEventListener('click', ()=> {
        const sliderIndex= sliderArray.map(sliderId => sliderId.id).indexOf(Number(media.id));
        LIGHTBOX.style.display= 'block';
        LIGHTBOX.setAttribute("aria-modal", "true");        
        const lightbox= new Lightbox(sliderArray);
        lightbox.displayLightbox(sliderIndex);        
    }));
}

//fonction pour le bouton dropdown
function openDropdown(e){
    DROPDOWN.innerHTML = `<ul id="exp_elem_list" arialabelledby="exp_elem" aria-activedescendant= "exp_elem_${e.target.textContent}" role="listbox" aria-expended="true">` + dropdownElements.map(element => `<li role="option" id="exp_elem_${element}" tabindex= "0" class="button photographer-medias__filter-dropdown-button">${element}</li>`).join('') + `</ul>`;
    
    //piège le focus dans le dropdown pour la navigation au clavier
    keepFocus(DROPDOWN);
    const FIRST_BUTTON= DROPDOWN.querySelector('li');
    //mets le focus le prmier bouton à l'ouverture du dropdown
    FIRST_BUTTON.focus();
    
    //on récupère les nouveaux boutons à l'ouverture
    const DROPDOWN_BUTTONS= document.querySelectorAll('.photographer-medias__filter-dropdown-button');
    DROPDOWN_BUTTONS.forEach(button=> {
        //et on filtre l'affichage en fonction du click
        button.addEventListener('click', filterDropdown);
        button.addEventListener('keydown', e => {
            if(e.code === "Enter") filterDropdown(e);
        });
    })
    //on peut aussi appuyer sur escape pour fermer le dropdown
    document.addEventListener("keydown", e=> {
        if(e.code === "Escape") closeDropdown(BUTTON.textContent);
    });
}

//fonction pour filtrer l'affichage en focntion du click sur le dropdown
function filterDropdown(e){
    for(let p of params){
        if(p){
            photographersData.forEach(photographer => {
                if(photographer.id == p[1]) document.title= `FishEye | Page Photographe de ${photographer.name}, tri des images par ${e.target.textContent}`;
            });
        }
    }
    //switch sur les différentes options et trie des medias grâce à element.sort()
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
    //une fois le click-tri effectué on ferme le dropdown
    closeDropdown(e.target.textContent);   
}

//fonction pour fermer le dropdown
function closeDropdown(content){
    DROPDOWN.innerHTML= `<button id="exp_button" class="button photographer-medias__filter-dropdown-button--original" aria-haspopup="listbox" aria-labelledby="exp_elem exp_button">${content}</button>`;
    BUTTON= document.querySelector('.photographer-medias__filter-dropdown-button--original');
    BUTTON.addEventListener('click', openDropdown);
}


/**********************CODE PRINCIPAL********************/

//ceux sont ces lignes qui vont lancer les fonctions principales du site
if(PHOTOGRAPHERS_SECTION) init();

if(PHOTOGRAPHER_PRESENTATION) displayPhotographerPresentation();

if(BUTTON) BUTTON.addEventListener('click', openDropdown);