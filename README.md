<div align="center"> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" height="80px"/> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="80px"/> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="80px"/> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="80px"/> 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" height="80px"/> 
</div>

<br />

Este software está hospedado em: https://simples-crud-challenge.onrender.com

Este projeto demonstra minhas habilidades nas seguintes tecnologias: [React](https://react.dev/), [NodeJS](https://nodejs.org/en),[TypeScript](https://www.typescriptlang.org/), e [PostgreSQL](https://www.postgresql.org/). Ele foi desenvolvido como parte de um desafio de seleção para um estágio e foi concluído em apenas uma semana, destacando minha capacidade de aprendizado rápido e habilidades de desenvolvimento ágil.

O objetivo do projeto era criar um aplicativo CRUD (Create Read Update Delete) envolvendo a criação, modificação e apresentação de produtos. Além disso, houve três desafios adicionais: a implementação de um widget de paginação do zero, a criação de duas telas adicionais - uma para exibir os três produtos mais caros e outra para mostrar os três produtos com maior estoque. O projeto também exigia a conformidade com a estrutura específica de um produto.

Tive sucesso na resolução de todos os desafios propostos, sendo o widget de paginação o mais complexo deles. Após algum tempo, decidi aprimorar ainda mais o projeto, migrando-o para TypeScript e integrando-o com um banco de dados PostgreSQL. Anteriormente, o aplicativo usava um array em memória para armazenar os produtos por questões de simplicidade.

Na busca por melhorias na apresentação visual do site, optei por substituir grande parte do StyledComponents pelo uso do [picoCSS](https://picocss.com/), proporcionando uma experiência de usuário mais agradável e uma implementação de estilo mais eficiente.

Por fim, a aplicação foi hospedada com sucesso no serviço de hospedagem do [Render](https://render.com/), abrangendo tanto o servidor quanto o banco de dados, demonstrando minha habilidade em implantar e gerenciar projetos em ambiente de produção.

# Estrutura do código fonte

-   Pasta raiz/
    -   [index.ts](https://github.com/odecam0/desafio-thummi/blob/main/index.ts)
        -\> Código fonte do servidor, utilizando
        [Express.js](https://expressjs.com/), e queries para o
        [PostgreSQL](https://www.postgresql.org/) utilizando o pacote
        [Postgres](https://github.com/porsager/postgres)
    -   [db.mjs](https://github.com/odecam0/desafio-thummi/blob/main/db.mjs)
        -\> Modulo que conecta no banco de dados e exporta um objeto
        para acessá-lo
    -   client/
        -   src/ -\> Pasta com o código fonte do Front-End utilizando
            [React](https://react.dev/)
            -   [App.js](client/src/App.js) -\> Arquivo com componente
                da barra de navegação utilizando
                [react-router-dom](https://reactrouter.com/en/main).
            -   [RegisterProduct.tsx](client/src/RegisterProduct.tsx)
                -\> Componente com formulário para registro de um
                produto
            -   [ModifyProduct.tsx](client/src/ModifyProduct.tsx) -\>
                Componente com formulário para modificação de um produto
            -   [ShowProducts.tsx](client/src/ShowProducts.tsx) -\>
                Componente que exibe produtos cadastrados, utiliza
                componente de paginação que foi desenvolvido
            -   [PaginationWidget.tsx](client/src/PaginationWidget.tsx)
                -\> Componente de paginação genérico
            -   [ExpensiveProducts.tsx](client/src/ExpensiveProducts.tsx)
                -\> Componente que exibe apenas 3 produtos, os mais
                caros
            -   [MostInStock.tsx](client/src/MostInStock.tsx) -\>
                Componente que exibe os 3 produtos com maior estoque
            -   [CustomTypes.ts](client/src/CustomTypes.ts) -\> Arquivo
                que defino o tipo Product que utilizado em muitos
                arquivos
            -   [StyledButton.js](client/src/StyledButton.js) -\>
                Arquivo com o CSS para os botões no projeto
            -   [StyledForm.js](client/src/StyledForm.js) -\> Arquivo
                com o CSS para os formulários
            -   [TableStyle.js](client/src/TableStyle.js) -\> Arquivo
                com o CSS para as tabelas

# Paginação

[Explicação de como a paginação é implementada.](./pagination.md)
