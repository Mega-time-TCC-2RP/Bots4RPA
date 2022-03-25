CREATE DATABASE DOISRP_MANHA;
GO

USE DOISRP_MANHA;
GO


CREATE TABLE Assistant(
   IdAssistant INT PRIMARY KEY IDENTITY(1,1),
   IdFunctionary INT FOREIGN KEY REFERENCES Functionary(IdFunctionary),
   CreationDate DATETIME NOT NULL,
   AlterationDate DATETIMECC        ,
   AssistantName VARCHAR(40) NOT NULL,
   AssistantDescription VARCHAR(400) NOT NULL 
);
GO

CREATE TABLE Process(
   IdProcess INT PRIMARY KEY IDENTITY(1,1),
   IdAssistant INT FOREIGN KEY REFERENCES Assistant(IdAssistant),
   ProcessPriority INT,
   ProcessName VARCHAR(50),
   ProcessDescription VARCHAR(400)
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
   Username VARCHAR(),
   UserPassword VARCHAR(),
   Domain VARCHAR()
);
GO


