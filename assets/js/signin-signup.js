document.addEventListener('DOMContentLoaded', () => {
    const maincontainer = document.querySelector('#main-container-body');
    const signin = document.querySelector('#signin');
    const signup = document.querySelector('#signup');

    // default render
    renderSignIn();

    signin.addEventListener('click', () => {
        toggleActive(signin, signup);
        renderSignIn();
    });

    signup.addEventListener('click', () => {
        toggleActive(signup, signin);
        renderSignUp();
    });

    function toggleActive(activeButton, inactiveButton) {
        activeButton.parentElement.classList.add('active');
        inactiveButton.parentElement.classList.remove('active');
    }

    function renderSignIn() {
        // Limpa o container
        maincontainer.innerHTML = ''; // Limpa o conteúdo existente
        
        // Criação dos elementos do formulário Sign In
        const mainTextDiv = document.createElement('div');
        mainTextDiv.className = 'main-text';

        const heading = document.createElement('h4');
        heading.className = 'text-center mt-3';
        heading.textContent = 'BEM VINDO DE VOLTA';

        const paragraph = document.createElement('p');
        paragraph.className = 'text-center text-muted';
        paragraph.textContent = 'Faça login em sua conta existente para continuar doando';

        const form = document.createElement('form');
        form.className = 'sign-in';

        const emailDiv = createSingleInputField('email', 'Email', 'email');
        const passwordDiv = createSingleInputField('password', 'Senha', 'password');
        
        const wrapBtnDiv = document.createElement('div');
        wrapBtnDiv.className = 'wrap-btn';
        
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'btn btn-orange btn-lg';
        submitButton.textContent = 'ENTRAR';
        submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            if(form.checkValidity())
                if (authenticateUser({ email: emailDiv.querySelector('input').value, password: passwordDiv.querySelector('input').value }))
                {
                    window.location="carrinho.html";
                }
                else {
                    showModalWithTimeout('Usuário não encontrado', 3000);
                }
        })

        wrapBtnDiv.appendChild(submitButton);

        mainTextDiv.appendChild(heading);
        mainTextDiv.appendChild(paragraph);
        form.appendChild(emailDiv);
        form.appendChild(passwordDiv);
        form.appendChild(wrapBtnDiv);
        
        maincontainer.appendChild(mainTextDiv);
        maincontainer.appendChild(form);
    }

    function renderSignUp() {
        // Limpa o container
        maincontainer.innerHTML = '';

        const mainTextDiv = document.createElement('div');
        mainTextDiv.className = 'main-text';

        const heading = document.createElement('h4');
        heading.className = 'text-center mt-3';
        heading.textContent = 'Qual tipo de cadastro?';

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';

        const buttonIndividual = document.createElement('button');
        buttonIndividual.type = 'button';
        buttonIndividual.className = 'btn btn-orange btn-lg';
        buttonIndividual.textContent = 'Pessoa Física';
        buttonIndividual.addEventListener('click', () => {
            renderRegistrationForm('Individual');
        });

        const buttonCompany = document.createElement('button');
        buttonCompany.type = 'button';
        buttonCompany.className = 'btn btn-orange btn-lg';
        buttonCompany.textContent = 'Empresa';
        buttonCompany.addEventListener('click', () => {
            renderRegistrationForm('Enterprise');
        });

        mainTextDiv.appendChild(heading);
        optionsDiv.appendChild(buttonIndividual);
        optionsDiv.appendChild(buttonCompany);
        
        maincontainer.appendChild(mainTextDiv);
        maincontainer.appendChild(optionsDiv);
    }

    function renderRegistrationForm(type) {
        maincontainer.innerHTML = ''; // Limpa o conteúdo existente

        const mainTextDiv = document.createElement('div');
        mainTextDiv.className = 'main-text';

        const heading = document.createElement('h4');
        heading.className = 'text-center mt-3';
        heading.textContent = 'Novo na S.C.S?';

        const paragraph = document.createElement('p');
        paragraph.className = 'text-center text-muted';
        paragraph.textContent = 'Crie uma conta nova para finalizar as doações com mais rapidez e receba recompensas';

        const form = document.createElement('form');
        form.className = 'sign-up';

        
        const nameDiv = type == 'Individual'? createSingleInputField('name', 'Nome', 'text') : createSingleInputField('name', 'Razão Social', 'text')
        const cpfDiv = type == 'Individual'? createSingleInputField('cpf', 'CPF', 'number') : createSingleInputField('cpf', 'CNPJ', 'number')
        const birthDateDiv = createSingleInputField('birth-date', 'Data de Nascimento', 'date');
        const phoneDiv = createSingleInputField('phone', 'Telefone', 'text');

        const emailWrap = createDoubleInputField('email', 'Email', 'email', 'email-confirm', 'Confirmar email');
        const passwordWrap = createDoubleInputField('password', 'Senha', 'password', 'password-confirm', 'Confirmar senha');

        const wrapBtnDiv = document.createElement('div');
        wrapBtnDiv.className = 'wrap-btn';

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.className = 'btn btn-orange btn-lg';
        submitButton.textContent = 'Cadastrar';
        submitButton.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            debugger
            if(form.checkValidity()) {
                switch(type) {
            
                    case 'Individual':
                        createUser({ 
                            type,
                            data: { 
                                email: emailWrap.querySelector('#email').value, 
                                password: passwordWrap.querySelector('#password').value, 
                                name: nameDiv.querySelector('#name').value, 
                                cpf: cpfDiv.querySelector('#cpf').value, 
                                birthDate: birthDateDiv.querySelector('#birth-date').value, 
                                phone: phoneDiv.querySelector('#phone').value 
                            }
                        });
                        break;
                    case 'Enterprise':
                        createUser({ 
                            type,
                            data: { 
                                email: emailWrap.querySelector('#email').value, 
                                password: passwordWrap.querySelector('#password').value, 
                                name: nameDiv.querySelector('#name').value, 
                                cnpj: cpfDiv.querySelector('#cpf').value, 
                                phone: phoneDiv.querySelector('#phone').value 
                            }
                        });
                        break;
                }

                showModalWithTimeout('Usuário cadastrado com sucesso!', 3000);
                renderSignIn();
                toggleActive(signin, signup);
            }
        });

        wrapBtnDiv.appendChild(submitButton);

        mainTextDiv.appendChild(heading);
        mainTextDiv.appendChild(paragraph);
        form.appendChild(nameDiv);
        form.appendChild(cpfDiv);
        form.appendChild(birthDateDiv);
        form.appendChild(phoneDiv);
        form.appendChild(emailWrap);
        form.appendChild(passwordWrap);
        form.appendChild(wrapBtnDiv);
        
        maincontainer.appendChild(mainTextDiv);
        maincontainer.appendChild(form);
    }

    function createSingleInputField(id, labelText, inputType) {
        const div = document.createElement('div');
        div.className = 'mb-3 single';

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.className = 'form-label';
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;
        input.className = 'form-control';
        input.id = id;
        input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        return div;
    }

    function createDoubleInputField(id1, labelText1, inputType1, id2, labelText2) {
        const wrapDiv = document.createElement('div');
        wrapDiv.className = 'wrap-input';

        const div1 = createSingleInputField(id1, labelText1, inputType1);
        const div2 = createSingleInputField(id2, labelText2, inputType1);

        div1.classList.remove('single')
        div1.classList.add('duo')

        div2.classList.remove('single')
        div2.classList.add('duo')
        
        wrapDiv.appendChild(div1);
        wrapDiv.appendChild(div2);
        return wrapDiv;
    }

});

// Function to create and display the modal
function showModalWithTimeout(message, timeout) {
    // Create modal HTML structure using template literals
    const modalHTML = `
        <div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append modal to the body
    document.querySelector('body').insertAdjacentHTML('beforeend', modalHTML);

    // Initialize the modal using Bootstrap's modal API
    const modalElement = document.getElementById('dynamicModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);

    // Show the modal
    bootstrapModal.show();

    // Hide the modal after the specified timeout
    setTimeout(() => {
        bootstrapModal.hide();

        // Remove the modal from the DOM after it’s hidden
        modalElement.addEventListener('hidden.bs.modal', () => {
            modalElement.remove();
        });
    }, timeout);
}

showModalWithTimeout('This is a dynamically created modal.', 3000);
