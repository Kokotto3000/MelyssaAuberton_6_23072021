/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 931:
/***/ (() => {


;// CONCATENATED MODULE: ./src/data/FishEyeData.json
const FishEyeData_namespaceObject = JSON.parse('{"G":[{"name":"Mimi Keel","id":243,"city":"London","country":"UK","tags":["portrait","events","travel","animals"],"tagline":"Voir le beau dans le quotidien","price":400,"portrait":"MimiKeel.jpg"},{"name":"Ellie-Rose Wilkens","id":930,"city":"Paris","country":"France","tags":["sports","architecture"],"tagline":"Capturer des compositions complexes","price":250,"portrait":"EllieRoseWilkens.jpg"},{"name":"Tracy Galindo","id":82,"city":"Montreal","country":"Canada","tags":["art","fashion","events"],"tagline":"Photographe freelance","price":500,"portrait":"TracyGalindo.jpg"},{"name":"Nabeel Bradford","id":527,"city":"Mexico City","country":"Mexico","tags":["travel","portrait"],"tagline":"Toujours aller de l\'avant","price":350,"portrait":"NabeelBradford.jpg"},{"name":"Rhode Dubois","id":925,"city":"Barcelona","country":"Spain","tags":["sport","fashion","events","animals"],"tagline":"Je crée des souvenirs","price":275,"portrait":"RhodeDubois.jpg"},{"name":"Marcel Nikolic","id":195,"city":"Berlin","country":"Germany","tags":["travel","architecture"],"tagline":"Toujours à la recherche de LA photo","price":300,"portrait":"MarcelNikolic.jpg"}]}');
;// CONCATENATED MODULE: ./src/js/globals.js
const PHOTOGRAPHERS_SECTION= document.getElementById('photographers');
;// CONCATENATED MODULE: ./src/js/Photographer.js


class Photographer{
    constructor(data){
        this.id= data.id;
        this.name= data.name;
        this.city= data.city;
        this.country= data.country;
        this.tagline= data.tagline;
        this.price= data.price;
        this.tags= data.tags;
        this.portrait= data.portrait;
    }
    
    updatePhotographerCards(){
        // création du template des cards photographes sur la page d'accueil
        const photographerCard= document.createElement('article');
        const photographerImg= `<img src="../assets/images/Photographers-ID-Photos/${this.portrait}" alt='photo de ${this.name}' />`;
        const photographerData= `<figcaption><h2>${this.name}</h2><p>${this.city}, ${this.country}</p><p>${this.tagline}</p><p>${this.price}€/jour</p></figcaption>`;
        const photographerTags= document.createElement('ul');
        this.tags.forEach(tag=>{
            // console.log(tag);
            const newTag= document.createElement('li');
            newTag.innerHTML=`<a class="tag" target="${tag}" href="photographer-page.html">#${tag}</a>`;
            photographerTags.appendChild(newTag);
        });
        PHOTOGRAPHERS_SECTION.appendChild(photographerCard);
        photographerCard.classList.add('photographers-card');
        photographerCard.innerHTML= photographerImg + photographerData;
        photographerCard.appendChild(photographerTags);
    }
}
;// CONCATENATED MODULE: ./src/index.js
//import du main.scss


//import des données du fichier .json

const photographersData= FishEyeData_namespaceObject.G;
// const PHOTOGRAPHERS_SECTION= document.getElementById('photographers');


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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[931]();
/******/ 	
/******/ })()
;