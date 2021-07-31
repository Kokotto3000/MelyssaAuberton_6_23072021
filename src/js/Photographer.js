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

    // méthode pour afficher la partie présentation de la page photographe
    updatePhotographerPresentation(){
        // création du template de la section présentation
        const presentationDatas= document.createElement('div');
        PHOTOGRAPHER_PRESENTATION.appendChild(presentationDatas);
        presentationDatas.innerHTML= `<h2>${this.name}</h2><p>${this.city}, ${this.country}</p><p>${this.tagline}</p>`;
        const photographerFooter= document.createElement('footer');
        presentationDatas.appendChild(photographerFooter);
        const photographerTags= document.createElement('ul');   
        photographerTags.innerHTML= this.tags.map(tag => `<li><a class="tag" target="${tag}" href="#${tag}">#${tag}</a></li>`).join('');
        photographerFooter.appendChild(photographerTags);
        const contactButton= document.createElement('button');
        contactButton.setAttribute("class", "button contact-button");
        // contactButton.setAttribute("type", "button");
        contactButton.innerText= "Contactez-moi";
        PHOTOGRAPHER_PRESENTATION.appendChild(contactButton);
        const photographerImg= document.createElement('img');
        photographerImg.setAttribute("src", `../assets/images/Photographers-ID-Photos/${this.portrait}`);
        photographerImg.setAttribute("alt", `photo de ${this.name}`);
        PHOTOGRAPHER_PRESENTATION.appendChild(photographerImg);

        // FOOTER
        PHOTOGRAPHER_PRICE.innerText= this.price;
    }
}