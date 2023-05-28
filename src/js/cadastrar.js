const formElement = document.querySelector('form')

formElement.addEventListener('submit', async (event) => {
    event.preventDefault()

    const emailValue = formElement.email.value
    const senhaValue = formElement.senha.value
    const repetirSenhaValue = formElement.repetirSenha.value

    const emailValido = validarPreenchiemto(emailValue)
    const senhaValida = validarPreenchiemto(senhaValue)
    const repetirSenhaValida = validarPreenchiemto(repetirSenhaValue)

    if (!emailValido || !senhaValida || !repetirSenhaValida){
        alert('Preencha todos os campos corretamente!')
        return
    }

    if (!validarSenhas(senhaValue, repetirSenhaValue)){
        alert('As senhas não coincidem!')
        return
    }

    const novoUsuario = {
        email: emailValue,
        password: senhaValue
    }

    const cadastrado = await cadastrarUsuario(novoUsuario)

    if (cadastrado) {
        formElement.email.value = '';
        formElement.senha.value = '';
        formElement.repetirSenha.value = '';
    } else {
        formElement.senha.value = '';
        formElement.repetirSenha.value = '';
    }
    
})

async function cadastrarUsuario(novoUsuario) {
    try {
        const response = await apiConfig.post('/usuarios/cadastrar', novoUsuario)
        
        alert(response.data.mensagem)

        window.location.href = '../../index.html'

        return true
    } catch (error) {
        alert(error.response.data.mensagem);

        return false
    }
}