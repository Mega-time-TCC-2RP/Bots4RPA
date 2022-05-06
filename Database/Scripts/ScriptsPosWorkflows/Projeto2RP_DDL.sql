/*USE 2RP-Tarde;
GO
*/

--create UserType table
create table UserType(
        IdUserType INT PRIMARY KEY Identity,
        TitleUserType varchar(50) not null
);
GO

--create User table
create table UserName(
        IdUser INT PRIMARY KEY Identity,
        UserName varchar(256) not null,
        Email varchar(256) not null unique,
        Passwd varchar(100),
        CPF char(11) not null unique,
        PhotoUser varchar(max) default('padrao.png'),
        Phone char(11) unique,
        BirthDate DateTime not null,
        RG varchar(15) not null,
		UserValidation BIT default(0),
		googleId INT,
        
        --add the foreign key
        IdUserType INT FOREIGN KEY REFERENCES UserType(IdUserType) not null
);
GO

CREATE UNIQUE NONCLUSTERED INDEX idx_googleid_notnull
ON UserName(googleId)
WHERE googleId IS NOT NULL;

CREATE UNIQUE NONCLUSTERED INDEX idx_userphone_notnull
ON UserName(Phone)
WHERE Phone IS NOT NULL;

--create Corporation table
create table Corporation(
        IdCorporation INT PRIMARY KEY Identity,
        NameFantasy varchar(100) not null,
        CorporateName varchar(max) not null,
        AddressName varchar(max) not null,
        Phone char(11) not null unique,       
        CNPJ varchar(15) not null unique,
        CorporatePhoto varchar(max) default('padraoEmpresa.png')
);
GO
--create Roles table
create table Office(
        IdOffice INT PRIMARY KEY Identity,
        TitleOffice varchar(45) not null
);
GO
--create Employee table
create table Employee(
        IdEmployee INT PRIMARY KEY Identity,
        Confirmation BIT DEFAULT(0) not null,

        --add the foreign keys
        IdUser INT FOREIGN KEY REFERENCES UserName(IdUser) not null,
        IdCorporation INT FOREIGN KEY REFERENCES Corporation(IdCorporation) not null,
        IdOffice INT FOREIGN KEY REFERENCES Office(IdOffice)

);
GO

--create Player table
create table Player(
        IdPlayer INT PRIMARY KEY Identity,
        Score int,

        --fk
        IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee) not null
);
GO

/*
--create statusQuest table
create table StatusQuest(
        IdStatus INT PRIMARY KEY Identity,
        Title varchar(100) not null,

);
GO

--create Card table

create table Quest(
        IdQuest INT PRIMARY KEY Identity,
        DateHour DateTime,
        DescriptionQuest varchar(max) not null,
        
        --add the foreign keys
        IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee) not null,
        IdStatus INT FOREIGN KEY REFERENCES StatusQuest(IdStatus) not null
);
GO

*/

create table StatusWorkflow(
	IdStatus INT PRIMARY KEY IDENTITY,
	StatusTitle VARCHAR(10)
);

create table Workflow(
	IdWorkflow INT PRIMARY KEY IDENTITY,
	IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee) NOT NULL,
	IdStatus INT FOREIGN KEY REFERENCES StatusWorkflow(IdStatus) NOT NULL DEFAULT(1),
	EndDate DATETIME,
	Title VARCHAR(MAX) NOT NULL,
	WorkflowDescription VARCHAR(MAX)
);

create table Quest(
	IdQuest INT PRIMARY KEY IDENTITY,
	IdWorkflow INT FOREIGN KEY REFERENCES Workflow(IdWorkflow) NOT NULL,
	Completed BIT DEFAULT(0),
	Title VARCHAR(MAX) NOT NULL,
	QuestDescription VARCHAR(MAX)
);

--create Skin table
create table Skin(
        IdSkin INT PRIMARY KEY Identity,
        Title varchar(100) not null,
        SkinImages varchar(max) not null,
        SkinDescription varchar(max) default('Não há uma descrição para este visual de assistente :('),
		SkinPrice INT not null
);
GO

--create LibrarySkins table
create table LibrarySkins(
        IdLibrarySkins INT PRIMARY KEY Identity,
        UnlockData DateTime default(GETDATE()),

        --add foreign keys
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer) not null,
        IdSkin INT FOREIGN KEY REFERENCES Skin(IdSkin) not null
);
GO



--create Post table
create table Post(
        IdPost INT PRIMARY KEY Identity,
        Title varchar(100) not null,
        PostDescription varchar(max),
        PostImage varchar(max),
        DataPost DateTime default(GETDATE()),

        --foreign keys
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer) not null
);
GO

