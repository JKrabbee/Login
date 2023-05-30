document.addEventListener('DOMContentLoaded', async () => {
    const tokenLocal = localStorage.getItem('token')
    const tokenSession = sessionStorage.getItem('token')

    if (!tokenLocal && !tokenSession) {
        window.location.href = '../../index.html'
        return
    }

    const response = await getRecados()
    renderizarPaginacao(response.data.totalPaginas)
});

// LOGOUT DO USUARIO
const btnSair = document.getElementById('btn-sair')

btnSair.addEventListener('click', () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')

    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')

    window.location.href = '../../index.html'
})

async function getRecados(pagina = 1) {
    try {
      const token = sessionStorage.getItem('token');
  
      const response = await apiConfig.get('/recados', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          pagina: pagina
        }
      });
  
      listarRecados(response.data.dados);

      return response

    } catch (error) {
      console.log(error);
    }
  }  

  function listarRecados(response) {
    let tabela = '';
    document.querySelector('#lista-recados-conteudo').innerHTML = '';
    response.forEach(recado => {
      let colunaTitulo = `<td class="coluna-titulo">${recado.titulo}</td>`;
      let colunaDescricao = `<td class="coluna-descricao">${recado.descricao}</td>`;
      let linha = `<tr>${colunaTitulo}${colunaDescricao}</tr>`;
  
      tabela += linha;
  
      document.querySelector('#lista-recados-conteudo').innerHTML = tabela;
    });
  }

  function renderizarPaginacao (response) {

    const paginacao = document.querySelector('#pagination-container')

    for (let i = 1; i <= response; i++) {
      const btn = document.createElement('li')
      
      btn.innerText = i

      btn.addEventListener('click', async () => {
        await getRecados(i)
      })

      paginacao.appendChild(btn)
    }
  }