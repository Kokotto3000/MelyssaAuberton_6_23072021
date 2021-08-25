import { LIGHTBOX, PHOTOGRAPHER_MEDIAS, tabbableElements, keepFocus} from "./globals";

export class Lightbox{
    constructor(array){
        this.lightbox= LIGHTBOX;
        this.slider= array;
    }

    displayLightbox(index){
        this.index= index;        
        
        if(this.slider[this.index].image){
            this.lightbox.innerHTML= `<div class='lightbox-content'><figure><img tabindex="0" src="../assets/images/${this.slider[this.index].photographerId}/${this.slider[this.index].image}" alt="${this.slider[this.index].alt}" /><figcaption tabindex="0">${this.slider[this.index].title}</figcaption></figure><button role="button" class="lightbox-content__previous-button" aria-label="Previous image"></button><button role="button" class="lightbox-content__next-button" aria-label="Next image"></button><button role="button" class="lightbox-content__close-button" aria-label="Close dialog"></button></div>`;
        }else if(this.slider[this.index].video){
            this.lightbox.innerHTML= `<div class='lightbox-content'><figure><video tabindex= "0" controls><source src="../assets/images/${this.slider[this.index].photographerId}/${this.slider[this.index].video}" alt="${this.slider[this.index].alt}" /><track default kind="captions" srclang="fr" src="../assets/track.vtt" /><p>Votre navigateur ne peut pas lire les videos...</p></video><figcaption tabindex="0">${this.slider[this.index].title}</figcaption></figure><button role="button" class="lightbox-content__previous-button" aria-label="Previous image"></button><button role="button" class="lightbox-content__next-button" aria-label="Next image"></button><button role="button" class="lightbox-content__close-button" aria-label="Close dialog"></button></div>`;            
        }

        // console.log(this.lightbox);
        keepFocus(this.lightbox);
        this.lightbox.focus();
        const LIGHTBOX_CLOSE= document.querySelector('.lightbox-content__close-button').addEventListener('click', ()=> {
            this.lightbox.style.display= "none";
            this.lightbox.setAttribute("aria-modal", "false");
            PHOTOGRAPHER_MEDIAS.firstChild.children[0].focus();

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

        document.addEventListener('keydown', e => {
            if(e.code === "ArrowRight"){
                this.index >= this.slider.length - 1 ? this.index= 0 : this.index++;
                this.displayLightbox(this.index);
            }else if(e.code === "ArrowLeft"){
                this.index <= 0 ? this.index= this.slider.length - 1 : this.index--;
                this.displayLightbox(this.index);
            }else if(e.code === "Escape"){
                this.lightbox.style.display= "none";
                this.lightbox.setAttribute("aria-modal", "false");
                // console.log(PHOTOGRAPHER_MEDIAS.firstChild);
                PHOTOGRAPHER_MEDIAS.firstChild.children[0].focus();
            }
        });

    }

    
}