document.addEventListener('DOMContentLoaded', async () => {
    const tokenLocal = localStorage.getItem('token')
    const tokenSession = sessionStorage.getItem('token')

    if (!tokenLocal && !tokenSession) {
        window.location.href = '../../index.html'
        return
    }

    getRecados()
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

let paginaAtual = 1; // Página atual inicial
const recadosPorPagina = 5; // Quantidade de recados por página

async function getRecados() {
  try {
    const token = sessionStorage.getItem('token');
    const response = await apiConfig.get('/recados', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const recados = response.data.dados.reverse();
    const paginasTotais = Math.ceil(recados.length / recadosPorPagina);

    mostrarRecados(recados, paginaAtual, paginasTotais);

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function mostrarRecados(recados, paginaAtual, paginasTotais) {
  const indiceInicio = (paginaAtual - 1) * recadosPorPagina;
  const indiceFim = paginaAtual * recadosPorPagina;
  const recadosPagina = recados.slice(indiceInicio, indiceFim);

  let tabela = '';

  recadosPagina.forEach(recado => {
    let colunaTitulo = `<td class="coluna-titulo">${recado.titulo}</td>`;
    let colunaDescricao = `<td class="coluna-descricao">${recado.descricao}</td>`;
    let linha = `<tr>${colunaTitulo}${colunaDescricao}</tr>`;

    tabela += linha;
  });

  document.getElementById('lista-recados-conteudo').innerHTML = tabela;

  mostrarPaginacao(paginaAtual, paginasTotais);
}

function mostrarPaginacao(paginaAtual, paginasTotais) {
  let paginacao = '';

  for (let pagina = 1; pagina <= paginasTotais; pagina++) {
    if (pagina === paginaAtual) {
      paginacao += `<li class="pagina-atual">${pagina}</li>`;
    } else {
      paginacao += `<li onclick="selecionarPagina(${pagina})">${pagina}</li>`;
    }
  }

  document.getElementById('pagination-container').innerHTML = paginacao;
}

function selecionarPagina(pagina) {
  paginaAtual = pagina;
  getRecados();
}