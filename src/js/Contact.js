import { FORM } from "./globals";

export class Contact {
    constructor(){
        this.checkString= /^[a-zA-Z]{2}/;
        this.checkMail= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        this.checkMessage= /^[\s\S]{30,}/;
        this.inputs= FORM.elements;
        this.input= "";
        this.error= "";
        this.messages= document.querySelectorAll('.message');
    }

    getInputs(input){        
        return this.inputs[input];
    }

    stringValidation(type){
        switch (type) {
            case "first" :
                this.input= this.inputs['first'];
                this.error= document.getElementById('error-first');
                break;
            case "last" :
                this.input= this.inputs['last'];
                this.error= document.getElementById('error-last');
                break;
            default :
                console.log("validation type error");
        }
        if(!this.checkString.test(this.input.value.trim())){
            //style modification, error message
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
            this.input.setAttribute("aria-invalid", "true");
            if(this.error.id === "error-first") this.error.innerText= "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
            else if(this.error.id === "error-last") this.error.innerText= "Veuillez entrer 2 caractères ou plus pour le champ du nom."
            this.error.classList.add('span-error');
            return false;
        }else{
            // console.log(this.input.value);
            this.input.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.setAttribute("aria-invalid", "false");
            this.error.classList.remove('span-error');
            this.error.innerText= "";
            return true;
        }
    }

    emailValidation(){
        this.input= this.inputs['email'];
        this.error= document.getElementById('error-email');
        if(!this.checkMail.test(this.input.value.trim())){
            this.error.innerText= "Vous devez entrer une adresse email valide.";
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
            this.input.setAttribute("aria-invalid", "true");
            this.error.classList.add('span-error');
            return false;
        }
        else{
            this.input.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.setAttribute("aria-invalid", "false");
            this.error.classList.remove('span-error');
            this.error.innerText= "";
            return true;
        }
    }

    messageValidation(){
        this.input= this.inputs['message'];
        this.error= document.getElementById('error-message');
        if(!this.checkMessage.test(this.input.value.trim())){
            this.error.innerText= "Votre message doit faire au moins 30 caractères.";
            this.input.classList.remove('valid');
            this.input.classList.add('invalid');
            this.input.setAttribute("aria-invalid", "true");
            this.error.classList.add('span-error');
            return false;
        }
        else{
            this.input.classList.remove('invalid');
            this.input.classList.add('valid');
            this.input.setAttribute("aria-invalid", "false");
            this.error.classList.remove('span-error');
            this.error.innerText= "";
            return true;
        }
    }

    resetForm(){
        FORM.reset();
        for(let input of this.inputs){
            input.classList.remove('valid');
            input.classList.remove('invalid');
        }
        this.messages.forEach(message => {
            message.innerText= "";
            message.classList.remove('span-error');
        });
    }

}
