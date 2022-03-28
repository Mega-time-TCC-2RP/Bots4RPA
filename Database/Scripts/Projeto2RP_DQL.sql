USE DOISRP_MANHA;
GO

-- Quantity of Assistants
SELECT COUNT(IdAssistant) 'Quantity of Assistants' FROM Assistant;
GO

-- Quantity of Process
SELECT COUNT(IdProcess) 'Quantity of Process' FROM Process;
GO

-- Quantity of Runs
SELECT COUNT(IdRun) 'Quantity of Runs' FROM Run;
GO

-- Quantity of EmailVerification
SELECT COUNT(IdEmailVerification) 'Quantity of Runs' FROM EmailVerification;
GO

--Assistent (Alinhar com pessoal da tarde
SELECT IdFunctionary,CreationDate,AlterationDate,AssistantName,AssistantDescription
FROM Assistant
INNER JOIN Usuario
ON Assistants.Id = Usuario.IdUsuario
GO


SELECT IdAssistant,ProcessPriority,ProcessName,ProcessDescription
FROM Process
INNER JOIN Assistent
ON Process.IdAssistant = Assistant.IdAssistant
GO

SELECT IdAssistant,RunQuantity,RunDate,RunStatus,RunDescription
FROM Run
INNER JOIN Assistent
ON Run.IdAssistant = Assistant.IdAssistant
GO

SELECT IdAssistant,Username,UserPassword,Domain
FROM EmailVerification
INNER JOIN Assistent
ON EmailVerification.IdAssistant = Assistant.IdAssistant
GO