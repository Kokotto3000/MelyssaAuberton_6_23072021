//import du main.scss
import './sass/main.scss';

//import des données du fichier .json
import FishEyeData from './data/FishEyeData.json';
const photographersData= FishEyeData.photographers;
// const PHOTOGRAPHERS_SECTION= document.getElementById('photographers');
import { PHOTOGRAPHERS_SECTION } from './js/globals';

//création d'un tableau pour la création de la barre de nav
const tags= ["portrait", "art", "fashion", "architecture", "travel", "sport", "animals", "events"];
const NAV= document.querySelector('.header-nav');
const navList= document.createElement('ul');
NAV.appendChild(navList);
tags.forEach(tag=> {
    const newTag= document.createElement('li');
    newTag.innerHTML=`<a class="tag" target="${tag}" href="#${tag}">#${tag}</a>`;
    navList.appendChild(newTag);
});

import { Photographer } from './js/Photographer';

// class Photographer{
//     constructor(data){
//         this.id= data.id;
//         this.name= data.name;
//         this.city= data.city;
//         this.country= data.country;
//         this.tagline= data.tagline;
//         this.price= data.price;
//         this.tags= data.tags;
//         this.portrait= data.portrait;
//     }
    
//     updatePhotographerCards(){
//         // console.log(this.id + this.name);
//         // création du template des cards photographes sur la page d'accueil
//         const photographerCard= document.createElement('article');
//         const photographerImg= `<img src="../assets/images/Photographers-ID-Photos/${this.portrait}" alt='photo de ${this.name}' />`;
//         const photographerData= `<figcaption><h2>${this.name}</h2><p>${this.city}, ${this.country}</p><p>${this.tagline}</p><p>${this.price}€/jour</p></figcaption>`;
//         const photographerTags= document.createElement('ul');
//         this.tags.forEach(tag=>{
//             // console.log(tag);
//             const newTag= document.createElement('li');
//             newTag.innerHTML=`<a class="tag" target="${tag}" href="photographer-page.html">#${tag}</a>`;
//             photographerTags.appendChild(newTag);
//         });
//         PHOTOGRAPHERS_SECTION.appendChild(photographerCard);
//         photographerCard.classList.add('photographers-card');
//         photographerCard.innerHTML= photographerImg + photographerData;
//         photographerCard.appendChild(photographerTags);
//     }
// }

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
}

init();

//commentaire