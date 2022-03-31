/*CREATE DATABASE DOISRP;
GO

USE DOISRP;
GO*/

--create UserType table
create table UserType(
        IdUserType INT PRIMARY KEY Identity not null,
        TitleUserType varchar(50) not null
);
GO

--create User table
create table UserName(
        IdUser INT PRIMARY KEY Identity not null,
        UserName varchar(256) not null,
        Email varchar(256) not null unique,
        Passwd varchar(100),
        CPF char(11) not null unique,
        PhotoUser varchar(max) default('padrao.png'),
        Phone char(11) unique,
        BirthDate DateTime not null,
        RG varchar(15) not null,
		UserValidation BIT,
        
        --add the foreign key
        IdUserType INT FOREIGN KEY REFERENCES UserType(IdUserType)
);
GO

--create Corporation table
create table Corporation(
        IdCorporation INT PRIMARY KEY Identity not null,
        NameFantasy varchar(100) not null,
        CorporateName varchar(max),
        AddressName varchar(256) not null,
        Phone char(11) not null unique,
        Email varchar(256) not null unique,
        Passwd varchar(100) not null,       
        CNPJ varchar(15) not null unique,
        CorporatePhoto text
);
GO
--create Roles table
create table Office(
        IdOffice INT PRIMARY KEY Identity not null,
        TitleOffice varchar(45) not null
);
GO
--create Employee table
create table Employee(
        IdEmployee INT PRIMARY KEY Identity not null,
        Confirmation BIT not null,

        --add the foreign keys
        IdUser INT FOREIGN KEY REFERENCES UserName(IdUser),
        IdCorporation INT FOREIGN KEY REFERENCES Corporation(IdCorporation),
        IdOffice INT FOREIGN KEY REFERENCES Office(IdOffice)

);
GO

--create Player table
create table Player(
        IdPlayer INT PRIMARY KEY Identity not null,
        Score int,

        --fk
        IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee)
);
GO

--create statusQuest table
create table StatusQuest(
        IdStatus INT PRIMARY KEY Identity not null,
        Title varchar(100) not null,

);
GO

--create Card table
create table Quest(
        IdQuest INT PRIMARY KEY Identity not null,
        DateHour DateTime,
        DescriptionQuest varchar(max) not null,
        
        --add the foreign keys
        IdEmployee INT FOREIGN KEY REFERENCES Employee(IdEmployee),
        IdStatus INT FOREIGN KEY REFERENCES StatusQuest(IdStatus)
);
GO

--create Skin table
create table Skin(
        IdSkin INT PRIMARY KEY Identity not null,
        Title varchar(100) not null,
        SkinImages varchar(256) unique,
        SkinDescription varchar(max),
		PrecoSkin INT
);
GO

--create LibrarySkins table
create table LibrarySkins(
        IdLibrarySkins INT PRIMARY KEY Identity not null,
        UnlockData DateTime,

        --add foreign keys
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer),
        IdSkin INT FOREIGN KEY REFERENCES Skin(IdSkin)
);
GO



--create Post table
create table Post(
        IdPost INT PRIMARY KEY Identity not null,
        Title varchar(100) not null,
        PostDescription varchar(max),
        PostImage varchar(256),
        DataPost DateTime,

        --foreign keys
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer)
);
GO

--create Likes table
create table Likes(
        IdLikes INT PRIMARY KEY Identity not null,

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost),
        IdPlayer INT FOREIGN KEY REFERENCES	Player(IdPlayer)
);
GO

--create Comment table
create table Comment(
        IdComment int PRIMARY KEY Identity not null,
        Title varchar(45),
        CommentDescription varchar(max),
        DataComment DateTime,
        --CommentImages text

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost),
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer)
);
GO

--create Trophy table
create table Trophy(
        IdTrophy INT PRIMARY KEY Identity not null,
        Title varchar(45),
        TrophyImage text,
        TrophyDescription varchar(max)
);
GO

--create LibraryTrophy table
create table LibraryTrophy(
        IdLibraryTrophy INT PRIMARY KEY Identity not null,
        UnlockData DateTime,

        --foreign keys
        IdPlayer INT FOREIGN key REFERENCES Player(IdPlayer),
        IdTrophy INT FOREIGN KEY REFERENCES Trophy(IdTrophy)
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
   IdAssistantProcedure INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   ProcedurePriority INT,
   ProcedureName VARCHAR(50),
   ProcedureDescription VARCHAR(500)
);
GO

--create LibraryTrophy table
CREATE TABLE Run(
   IdRun INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   RunQuantity INT,
   RunDate DATETIME,
   RunStatus BIT,
   RunDescription VARCHAR(500)
);
GO

--create EmailVerification table
CREATE TABLE EmailVerification(
   IdEmailVerification INT PRIMARY KEY IDENTITY(1,1),
   AssistantId INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   Username VARCHAR(100) NOT NULL UNIQUE,
   UserPassword VARCHAR(100) NOT NULL,
   Host VARCHAR(100) NOT NULL,
   Gateway VARCHAR(4) NOT NULL,
   Cryptography VARCHAR(100) NOT NULL
);
GO

/*
Drop table UserType
Drop table UserName
Drop table Corporation
Drop table Office
Drop table Employee
Drop table Player
Drop table StatusQuest
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
*/


