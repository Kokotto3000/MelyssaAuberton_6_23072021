import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION, PHOTOGRAPHER_PRICE } from './globals';
// import { Medias } from './Medias';

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
    
    // méthode pour la création des cartes sur la page d'accueil
    updatePhotographerCards(){
        // création du template des cards photographes sur la page d'accueil
        const photographerCard= document.createElement('article');
        const photographerImg= `<img src="../assets/images/Photographers-ID-Photos/${this.portrait}" alt='' />`;
        const photographerName= `<h2>${this.name}</h2>`;
        const photographerData= `<p class="accueil-photographers__card-content--location">${this.city}, ${this.country}</p><p class="accueil-photographers__card-content--tagline">${this.tagline}</p><p class="accueil-photographers__card-content--price">${this.price}€/jour</p>`;
        const photographerTags= document.createElement('ul');
        photographerTags.setAttribute("aria-label", "Navigation secondaire");
        photographerTags.setAttribute("role", "navigation");
        const photographerFooter= document.createElement('footer');
        photographerTags.innerHTML= this.tags.map(tag => `<li><a class="tag" target="${tag}" href="#" role="link" aria-label="tri des photographes par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a></li>`).join('');
        PHOTOGRAPHERS_SECTION.appendChild(photographerCard);
        photographerCard.classList.add('accueil-photographers__card');
        photographerCard.innerHTML= `<a class="accueil-photographers__card-link" href="photographer-page.html?id=${this.id}" role="link" alt="${this.name}">${photographerImg} ${photographerName}</a><div>${photographerData}</div>`;
        photographerCard.appendChild(photographerFooter);
        photographerFooter.appendChild(photographerTags);
    }

    // méthode pour afficher la partie présentation de la page photographe
    updatePhotographerPresentation(){
        // création du template de la section présentation
        const presentationDatas= document.createElement('div');
        PHOTOGRAPHER_PRESENTATION.appendChild(presentationDatas);
        presentationDatas.innerHTML= `<h1>${this.name}</h1><p class="photographer-page__presentation-content--location">${this.city}, ${this.country}</p><p class="photographer-page__presentation-content--tagline">${this.tagline}</p>`;
        const photographerFooter= document.createElement('footer');
        presentationDatas.appendChild(photographerFooter);
        const photographerTags= document.createElement('ul');   
        photographerTags.innerHTML= this.tags.map(tag => `<li><a class="tag" target="${tag}" href="#" aria-label="tri des médias par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a></li>`).join('');
        photographerFooter.appendChild(photographerTags);
        const contactButton= document.createElement('button');
        contactButton.setAttribute("class", "button contact-button");
        contactButton.setAttribute("alt", "Contact me");
        contactButton.innerText= "Contactez-moi";
        presentationDatas.appendChild(contactButton);
        const photographerImg= document.createElement('img');
        photographerImg.setAttribute("src", `../assets/images/Photographers-ID-Photos/${this.portrait}`);
        photographerImg.setAttribute("alt", this.name);
        PHOTOGRAPHER_PRESENTATION.appendChild(photographerImg);

        // FOOTER
        PHOTOGRAPHER_PRICE.innerText= this.price;
    }
}