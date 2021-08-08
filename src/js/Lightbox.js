import { LIGHTBOX } from "./globals";

export class Lightbox{
    constructor(array){
        this.lightbox= LIGHTBOX;
        this.slider= array;
    }
    displayLightbox(index){
        this.index= index;
        if(this.slider[this.index].image){
            this.lightbox.innerHTML= `<div class='lightbox-content'><button class="lightbox-content__close-button" aria-label="Close dialog"></button><figure><img src="../assets/images/${this.slider[this.index].photographerId}/${this.slider[this.index].image}" alt="${this.slider[this.index].alt}" /><figcaption>${this.slider[this.index].title}</figcaption></figure><div role="link" class="lightbox-content__previous-button" aria-label="Previous image"></div><div role="link" class="lightbox-content__next-button" aria-label="Next image"></div></div>`;
        }else if(this.slider[this.index].video){
            this.lightbox.innerHTML= `<div class='lightbox-content'><button class="lightbox-content__close-button" aria-label="Close dialog"></button><video controls><source src="../assets/images/${this.slider[this.index].photographerId}/${this.slider[this.index].video}" alt="${this.slider[this.index].alt}" /><figcaption>${this.slider[this.index].title}</figcaption></video><div role="link" class="lightbox-content__previous-button" aria-label="Previous image"></div><div role="link" class="lightbox-content__next-button" aria-label="Next image"></div></div>`;
        }
        
        const LIGHTBOX_CLOSE= document.querySelector('.lightbox-content__close-button').addEventListener('click', ()=> {
            LIGHTBOX.style.display= "none";
        });
        const LIGHTBOX_PREVIOUS= document.querySelector('.lightbox-content__previous-button').addEventListener('click', ()=> {
            // console.log('previous');
            this.index <= 0 ? this.index= this.slider.length - 1 : this.index--;
            this.displayLightbox(this.index);
        });
        const LIGHTBOX_NEXT= document.querySelector('.lightbox-content__next-button').addEventListener('click', ()=> {
            // console.log('next');
            // this.index++;
            this.index >= this.slider.length - 1 ? this.index= 0 : this.index++;
            this.displayLightbox(this.index);
        });
    }
}