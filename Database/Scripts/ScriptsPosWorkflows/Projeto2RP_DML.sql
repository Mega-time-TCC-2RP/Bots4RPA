USE DOISRP;
go


-------------------------
--PARTE DA TARDE
-------------------------
--SELECTS
select * from UserType;
select * from UserName;
select * from Corporation;
select * from Office;
select * from Employee;
select * from Player;
select * from Workflow;
select * from Quest;
select * from Skin;
select * from LibrarySkins;
select * from Post;
select * from Likes;
select * from Comment;
select * from Trophy;
select * from LibraryTrophy;
select * from LibraryAssistant;

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
GO

insert into UserName( userName, Email, Passwd, CPF, Phone, BirthDate, RG, UserValidation, IdUserType)
values('erick','erick@gmail.com','Senai@132','47955470842','11940028922',08/10/2001,'349025897', 1, 1), ('Alfredo','alfredo@eficticia.com','Senai@132','47343409876','11807449174',08/10/2001,'473434097', 1, 2), ('Ingrid', 'ingrid@eficticia.com','Senai@132','17341409876','11807449171',08/10/2001,'173414097', 1, 3);
GO

insert into Corporation( NameFantasy, CorporateName, AddressName, Phone, CNPJ)
values('Fic Corp','Empresa Ficticia','avenida paulista 123','11940028922','29632507000140');
GO

--------COMEÇAR DAQUI--------

insert into Office (TitleOffice)
values('Assistente administrativo'), ('Desenvolvedor'), ('Outro');
GO


insert into Employee(Confirmation, IdUser, IdCorporation, IdOffice)
values(1,2,1,3), (1,3,1,3);
GO


insert into Player( Score, IdEmployee)
values(1000, 2);
GO

insert into Workflow(IdEmployee, EndDate, Title, WorkflowDescription)
values (2, 10/06/2022, 'Tarefas ficticias', 'Essas tarefas são completamente ficticias');
GO

insert into Quest(IdWorkflow, Title, QuestDescription)
values(1, 'Tarefa ficticia 1', 'Essa é a primeira tarefa completamente ficticia');
GO

insert into Skin(Title, SkinDescription, SkinPrice, SkinImages)
values('Skin do BATMAN', 'skin para aqueles que gostam de morcegos assim como o batman', 200, 'batbot.png');
GO

insert into LibrarySkins( IdPlayer, IdSkin )
values(1, 1);
GO

insert into Post(Title, PostDescription, DataPost, IdPlayer)
values('Como consumir uma API', 'Hoje mostrarei como consumir uma API', 16/09/2022,1);
GO

insert into Likes(IdPost, IdPlayer)
values(1,1);
GO

insert into Comment( IdPlayer, IdPost, Title, CommentDescription )
values(1,1,'Solução erro 404','achei muito legal a sua postagem');
GO

insert into Trophy(Title, TrophyDescription)
values('Criar 5 assistentes', 'Esse troféu é concedido ao usuário que criar 5 assistentes');
GO

insert into LibraryTrophy( IdTrophy, IdPlayer)
values(1, 1);
GO

----------------------------------
--PARTE DA MANHA
----------------------------------

-- Inserting data into the Assistant table
INSERT INTO Assistant(IdEmployee, CreationDate, AlterationDate, AssistantName, AssistantDescription)
VALUES (1,20/03/2022,28/03/2022,'Fluxo de tabelas excel','Criações de tabelas de excel');
GO

-- Inserting data into the AssistantProcedure table
INSERT INTO AssistantProcedure(IdAssistant, ProcedurePriority, ProcedureName, ProcedureDescription, ProcedureValue)
VALUES (1,1,'Pesquiar no google','Processo para criação de tabelas', 'valor dólar');
GO


--  Inserting data into the Run table
INSERT INTO Run(IdAssistant, RunQuantity, RunDate, RunStatus, RunDescription, IdWorkflow)
VALUES (1,2,28/03/2022,1,'Rodando tabelas de excel', 1);
GO


--  Inserting data into the EmailVerification tables
INSERT INTO EmailVerification(IdAssistant, Username, UserPassword, Host, Gateway, Cryptography)
VALUES (1,'ricardinho','12345','https://mail.google.com/','1234','fere455564ef');
GO


INSERT INTO LibraryAssistant(IdEmployee, IdAssistant, IdLibrarySkin, Nickname)
VALUES (1,1,1,'Fofossistente');
GO