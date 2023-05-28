const formElement = document.querySelector('form');

formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const emailValue = formElement.email.value
    const senhaValue = formElement.senha.value
    const permanecerLogado = formElement.remember.checked

    const emailValido = validarPreenchiemto(emailValue)
    const senhaValida = validarPreenchiemto(senhaValue)

    if (!emailValido || !senhaValida){
        alert('Preencha todos os campos corretamente!')
        return
    }

    const usuario = {
        email: emailValue,
        password: senhaValue
    }

    const login = await Login(usuario, permanecerLogado)

    if (login) {
        formElement.email.value = '';
        formElement.senha.value = '';
    } else {
        formElement.senha.value = '';
    }
})

async function Login(usuario, permanecerLogado) {
    try {
        const response = await apiConfig.post('/usuarios/login', usuario)

        console.log(response);
        if (permanecerLogado) {
            localStorage.setItem('token', response.data.dados.token)
            localStorage.setItem('email', response.data.dados.email)
        } else {
            sessionStorage.setItem('token', response.data.dados.token)
            sessionStorage.setItem('email', response.data.dados.email)
        }

        window.location.href = './src/html/home.html'

        return true
    } catch (error) {
        alert(error.response.data.mensagem);
        return false
    }
}