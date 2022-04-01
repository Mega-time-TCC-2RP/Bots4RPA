USE DOISRP;
go


-------------------------
--PARTE DA TARDE
-------------------------
--SELECTS
select * from UserType;
select * from UserName;
select * from Corporation;
select * from Roles;
select * from Employee;
select * from Player;
select * from StatusQuest;
select * from Quest;
select * from Skin;
select * from LibrarySkins;
select * from Post;
select * from Likes;
select * from Comment;
select * from Trophy;
select * from LibraryTrophy;
-------
------------------------
--set IDENTITY_INSERT UserType off;
--go

--set IDENTITY_INSERT UserName off;
--go

--set IDENTITY_INSERT Corporation off;
--go

--set IDENTITY_INSERT Roles off;
--go

--set IDENTITY_INSERT Employee off;
--go

--set IDENTITY_INSERT Player off;
--go

--set IDENTITY_INSERT StatusQuest off;
--go

--set IDENTITY_INSERT Quest off;
--go

--set IDENTITY_INSERT Skin off;
--go

--set IDENTITY_INSERT LibrarySkins off;
--go

--set IDENTITY_INSERT Post off;
--go

--set IDENTITY_INSERT Likes off;
--go

--set IDENTITY_INSERT Comment on;
--go

--set IDENTITY_INSERT Trophy off;
--go

--set IDENTITY_INSERT LibraryTrophy off;
--go
--------------------------------------

--INSERTS

insert into UserType( TitleUserType)
values('Adminisrador Global'),('Administrador Empresarial'),('Comum');

insert into UserName( userName, Email, Passwd, CPF, Phone, BirthDate, RG, UserValidation)
values('erick','erick@gmail.com','Senai@132','47955470842','11940028922',08/10/2001,'349025897',1);

insert into Corporation( NameFantasy, CorporateName, AddressName, Phone, Email, Passwd, CNPJ)
values('Live Evil','descricao da empresa','avenida paulista 123','11940028923','LiveEvil@gmail.com','Senai@132','29632507000140');

--------COMEÇAR DAQUI--------

insert into Office (TitleOffice)
values('Assistente administrativo RH');
select * from Office

insert into Employee(Confirmation, IdUser, IdCorporation, IdOffice)
values(1,1,1,1);
select * from Employee

insert into Player( Score, IdEmployee)
values(1000, 1);

insert into StatusQuest(Title)
values('A Fazer'),('Fazendo'),('Feito');

insert into Quest(DateHour, DescriptionQuest, IdEmployee, IdStatus)
values(08/10/2022, 'Realizando CRUD dos Repositories', 1, 1);

insert into Skin(Title, SkinDescription, PrecoSkin)
values('Skin do BATMAN', 'skin para aqueles que gostam de morcegos assim como o batman', 200);

insert into LibrarySkins( UnlockData, IdPlayer, IdSkin)
values(30/04/2023, 1, 1);

insert into Post(Title, PostDescription, DataPost, IdPlayer)
values('Como consumir uma API', 'Hoje mostrarei como consumir uma API', 16/09/2022,1);

insert into Likes(IdPost, IdPlayer)
values(1,1);

insert into Comment( IdPlayer, IdPost, Title, CommentDescription, DataComment)
values(1,1,'Solução erro 404','achei muito legal a sua postagem', 01/06/2022);

insert into Trophy(Title, TrophyImage, TrophyDescription)
values('Criar 5 assistentes','ImagemTrofeu.png','Esse troféu é concedido ao usuário que criar 5 assistentes');

insert into LibraryTrophy(UnlockData, IdTrophy, IdPlayer)
values(07/07/2022, 1, 1);

----------------------------------
--PARTE DA MANHA
----------------------------------

SELECT * FROM Assistant
SELECT * FROM AssistantProcedure
SELECT * FROM Run
SELECT * FROM EmailVerification

-- Inserting data into the Assistant table
INSERT INTO Assistant(IdEmployee, CreationDate, AlterationDate, AssistantName, AssistantDescription)
VALUES (1,20/03/2022,28/03/2022,'Fluxo de tabelas excel','Criações de tabelas de excel')
SELECT * FROM Assistant

-- Inserting data into the AssistantProcedure table
INSERT INTO AssistantProcedure(IdAssistant, ProcedurePriority,ProcedureName, ProcedureDescription)
VALUES (1,1,'Criar Tabelas','Processo para criação de tabelas')
SELECT * FROM AssistantProcedure

--  Inserting data into the Run table
INSERT INTO Run(IdAssistant, RunQuantity, RunDate, RunStatus, RunDescription)
VALUES (1,2,28/03/2022,1,'Rodando tabelas de excel')
SELECT * FROM Run

--  Inserting data into the EmailVerification tables
INSERT INTO EmailVerification(IdAssistant, Username, UserPassword, Host, Gateway, Cryptography)
VALUES (1,'ricardinho','12345','https://mail.google.com/','1234','fere455564ef')
SELECT * FROM EmailVerification