--create Likes table
create table Likes(
        IdLikes INT PRIMARY KEY Identity,

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost) not null,
        IdPlayer INT FOREIGN KEY REFERENCES	Player(IdPlayer) not null
);
GO

--create Comment table
create table Comment(
        IdComment int PRIMARY KEY Identity,
        Title varchar(45) not null,
        CommentDescription varchar(max),
        DataComment DateTime default(GETDATE()),
        --CommentImages text

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost) not null,
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer) not null
);
GO

--create Trophy table
create table Trophy(
        IdTrophy INT PRIMARY KEY Identity,
        Title varchar(45) not null,
        TrophyImage varchar(max) default('padraoTrofeu.png'),
        TrophyDescription varchar(max) not null
);
GO

--create LibraryTrophy table
create table LibraryTrophy(
        IdLibraryTrophy INT PRIMARY KEY Identity,
        UnlockData DateTime default(GETDATE()),

        --foreign keys
        IdPlayer INT FOREIGN key REFERENCES Player(IdPlayer) not null,
        IdTrophy INT FOREIGN KEY REFERENCES Trophy(IdTrophy) not null
);
GO



-----------------------------------------------------------------
--------------------------MORNING TABLES-------------------------
-----------------------------------------------------------------



--create Assistant table
CREATE TABLE Assistant(
   IdAssistant INT PRIMARY KEY IDENTITY(1,1),
   IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee),

   CreationDate DATETIME NOT NULL,
   AlterationDate DATETIME, 
   AssistantName VARCHAR(50) NOT NULL,
   AssistantDescription VARCHAR(500) NOT NULL 
);
GO

--create AssistantProcedure table
CREATE TABLE AssistantProcedure(
   IdAProcedure INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   ProcedurePriority INT,
   ProcedureName VARCHAR(50),
   ProcedureDescription VARCHAR(500),
   ProcedureValue VARCHAR(256)
);
GO

--create LibraryTrophy table
CREATE TABLE Run(
   IdRun INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   IdWorkflow INT FOREIGN KEY REFERENCES Workflow(IdWorkflow),
   RunQuantity INT,
   RunDate DATETIME,
   RunStatus BIT,
   RunDescription VARCHAR(500)
);
GO

/*
--create AssistantProcedure table
CREATE TABLE AssistantProcedure(
   IdAProcedure INT PRIMARY KEY IDENTITY(1,1),
   IdLiraryAssistant INT FOREIGN KEY REFERENCES LibraryAssistant(IdLiraryAssistant),
   ProcedurePriority INT,
   ProcedureName VARCHAR(50),
   ProcedureDescription VARCHAR(500),
   ProcedureValue VARCHAR(256)
);
GO

--create LibraryTrophy table
CREATE TABLE Run(
   IdRun INT PRIMARY KEY IDENTITY(1,1),
   IdLiraryAssistant INT FOREIGN KEY REFERENCES LibraryAssistant(IdLiraryAssistant),
   IdWorkflow INT FOREIGN KEY REFERENCES Workflow(IdWorkflow),
   RunQuantity INT,
   RunDate DATETIME,
   RunStatus BIT,
   RunDescription VARCHAR(500)
);
GO
*/

--create EmailVerification table
CREATE TABLE EmailVerification(
   IdEmailVerification INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   Username VARCHAR(100) NOT NULL UNIQUE,
   UserPassword VARCHAR(100) NOT NULL,
   Host VARCHAR(100) NOT NULL,
   Gateway VARCHAR(4) NOT NULL,
   Cryptography VARCHAR(100) NOT NULL
);
GO

--Morning X Afternoon tables

CREATE TABLE LibraryAssistant(
	IdLiraryAssistant INT PRIMARY KEY IDENTITY(1,1),
	IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee),
	IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
	IdLibrarySkin INT FOREIGN KEY REFERENCES LibrarySkins(IdLibrarySkins),
	Nickname VARCHAR(20),
	UnlockDate DATETIME DEFAULT(GETDATE())
);
GO

/*
Drop table UserType
Drop table UserName
Drop table Corporation
Drop table Office
Drop table Employee
Drop table Player
Drop table Workflow
Drop table Quest
Drop table Skin
Drop table LibrarySkins
Drop table Post
Drop table Likes
Drop table Comment
Drop table Trophy
Drop table LibraryTrophy
Drop table Assistant
Drop table AssistantProcedure
Drop table Run
Drop table EmailVerification
Drop table LibraryAssistant
*/