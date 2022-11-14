
<h1 align="center">Posts Backend GraphQL</h1>
---

<p align="justify">
  Backend construído a partir das aulas do <a href="https://www.udemy.com/course/curso-de-graphql-e-apollo-server-client/">Curso de GraphQL e Apollo Server + Apollo Client</a>. 
  É um projeto simples mas explora bastantes conceitos acerca do uso do GraphQL,  Apollo Server e Node. 
  O projeto é um pequeno sistema de blog onde é possível criar, editar, deletar e comentar posts.
</p>

<p align="center">
 <a href="#sobre-o-projeto">Sobre o projeto</a> |
 <a href="#como-usar">Como usar</a>
</p>

<h4 align="center">
	 Status: Finalizado
</h4>
 
### Sobre o projeto💻

 Este é o repositório da aplicação backend. Sua principal função é prover dados e serviços indispensáveis para o funcionamento do projeto [Posts frontend](https://github.com/willyoliv/posts-frontend) . 

#### Feature

- [X] Cadastro de usuário
- [X] Login
- [X] Logout
- [X] Editar perfil de usuário
- [X] Apagar perfil de usuário
- [X] Cadastro de posts
- [X] Editar post
- [X] Deletar post
- [X] Listagem de posts
- [X] Obter detalhes de um post
- [X] Comentar post

#### Tecnologias🚀

As seguintes ferramentas foram usadas na construção do projeto:

- [X] [Node](https://nodejs.org/pt-br/)
- [X] [GraphQL](https://graphql.org/).
- [X] [Apollo Client](https://www.apollographql.com/docs/apollo-server/)

##### Auxiliares

- [x] [Knex](https://knexjs.org/) - Usado para a construção do banco de dados;
- [X] [Docker](https://www.docker.com/) - Usado para subir o banco local;

##### Padronização de código:

- [x] [ESLint](https://eslint.org/);
- [x] [Prettier](https://prettier.io/).

---

### Como usar
#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Docker](https://www.docker.com/) . Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

##### Clone este repositório
```bash
git clone https://github.com/willyoliv/posts-backend-graphql.git
```
##### Após clonar, acesse as pastas do projeto no terminal/cmd e instale as dependências
```bash
cd posts-backend-graphql
npm install
# ou npm i
```

##### Primeiro é necessário iniciar o banco de dados
```bash
docker-compose up
```

##### Para executar o projeto rode os seguintes comandos
```bash
npm run server
npm run dev
```

**Obs:** O projeto irá por padrão rodar em `http://localhost:4000`

---
