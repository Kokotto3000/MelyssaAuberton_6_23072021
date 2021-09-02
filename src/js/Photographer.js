import { PHOTOGRAPHERS_SECTION, PHOTOGRAPHER_PRESENTATION } from './globals';

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
        photographerTags.innerHTML= this.tags.map(tag => `<li><a class="tag" href="?id=${tag}" role="link" aria-label="tri des photographes par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a></li>`).join('');
        PHOTOGRAPHERS_SECTION.appendChild(photographerCard);
        photographerCard.classList.add('accueil-photographers__card');
        photographerCard.innerHTML= `<a class="accueil-photographers__card-link" href="photographer-page.html?id=${this.id}" role="link" alt="${this.name}">${photographerImg} ${photographerName}</a><div class="accueil-photographers__card-content" aria-label="informations sur le photographe" tabindex="0">${photographerData}</div>`;
        photographerCard.appendChild(photographerFooter);
        photographerFooter.appendChild(photographerTags);
    }

    // méthode pour afficher la partie présentation de la page photographe
    updatePhotographerPresentation(){
        // création du template de la section présentation
        document.title= `Fisheye | Page Photographe de ${this.name}`;
        const presentationDatas= document.createElement('div');
        presentationDatas.setAttribute("class", "photographer-page__presentation-content");
        PHOTOGRAPHER_PRESENTATION.appendChild(presentationDatas);
        presentationDatas.innerHTML= `<h1 tabindex="0">${this.name}</h1><div class="photographer-page__presentation-content--informations" tabindex="0" aria-label="informations sur le photographe ${this.name}><p class="photographer-page__presentation-content--location">${this.city}, ${this.country}</p><p class="photographer-page__presentation-content--tagline">${this.tagline}</p></div>`;
        const photographerFooter= document.createElement('footer');
        presentationDatas.appendChild(photographerFooter);
        const photographerTags= document.createElement('ul');   
        photographerTags.innerHTML= this.tags.map(tag => `<li><a class="tag" href="index.html?id=${tag}" aria-label="tri des photographes par Tag ${tag}">#<span class="sr-only">Tag</span>${tag}</a></li>`).join('');
        photographerFooter.appendChild(photographerTags);
        const contactButton= document.createElement('button');
        contactButton.setAttribute("class", "button contact-button");
        contactButton.setAttribute("alt", "Contact me");
        contactButton.innerText= "Contactez-moi";
        presentationDatas.appendChild(contactButton);
        const photographerImg= document.createElement('img');
        photographerImg.setAttribute("src", `../assets/images/Photographers-ID-Photos/${this.portrait}`);
        photographerImg.setAttribute("alt", this.name);
        photographerImg.setAttribute("tabindex", "0");
        PHOTOGRAPHER_PRESENTATION.appendChild(photographerImg);

        // FOOTER
        const PHOTOGRAPHER_FOOTER= document.createElement("footer");
        PHOTOGRAPHER_FOOTER.setAttribute("class", "photographer-footer");
        PHOTOGRAPHER_FOOTER.setAttribute("tabindex", "0");
        PHOTOGRAPHER_FOOTER.innerHTML= `<div class="photographer-footer__likes"><p id="likes"></p><span class="sr-only">Likes au total pour le photographe ${this.name}</span><svg focusable="false" data-prefix="far" data-icon="heart" class="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30"><path d="M259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg></div><p class="photographer-footer__price">${this.price}€/jour</p>`;
        PHOTOGRAPHER_PRESENTATION.appendChild(PHOTOGRAPHER_FOOTER);
    }
}