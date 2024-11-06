function createUser({ 
        type, 
        data: { 
            email, password, name, cnpj, cpf, birthDate, phone 
        } 
    }) {
    
    var user;
    switch(type) {
        case 'Individual':
            user = {
                type,
                name,
                cpf,
                birthDate,
                phone,
                email,
                password
            }
        case 'Enterprise':
            user = {
                type,
                name,
                cnpj,
                phone,
                email,
                password
            }
    }  

    storeUser(user);
}

function storeUser(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUser(email){
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

function authenticateUser({ email, password }) {
    const user = getUser(email);
    if(user && user.password === password) {
        sessionStorage.setItem('user', JSON.stringify(user));
        return user;
    }
    return null;
}