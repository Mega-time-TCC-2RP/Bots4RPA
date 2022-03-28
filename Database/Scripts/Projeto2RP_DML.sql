USE DoisRP_TCC;
go


-------------------------
--PARTE DA TARDE
-------------------------
--table usertype
insert into UserType(IdUserType, TitleUserType)
values(1, '3');


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


--INSERTS
insert into UserName(IdUser, userName, Email, Passwd, CPF, PhotoUser, Phone, BirthDate, RG, UserValidation)
values(
1,
'erick',
'erick@gmail.com',
'Senai@132',
'47955470842',
'fotolegal.png',
'11940028922',
'',
'349025897',
1
);
------------------------
set IDENTITY_INSERT UserType off;
go


set IDENTITY_INSERT UserName off;
go


set IDENTITY_INSERT Corporation off;
go

set IDENTITY_INSERT Roles off;
go

set IDENTITY_INSERT Employee off;
go

set IDENTITY_INSERT Player off;
go

set IDENTITY_INSERT StatusQuest off;
go

set IDENTITY_INSERT Quest off;
go

set IDENTITY_INSERT Skin off;
go

set IDENTITY_INSERT LibrarySkins off;
go

set IDENTITY_INSERT Post off;
go

set IDENTITY_INSERT Likes off;
go


set IDENTITY_INSERT Comment on;
go

set IDENTITY_INSERT Trophy off;
go

set IDENTITY_INSERT LibraryTrophy off;
go

------------------------

insert into Corporation(IdCorporation, NameFantasy, CorporateName, AddressName, Phone, Email, Passwd, CNPJ, CorporatePhoto)
values(1 ,
'Live Evil',
'descricao da empresa',
'avenida paulista 123',
'11940028923',
'LiveEvil@gmail.com',
'Senai@132',
'29632507000140',
'fotoempresa.png'
);

--------COMEÇAR DAQUI--------

insert into Roles(
IdRoles, TitleRoles)
values(1, 'Funcionario');

insert into Employee(IdEmployee, Confirmation)
values(
2,
1
);

insert into Player(IdPlayer, Score)
values(
1,
1000
);

insert into StatusQuest(IdStatus, Title)
values(
3,
'A fazer'
);

insert into Quest(IdQuest, DateHour, DescriptionQuest)
values(
1,
'08/10/2022',
'Realizando CRUD dos Repositories'
);

insert into Skin(IdSkin, Title, SkinImages, SkinDescription, PrecoSkin)
values(1, 'Skin do BATMAN', 'BATMAN SKIN', 'skin para aqueles que gostam de morcegos assim como o batman', 20);



insert into LibrarySkins(IdLibrarySkins, UnlockData)
values(
1,
'30/04/2023'
);

insert into Post(IdPost, Title, PostDescription, PostImage, DataPost)
values(
1,
'Como consumir uma API',
'Hoje mostrarei como consumir uma API',
'',
'16/09/2022'
);

insert into Likes(IdLikes, LikesNumber)
values(
1,
50
);

insert into Comment(IdComment, Title, CommentDescription, DataComment)
values(
1,
'Solução erro 404',
'achei muito legal a sua postagem',
'01/06/2022'
);

insert into Trophy(IdTrophy, Title, TrophyImage, TrophyDescription)
values(
9,
'Criar 5 assistentes',
'ImagemTrofeu.png',
'Esse troféu é concedido ao usuário que criar 5 assistentes'
);

insert into LibraryTrophy(IdLibraryTrophy, UnlockData)
values(
1,
'07/07/2022'
);

----------------------------------
--PARTE DA MANHA
----------------------------------

SELECT * FROM Assistant
SELECT * FROM Process
SELECT * FROM Run
SELECT * FROM EmailVerification


-- Inserindo dados na tabela Assistant
INSERT INTO Assistant(IdFunctionary, CreationDate, AlterationDate, AssistantName, AssistantDescription)
VALUES (1,'20/03/2022','28/03/2022','Fluxo de tabelas excel','Criações de tabelas de excel')
SELECT * FROM Assistant

-- Inserindo dados na tabela Process
INSERT INTO Process(IdAssistant, ProcessPriority, ProcessName, ProcessDescription)
VALUES (1,1,'Criar Tabelas','Processo para criação de tabelas')
SELECT * FROM Process

-- Inserindo dados na tabela Run
INSERT INTO Run(IdAssistant, RunQuantity, RunDate, RunStatus, RunDescription)
VALUES (1,2,'28/03/2022',1,'Rodando tabelas de excel')
SELECT * FROM Run

-- Inserindo dados na tabela EmailVerification
INSERT INTO EmailVerification(IdAssistant, Username, UserPassword, Domain)
VALUES (1,'ricardinho','12345',,)
SELECT * FROM EmailVerification


