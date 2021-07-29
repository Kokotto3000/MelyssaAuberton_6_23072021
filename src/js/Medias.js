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
    displayPhotographerMedias(id, filterType, filter){
        if(!filter){
            if(this.image){
                this.displayPhoto(id);
            } 
            else if(this.video){
                this.displayVideo(id);
            }
        }else{
            switch(filterType){
                case 'tagFilter' :
                    if(this.image && this.tags[0] === filter){
                        this.displayPhoto(id);
                    }
                    else if(this.video && this.tags[0] === filter){
                        this.displayVideo(id);
                    }
                    break;
                case "dropdownFilter" :
                    switch(filter){
                        case "popularité" :
                            console.log("popularité");
                            break;
                        case "date" :
                            console.log("date");
                        case "blabla" :
                            console.log("l'autre");
                        default :
                            console.log("tout");
                    }
                default :
                    console.log("default");
            }
        }
    }

    displayPhoto(id){
        const mediaCard= document.createElement('div');
        // console.log("image :" + this.image);
        const photo= `<img src="../assets/images/${id}/${this.image}" alt="" />`;
        mediaCard.innerHTML= photo;
        PHOTOGRAPHER_MEDIAS.appendChild(mediaCard);
    }

    displayVideo(id){
        const mediaCard= document.createElement('div');
        // console.log("video :" + this.video);
        const video= `<video controls><source src="../assets/images/${id}/${this.video}" alt="" /></video>`;
        mediaCard.innerHTML= video;
        PHOTOGRAPHER_MEDIAS.appendChild(mediaCard);
    }
}