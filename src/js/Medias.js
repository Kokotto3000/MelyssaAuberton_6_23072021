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
        console.log(media);
    }

    // methode pour l'affichage des medias
    displayPhotographerMedias(id, filter){
        if(!filter){
            if(this.image){
                this.displayPhoto(id);
            } 
            else if(this.video){
                this.displayVideo(id);
            }
        }else{
            if(this.image && this.tags[0] === filter){
                this.displayPhoto(id);
            }
            else if(this.video && this.tags[0] === filter){
                this.displayVideo(id);
            }
        }
    }

    displayPhoto(id){
        const mediaCard= document.createElement('div');
        // console.log("image :" + this.image);
        const photo= `<img src="../assets/images/${id}/${this.image}" alt="" />`;
        const legend= `<div><p>${this.title}</p><p><span>${this.likes}</span><svg aria-hidden="false" focusable="true" data-prefix="far" data-icon="heart" class="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30">
        <path d="M259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg></p></div>`;
        mediaCard.innerHTML= photo + legend;
        PHOTOGRAPHER_MEDIAS.appendChild(mediaCard);
    }

    displayVideo(id){
        const mediaCard= document.createElement('div');
        // console.log("video :" + this.video);
        const video= `<video controls><source src="../assets/images/${id}/${this.video}" alt="" /></video>`;
        const legend= `<div><p>${this.title}</p><p><span>${this.likes}</span><svg aria-hidden="false" focusable="true" data-prefix="far" data-icon="heart" class="heart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="30">
        <path d="M259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg></p></div>`;
        mediaCard.innerHTML= video + legend;
        PHOTOGRAPHER_MEDIAS.appendChild(mediaCard);
    }
}