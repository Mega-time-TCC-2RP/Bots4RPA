# Bots-4RPA

# Situação Problema

![image](https://user-images.githubusercontent.com/19197082/167921012-595db311-8b49-4353-8351-e2dd4dd1d39a.png)


# Design e Telas

Nossa prototipação foi feito majoritariamente no figma. Até o atual commit, o design e visual da plataforma está sujeito a mudanças em decorrência da não finalização do projeto e, portanto, caso o link de visualização seja acessado por algum usuário externo, poderá notar mudanças no design entre um dia e outro.
- link da prototipação: https://www.figma.com/file/UCqHavOcG2CM6Ljjd0tLZj/Bots4RPA?node-id=159%3A331

![image](https://user-images.githubusercontent.com/19197082/165103383-61a094ec-d809-4b38-8e1e-ee37f3ad86fb.png)


# Comandos Iniciais para a rápida criação do projeto

`npx create-react-app my-app`\
`cd my-app`\
`npm start`

A porta 3000 irá abrir automaticamente no navegador padrão para a visualização do projeto.\
Ou abra manualmente em: [http://localhost:3000](http://localhost:3000) para ver no navegador.

# Link da API em núvem: [https://grupo7.azurewebsites.net/](https://grupo7.azurewebsites.net/)

Faremos uso de diverass bibliotecas em nossa aplicação, para economizar tempo, instalaremos todas que foram utilizadas de uma vez.
Para a instalação, usaremos o terminal do git bash

![image](https://user-images.githubusercontent.com/19197082/163263666-eee02f74-aa58-4a39-83f2-4454a6dc6abb.png)

# Bibliotecas usadas:
nota: é possível também usar yarn para a instação, mas neste projeto optamos pelo uso do npm.

`npm install -S @djpfs/react-vlibras`\
`npm install axios`\
`npm install --save react-toastify`\
`npm install --save-dev cypress`\
`npm install react-hook-form`\
`npm install --save react-google-button`\
`npm install react-google-login`\
`npm install react-icons --save`\
`npm install react-input-mask --save`\
`npm install --save react-modal`\
`npm i react-router-dom`\

# Banco de Dados
Optamos por utilizar o banco de dados relacional(SQL), e no primeiro momento, realizamos os diagramas necessários para o entendimento das tabelas e para apresentação ao cliente. Foi então realizado a construção de tabelas através do **SSMS(SQL Server Management Studio)**, onde fizemos os primeiros testes em um ambiente local para inserir os primeiros dados e verificar se as tabelas estavam se conversando. Por fim, depois de realizar os primeiros testes e fazer as DDL's, DML'Se DQL's, foi possível adicionar o banco ao ambiente em núvem, para que todos tivessem acesso ao mesmo banco e sempre atualizado.

nota: no projeto, foi usado o **Azure Cloud**, mas é possível utilizar outros serviços de núvem como **AWS Cloud** e **GCP(Google Cloud Platform)**, fica a critério do time de desenvolvimento ou do que o cliente solicitar.

Diagrama lógico:

![image width="100"](https://user-images.githubusercontent.com/19197082/164285099-b5d7f398-e739-417a-ab70-7892aa560234.png)


# Equipe

