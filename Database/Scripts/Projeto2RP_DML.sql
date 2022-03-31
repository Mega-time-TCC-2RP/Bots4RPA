USE DOISRP;
GO

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

insert into Roles(TitleRoles)
values('Funcionario');

insert into Employee(Confirmation)
values(1);

insert into Player(Score)
values(1000);

insert into StatusQuest(Title)
values('A fazer');

insert into Quest(DateHour, DescriptionQuest)
values('08/10/2022','Realizando CRUD dos Repositories');

insert into Skin(Title, SkinImages, SkinDescription, PrecoSkin)
values('Skin do BATMAN', 'BATMAN SKIN', 'skin para aqueles que gostam de morcegos assim como o batman', 20);



insert into LibrarySkins(UnlockData)
values('30/04/2023');

insert into Post(Title, PostDescription, PostImage, DataPost)
values('Como consumir uma API','Hoje mostrarei como consumir uma API','','16/09/2022');

insert into Likes(LikesNumber)
values(50);

insert into Comment(Title, CommentDescription, DataComment)
values('Solução erro 404','achei muito legal a sua postagem','01/06/2022');

insert into Trophy(Title, TrophyImage, TrophyDescription)
values('Criar 5 assistentes','ImagemTrofeu.png','Esse troféu é concedido ao usuário que criar 5 assistentes');

insert into LibraryTrophy(UnlockData)
values('07/07/2022');

----------------------------------
--PARTE DA MANHA
----------------------------------

SELECT * FROM Assistant
SELECT * FROM AssistantProcedure
SELECT * FROM Run
SELECT * FROM EmailVerification


INSERT INTO Assistant(IdEmployee, CreationDate, AlterationDate, AssistantName, AssistantDescription)
VALUES (1,'20/03/2022','28/03/2022','Fluxo de tabelas excel','Criações de tabelas de excel')
SELECT * FROM Assistant

-- Inserting data into the AssistantProcedure table
INSERT INTO AssistantProcedure(IdAssistant, ProcedurePriority,ProcedureName, ProcedureDescription)
VALUES (1,1,'Criar Tabelas','Processo para criação de tabelas')
SELECT * FROM AssistantProcedure

--  Inserting data into the Run table
INSERT INTO Run(IdAssistant, RunQuantity, RunDate, RunStatus, RunDescription)
VALUES (1,2,'28/03/2022',1,'Rodando tabelas de excel')
SELECT * FROM Run

--  Inserting data into the EmailVerification tables
INSERT INTO EmailVerification(IdAssistant, Username, UserPassword, Host, Gateway, Cryptography)
VALUES (1,'ricardinho','12345','https://mail.google.com/','1234','fere455564ef')
SELECT * FROM EmailVerification