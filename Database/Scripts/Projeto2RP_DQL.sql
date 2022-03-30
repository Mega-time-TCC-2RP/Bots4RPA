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
select * from LibraryTrophy;
select * from Assistant;
select * from AssistantProcedure;
select * from Run;
select * from EmailVerification;

-- Quantity of Assistants
SELECT COUNT(IdAssistant) 'Quantity of Assistants' FROM Assistant;
GO

-- Quantity of Process
SELECT COUNT(IdAssistantProcedure) 'Quantity of Process' FROM AssistantProcedure;
GO

-- Quantity of Runs
SELECT COUNT(IdRun) 'Quantity of Runs' FROM Run;
GO

-- Quantity of EmailVerification
SELECT COUNT(IdEmailVerification) 'Quantity of Runs' FROM EmailVerification;
GO

--Assistent (Alinhar com pessoal da tarde
SELECT IdEmployee,CreationDate,AlterationDate,AssistantName,AssistantDescription
FROM Assistant
INNER JOIN Employee
ON Assistants.IdEmployee = Employee.IdEmployee
GO


SELECT IdAssistant, ProcedurePriority,ProcedureName,ProcedureDescription
FROM AssistantProcedure
INNER JOIN Assistant
ON AssistantProcedure.IdAssistant = Assistant.IdAssistant
GO

SELECT IdAssistant,RunQuantity,RunDate,RunStatus,RunDescription
FROM Run
INNER JOIN Assistants
ON Run.IdAssistant = Assistant.IdAssistant
GO

SELECT IdAssistant,Username,UserPassword,Host,Gateway,Cryptography
FROM EmailVerification
INNER JOIN Assistant
ON EmailVerification.IdAssistant = Assistant.IdAssistant
GO