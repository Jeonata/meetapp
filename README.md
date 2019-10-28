   
<p align="center">
  <img src="https://raw.githubusercontent.com/Jeonata/Meetapp/master/mobile/src/assets/logo@3x.png">
</p>

# Meetapp

Aplicativo para gestão de meetups desenvolvido no bootcamp GoStack - Rocketseat.
Uma aplicação completa criada utilizando a poderosa *Stack* [JavaScript](https://www.ecma-international.org/ecma-262/10.0/index.html).


## Tecnologias utilizadas

### Aplicação servidor (back-end)
-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [nodemon](https://nodemon.io/)
-   [Sucrase](https://github.com/alangpierce/sucrase)
-   [Docker](https://www.docker.com/docker-community)
-   [Sequelize](http://docs.sequelizejs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Node-postgres](https://www.npmjs.com/package/pg)
-   [Redis](https://redis.io/)
-   [JWT](https://jwt.io/)
-   [Multer](https://github.com/expressjs/multer)
-   [Bcrypt](https://www.npmjs.com/package/bcrypt)
-   [Youch](https://www.npmjs.com/package/youch)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Bee Queue](https://www.npmjs.com/package/bcrypt)
-   [Nodemailer](https://nodemailer.com/about/)
-   [Date-fns](https://date-fns.org/)
-   [Sentry](https://sentry.io/)
-   [DotEnv](https://www.npmjs.com/package/dotenv)
-   [VS Code](https://code.visualstudio.com/) 
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

###  Aplicação web (front-end)
-   [ReactJS](https://reactjs.org/)
-   [Redux](https://redux.js.org/)
-   [Redux-Saga](https://redux-saga.js.org/)
-   [React Router](https://github.com/ReactTraining/react-router)
-   [Styled-components](https://www.styled-components.com/)
-   [Axios](https://github.com/axios/axios)
-   [History](https://www.npmjs.com/package/history)
-   [Immer](https://github.com/immerjs/immer)
-   [Polished](https://polished.js.org/)
-   [React-Toastify](https://fkhadra.github.io/react-toastify/)
-   [React-Icons](http://react-icons.github.io/react-icons/)
-   [react-perfect-scrollbar](https://github.com/OpusCapita/react-perfect-scrollbar)
-   [Unform](https://github.com/Rocketseat/unform)
-   [Yup](https://www.npmjs.com/package/yup)
-   [Date-fns](https://date-fns.org/)
-   [Reactotron](https://infinite.red/reactotron)
-   [VS Code](https://code.visualstudio.com/)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Aplicação mobile (front-end - mobile)
-   [ReactJS](https://reactjs.org/)
-   [React Native](https://facebook.github.io/react-native/)
-   [Redux](https://redux.js.org/)
-   [Redux-Saga](https://redux-saga.js.org/)
-   [Styled-components](https://www.styled-components.com/)
-   [Axios](https://github.com/axios/axios)
-   [React-Icons](http://react-icons.github.io/react-icons/)
-   [date-fns](https://date-fns.org/)
-   [Reactotron](https://infinite.red/reactotron)
-   [VS Code](https://code.visualstudio.com/)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Rodando a aplicação

 Para iniciar, será necessário que você tenha instalado algum gerenciador de pacotes Git, o Node ( versão 10.15 +) e Yarn  ( versão 1.15 +).

Para utilizar o aplicativo, é necessário algun emulador Android instalado, ou um dispositivo com acesso de desenvolvedor.
 
Tendo instalado, clone o projeto com o seguinte código:

    $ git clone https://github.com/Jeonata/Meetapp.git


### Instalação do back-end


##### 1 - Abra o repositório do back-end:

    $ cd Meetapp/meetapp-backend 
 
##### 2 - Instale as dependências

    $ yarn install
    
##### 3 - Monte os ambientes do Docker

    $  docker run --name database -e POSTGRES_PASSWORD=yoursecretpassword -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres
    $  docker run --name redis -p 6379:6379 -d -t redis:alpine
    
##### 4 - Executar as migrations

    $ yarn sequelize db:migrate

##### 5 - Executar o back-end

    $ yarn dev
    

### Instalação do front-end


##### 1 - Abra o repositório do back-end:

    $ cd Meetapp/meetapp-frontend 
 
##### 2 - Instale as dependências

    $ yarn install

##### 3 - Executar o front-end

    $ yarn start


### Instalação do mobile


> Até o momento, a aplicação foi feita e testada em um dispositivo Android. A compatibilidade com dispositivos IOS não é garantida.


##### 1 - Abra o repositório do mobile:

    $ cd Meetapp/mobile 
 
##### 2 - Instale as dependências

    $ yarn install

##### 3 - Executar a aplicação

    $ npm start
    $ react-native run-android


## License
[MIT](https://github.com/Jeonata/Meetapp/blob/master/LICENSE)
