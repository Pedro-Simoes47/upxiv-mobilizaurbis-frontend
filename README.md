\# MobilizaUrbis - Front-end (Cliente)



Este repositório contém a aplicação \*\*front-end\*\* do projeto MobilizaUrbis. Este é o "cliente", o site com o qual o cidadão e o administrador interagem.



Esta aplicação é composta por páginas HTML puras, estilizadas com CSS e tornadas dinâmicas com JavaScript (ES6+), que consome a \[API Back-end do MobilizaUrbis](https://github.com/seu-usuario/mobilizaurbis-backend) (hospedada em um repositório separado).



---



\## 🚀 Funcionalidades



O front-end é dividido em duas experiências de usuário distintas:



\### 1. Portal do Cidadão (Público)

Qualquer pessoa pode acessar e enviar relatos anonimamente.



\* \*\*Páginas:\*\* `index.html` (para "Continuar sem Login") e `principal.html`.

\* \*\*Envio de Relato:\*\* Um formulário completo para enviar um novo problema, incluindo:

&nbsp;   \* Seleção de Categoria (pré-carregada do back-end).

&nbsp;   \* Descrição detalhada.

&nbsp;   \* Localização em texto.

\* \*\*Geolocalização Automática:\*\* Um botão que usa a API `navigator.geolocation` do navegador para capturar as coordenadas GPS do usuário e preencher o formulário.

\* \*\*Upload de Fotos:\*\* Interface para selecionar ou tirar uma foto (a lógica de upload real no back-end está pendente).



\### 2. Painel do Administrador (Restrito)

Uma área protegida para gerenciamento dos relatos pela prefeitura.



\* \*\*Páginas:\*\* `index.html` (para Login) e `admin.html`.

\* \*\*Autenticação:\*\* O `script.js` captura o usuário/senha, codifica em Base64 (Basic Auth) e armazena no `sessionStorage` do navegador.

\* \*\*Feed de Relatos:\*\* O `admin.js` busca (`fetch`) todos os relatos do endpoint protegido `GET /api/relatos`, enviando o token de autorização.

\* \*\*Filtro por Categoria:\*\* O administrador pode filtrar o feed para ver apenas relatos de uma categoria específica.

\* \*\*Atualização de Status:\*\* O administrador pode clicar em botões para mudar o status de um relato ("Aberto", "Em Andamento", "Concluído"), disparando uma requisição `PATCH /api/relatos/{id}` para o back-end.



---



\## 🛠️ Tecnologias Utilizadas



Este projeto foi construído intencionalmente com tecnologias web "puras" (vanilla), sem o uso de frameworks.



\* \*\*HTML5:\*\* Para a estrutura de todas as páginas.

\* \*\*CSS3:\*\* Para a estilização (incluindo Flexbox).

\* \*\*JavaScript (ES6+):\*\* Para toda a lógica, manipulação de DOM e interatividade.

\* \*\*Fetch API:\*\* Utilizada para fazer todas as chamadas de API RESTful (GET, POST, PATCH) para o back-end.

\* \*\*Geolocation API:\*\* Para a funcionalidade de "Usar minha localização atual".



---



\## ⚙️ Como Executar Localmente (Importante!)



Este projeto \*\*não\*\* funcionará corretamente se você apenas abrir o `index.html` clicando duas vezes no arquivo (ex: `file:///...`).



Isso acontece por dois motivos:

1\.  \*\*CORS:\*\* O navegador bloqueará as chamadas `fetch` de um `file://` para `http://localhost:8081`.

2\.  \*\*Geolocalização:\*\* A API de GPS do navegador exige um "contexto seguro", que é `https` ou `localhost`.



\### Instruções para Execução Correta:



1\.  \*\*Clone este repositório:\*\*

&nbsp;   ```bash

&nbsp;   git clone \[https://github.com/coxinhamena/mobilizaurbis.git](https://github.com/coxinhamena/mobilizaurbis.git)

&nbsp;   cd mobilizaurbis

&nbsp;   ```



2\.  \*\*Execute o Back-end:\*\*

&nbsp;   Certifique-se de que o seu \[projeto back-end](https://github.com/seu-usuario/mobilizaurbis-backend) esteja em execução no `http://localhost:8081`.



3\.  \*\*Use o Live Server (Recomendado):\*\*

&nbsp;   A forma mais fácil de rodar o front-end é com a extensão \*\*Live Server\*\* no VS Code.

&nbsp;   \* Instale a extensão "Live Server" no VS Code.

&nbsp;   \* No painel de arquivos, clique com o botão direito no arquivo `index.html`.

&nbsp;   \* Selecione \*\*"Open with Live Server"\*\*.



4\.  O seu navegador abrirá automaticamente no endereço `http://127.0.0.1:5500` (ou uma porta similar). Agora, a geolocalização e as chamadas `fetch` para o seu back-end funcionarão perfeitamente.



---



\## 📁

