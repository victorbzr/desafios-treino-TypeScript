"use strict";
// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela
// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction
//var apiKey = '21f3c06cbeb3f673b9f95053d7bd4944';
let apiKey;
let requestToken;
let username;
let password;
let sessionId;
let listId = '7101979';
let loginButton = document.getElementById('login-button');
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');
loginButton === null || loginButton === void 0 ? void 0 : loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarRequestToken();
    yield logar();
    yield criarSessao();
}));
searchButton === null || searchButton === void 0 ? void 0 : searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = document.getElementById('search');
    let listaDeFilmes = yield procurarFilme(query.value);
    let ul = document.createElement('ul');
    ul.id = "lista";
    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title));
        ul.appendChild(li);
    }
    console.log(listaDeFilmes);
    if (searchContainer)
        searchContainer.appendChild(ul);
}));
function preencherSenha() {
    let pass = document.getElementById('senha');
    password = pass.value;
    validateLoginButton();
}
function preencherLogin() {
    let user = document.getElementById('login');
    username = user.value;
    validateLoginButton();
}
function preencherApi() {
    let key = document.getElementById('api-key');
    apiKey = key.value;
    validateLoginButton();
}
function validateLoginButton() {
    if (loginButton)
        if (password && username && apiKey && password.length >= 4) {
            console.log(password, username, apiKey);
            loginButton.disabled = false;
        }
        else {
            loginButton.disabled = true;
        }
}
class HttpClient {
    static get({ url, method, body = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open(method, url, true);
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        resolve(JSON.parse(request.responseText));
                    }
                    else {
                        reject({
                            status: request.status,
                            statusText: request.statusText
                        });
                    }
                };
                request.onerror = () => {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                };
                if (body) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    body = JSON.stringify(body);
                }
                request.send(body);
            });
        });
    }
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
        return result;
    });
}
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
            method: "GET"
        });
        console.log(result);
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('criando request token');
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
            method: "GET"
        });
        console.log('retornando resultado');
        requestToken = result.request_token;
        console.log('request token retornada', requestToken);
    });
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('iniciando login');
        yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: {
                username: `${username}`,
                password: `${password}`,
                request_token: `${requestToken}`
            }
        });
        console.log('login realizado');
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('criando sessão');
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
            method: "GET"
        });
        console.log('sessão criada');
        sessionId = result.session_id;
        console.log('id da sessão retornado', sessionId);
    });
}
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                name: nomeDaLista,
                description: descricao,
                language: "pt-br"
            }
        });
        console.log('resultadao:', result);
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
            method: "POST",
            body: {
                media_id: filmeId
            }
        });
        console.log(result);
    });
}
function pegarLista() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
            method: "GET"
        });
        console.log(result);
    });
}
{ /* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/
}
