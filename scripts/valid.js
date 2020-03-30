class validation{
    constructor(formSelector){
        this.form = document.querySelector(formSelector)

        this.form.setAttribute('novalidate', 'novalidate')
    }
    form = this.form;

    getElements(){
        return this.form.querySelectorAll('[required]')
    }

    prepareElements(){
        const elements = this.getElements();

        elements.forEach(el => {
            if(el.nodeName.toLowerCase() === 'input'){
                const type = el.type.toLowerCase()

                switch(type){
                    case 'text':
                        el.addEventListener('input', e => {
                            this.testTextInput(e.target)
                        });
                    break;
                    
                    case 'email':
                        el.addEventListener('input', e => {
                            this.testEmailInput(e.target)
                        });
                    break

                    case 'tel':
                        el.addEventListener('input', e => {
                            this.testTelInput(e.target)
                        });
                    break
                }
            }
        })

        this.form.addEventListener('submit', e => {
            this.checkAndSend(e)
        })
    }
    
    testTextInput(input){
        const pattern = input.pattern;
        let isValid = true;
        
        if(pattern !== null){
            const reg = new RegExp (pattern, 'gi');
            
            if(!reg.test(input.value)){
                isValid = false;
            }
        }
        else{
            if(input.value === ''){
                isValid = false;
            }
        }

        if(isValid){
            this.showFieldValid(input, true);
            return true
        }
        else{
            this.showFieldValid(input, false)
            return false
        }

    }

    testEmailInput(input){
        const pattern = input.pattern;
        const reg = new RegExp(pattern, 'gi');
        let isValid = true;

        if(pattern !== null){

            if(!reg.test(input.value)){
                isValid = false;
            }
        }
        else if(input.value === ''){
            isValid = false;
        }

        if(isValid){
            this.showFieldValid(input, true)
            return true
        }else{
            this.showFieldValid(input, false)
            return false
        }
    }

    testTelInput(input){
        const pattern = input.pattern;
        const reg = new RegExp(pattern);
        let isValid = true;

        if(pattern !== null){
            
            if(!reg.test(input.value)){
                isValid = false;
            }
        }
        else if(input.value === ''){
            isValid = false;
        }

        if(isValid){
            this.showFieldValid(input, true);
            return true
        }
        else{
            this.showFieldValid(input, false)
            return false
        }
        
    }

    showFieldValid(input, isValid){
        if(isValid){
            input.classList.remove('error')
            input.classList.add('no-error')
            input.setAttribute('is-validation', 'true')
        }
        else{
            input.classList.add('error')
            input.classList.remove('no-error')
            input.setAttribute('is-validation', 'false')
        }
    }
    
    checkAndSend(submit){
        submit.preventDefault();
        const elementsToCheck = this.getElements();
        let formErrors = false;
        
        elementsToCheck.forEach(el => {
            const type = el.type.toLowerCase();
            console.log(el.getAttribute('type'))

            if(this.form.getAttribute('novalidate') === 'novalidate'){

                switch(type){
                    case 'text':
                        if(el.getAttribute('is-validation') === 'false'){
                            formErrors = true;
                            el.classList.add('error')
                            el.classList.remove('no-error')
                        }
                    
                    break;

                    case 'email':
                        if(el.getAttribute('is-validation') === 'false'){
                            formErrors = true;
                            el.classList.add('error')
                            el.classList.remove('no-error')
                        }
                    break;

                    case 'tel':
                        if(el.getAttribute('is-validation') === 'false'){
                            formErrors = true;
                            el.classList.add('error')
                            el.classList.remove('no-error')
                        }
                    break;
                }
            }
            
        })
        console.log(formErrors)
        if(!formErrors){
            submit.target.submit();
        }
    }
}

let form1 = new validation('.form')
console.log(form1.prepareElements())