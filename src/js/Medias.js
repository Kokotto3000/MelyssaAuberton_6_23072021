import { PHOTOGRAPHER_MEDIAS } from "./globals";

export class Medias{
    constructor(media){
        this.id= media.id,
        this.photographerId= media.photographerId;
        this.title= media.title;
        this.image= media.image;
        this.video= media.video;
        this.tags= media.tags;
        this.likes= media.likes;
        this.date= media.date;
        this.price= media.price;
    }

    // methode pour l'affichage des medias
    displayPhotographerMedias(id){
        const mediaCard= document.createElement('div');
        if(this.image){
            console.log("image :" + this.image);
            const photo= `<img src="../assets/images/${id}/${this.image}" alt="" />`;
            mediaCard.innerHTML= photo;
        } 
        else if(this.video){
            console.log("video :" + this.video);
            const video= `<video controls><source src="../assets/images/${id}/${this.video}" alt="" /></video>`;
            mediaCard.innerHTML= video;
        } 
        PHOTOGRAPHER_MEDIAS.appendChild(mediaCard);
    }
}