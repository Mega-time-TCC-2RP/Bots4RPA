CREATE DATABASE DOISRP;
GO

USE DOISRP;
GO

--create UserType table
create table UserType(
        IdUserType INT PRIMARY KEY Identity not null,
        TitleUserType int not null
);
GO

--create User table
create table UserName(
        IdUser INT PRIMARY KEY Identity not null,
        userName varchar(256) not null,
        Email varchar(256) not null unique,
        Passwd varchar(100),
        CPF char(11) not null unique,
        PhotoUser varchar(max),
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
create table Roles(
        IdRoles INT PRIMARY KEY Identity not null,
        TitleRoles varchar(45) not null
);
GO
--create Employee table
create table Employee(
        IdEmployee INT PRIMARY KEY Identity not null,
        Confirmation BIT not null,

        --add the foreign keys
        IdUser INT FOREIGN KEY REFERENCES UserName(IdUser),
        IdCorporation INT FOREIGN KEY REFERENCES Corporation(IdCorporation),
        IdRoles INT FOREIGN KEY REFERENCES Roles(IdRoles)

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
        LikesNumber int,

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost),
        IdPlayer INT FOREIGN KEY REFERENCES Player(IdPlayer)
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





CREATE TABLE Assistant(
   IdAssistant INT PRIMARY KEY IDENTITY(1,1),
   IdFunctionary INT FOREIGN KEY REFERENCES Functionary(IdFunctionary),
   CreationDate DATETIME NOT NULL,
   AlterationDate DATETIME, 
   AssistantName VARCHAR(50) NOT NULL,
   AssistantDescription VARCHAR(500) NOT NULL 
);
GO

CREATE TABLE Process(
   IdProcess INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   ProcessPriority INT,
   ProcessName VARCHAR(50),
   ProcessDescription VARCHAR(500)
);
GO


CREATE TABLE Run(
   IdRun INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   RunQuantity INT,
   RunDate DATETIME,
   RunStatus BIT,
   RunDescription VARCHAR(500)
);
GO

CREATE TABLE EmailVerification(
   IdEmailVerification INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   Username VARCHAR(100),
   UserPassword VARCHAR(100),
   Domain VARCHAR(26)
);
GO
