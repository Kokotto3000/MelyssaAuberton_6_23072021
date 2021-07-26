import { PHOTOGRAPHERS_SECTION } from './globals';

export class Photographer{
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