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
    
    // méthode pour la création des cartes sur la pagfe d'accueil
    updatePhotographerCards(){
        // création du template des cards photographes sur la page d'accueil
        const photographerCard= document.createElement('article');
        const photographerImg= `<img src="../assets/images/Photographers-ID-Photos/${this.portrait}" alt='photo de ${this.name}' />`;
        const photographerName= `<h2>${this.name}</h2>`;
        const photographerData= `<p>${this.city}, ${this.country}</p><p>${this.tagline}</p><p>${this.price}€/jour</p>`;
        const photographerTags= document.createElement('ul');
        const photographerFooter= document.createElement('footer');
        photographerTags.innerHTML= this.tags.map(tag => `<li><a class="tag" target="${tag}" href="#${tag}">#${tag}</a></li>`).join('');
        // this.tags.forEach(tag=>{
        //     // console.log(tag);
        //     const newTag= document.createElement('li');
        //     newTag.innerHTML=`<a class="tag" target="${tag}" href="#${tag}">#${tag}</a>`;
        //     photographerTags.appendChild(newTag);
        // });
        PHOTOGRAPHERS_SECTION.appendChild(photographerCard);
        photographerCard.classList.add('photographers-card');
        photographerCard.innerHTML= `<a class="photographer-cards__link" href="photographer-page.html?id=${this.id}">${photographerImg} ${photographerName}</a><div>${photographerData}</div>`;
        photographerCard.appendChild(photographerFooter);
        photographerFooter.appendChild(photographerTags);
    }
}