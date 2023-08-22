/*// Obtém elementos do HTML
const recadosContainer = document.getElementById('recados');
const paginationContainer = document.getElementById('pagination');
const loginForm = document.querySelector('.login-container'); // Seleciona o formulário de login

let currentPage = 1;
const recadosPerPage = 3; // Número de recados por página

// Função para lidar com o login
function handleLogin(email, senha) {
    axios.post('https://apirecados.onrender.com/login', { email, senha })
        .then(response => {
            
            const data = response.data;
            if (data.message === 'Login bem-sucedido') {
                // Se o login for bem-sucedido, exiba os recados
                fetchRecados(currentPage);
            } else {
                // Se o login falhar, exiba uma mensagem de erro
                alert('Credenciais inválidas');
            }
        })
        .catch(error => console.error('Erro ao fazer login:', error));
}

// Adicione um ouvinte de evento de clique ao botão de login
const loginButton = document.querySelector('.login-button'); // Substitua '.login-button' pelo seletor correto
loginButton.addEventListener('click', (e) => {
    e.preventDefault(); // Evita que o formulário seja enviado (comportamento padrão do botão dentro de um formulário)

    // Obtenha os valores de email e senha dos campos de entrada
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    // Chame a função de login
    handleLogin(email, senha);
});

// Função para buscar os recados
function fetchRecados(page) {
    axios.get(`/recados?page=${page}`)
        .then(response => {
            console.log(response);
            const data = response.data;
            displayRecados(data.recados);
            displayPagination(data.numeroDePaginas, page);
        })
        .catch(error => console.error('Erro ao buscar recados:', error));
}

// Função para exibir os recados
function displayRecados(recados) {
    recadosContainer.innerHTML = '';
    recados.forEach(recado => {
        const recadoItem = document.createElement('li'); // Usar <li> em vez de <div>
        recadoItem.textContent = recado.titulo + ': ' + recado.descricao;
        recadosContainer.appendChild(recadoItem);
    });

    // Exibe a lista de recados após o login
    recadosContainer.style.display = 'block';
    paginationContainer.style.display = 'block';
}

// Função para exibir a paginação
function displayPagination(totalPages, currentPage) {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        if (i === currentPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            currentPage = i;
            fetchRecados(currentPage);
        });

        paginationContainer.appendChild(button);
    }
}*/
const recadosDiv = document.getElementById('recados');
const previousPageButton = document.getElementById('previousPage');
const nextPageButton = document.getElementById('nextPage');

let currentPage = 1;

const itemsPerPage = 3; // Número de recados por página

// Função para carregar os recados da página atual
function loadRecados(page) {
    console.log(`Fetching data for page ${page}`);
    axios
        .get(`https://apirecados.onrender.com/recados?page=${page}`)
        .then(response => {
            const data = response.data;
            recadosDiv.innerHTML = '';
            data.recados.forEach(recado => {
                const recadoElement = document.createElement('div');
                recadoElement.innerHTML = `
                    <h2>${recado.titulo}</h2>
                    <p>${recado.descricao}</p>
                `;
                recadosDiv.appendChild(recadoElement);
            });

            previousPageButton.disabled = currentPage === 1;
            nextPageButton.disabled = currentPage === data.numeroDePaginas;
        })
        .catch(error => console.error(error));
}

// Carrega os recados da página inicial
loadRecados(currentPage);

// Listener para o botão "Página Anterior"
previousPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadRecados(currentPage);
    }
});

// Listener para o botão "Próxima Página"
nextPageButton.addEventListener('click', () => {
    currentPage++;
    loadRecados(currentPage);
});









// Inicialmente, busque os recados da primeira página

/*
<!-- ... Seu código HTML anterior ... -->

<script>
    const recadosContainer = document.getElementById('recados');
    const paginationContainer = document.getElementById('pagination');
    const recadosPerPage = 3; // Número de recados por página
    let currentPage = 1;

    // Recados (substitua isso pelos seus próprios dados ou chame a API)
    const recados = [
        "Recado 1: Este é o primeiro recado.",
        "Recado 2: Este é o segundo recado.",
        "Recado 3: Este é o terceiro recado.",
        "Recado 4: Este é o quarto recado.",
        "Recado 5: Este é o quinto recado."
    ];

    function displayRecados(page) {
        const startIndex = (page - 1) * recadosPerPage;
        const endIndex = startIndex + recadosPerPage;
        const recadosPaginados = recados.slice(startIndex, endIndex);

        recadosContainer.innerHTML = '';
        recadosPaginados.forEach(recado => {
            const recadoItem = document.createElement('li');
            recadoItem.textContent = recado;
            recadosContainer.appendChild(recadoItem);
        });
    }

    function displayPagination() {
        const totalPages = Math.ceil(recados.length / recadosPerPage);

        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                displayRecados(currentPage);
            });

            paginationContainer.appendChild(button);
        }
    }

    // Inicialmente, exiba os recados da primeira página e a paginação
    displayRecados(currentPage);
    displayPagination();
</script>
</body>
</html>*/
