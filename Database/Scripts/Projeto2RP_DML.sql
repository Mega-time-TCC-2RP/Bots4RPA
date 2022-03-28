USE DOISRP_MANHA;
GO

SELECT * FROM Assistant
SELECT * FROM Process
SELECT * FROM Run
SELECT * FROM EmailVerification


-- Inserindo dados na tabela Assistant
INSERT INTO Assistant(IdFunctionary, CreationDate, AlterationDate, AssistantName, AssistantDescription)
VALUES (1,'20/03/2022','28/03/2022','AjudaNois','Assistente que nos ajuda em criações de tabelas de excel')
SELECT * FROM Assistant

-- Inserindo dados na tabela Process
INSERT INTO Process(IdAssistant, ProcessPriority, ProcessName, ProcessDescription)
VALUES (1,1,'','')
SELECT * FROM Process

-- Inserindo dados na tabela Run
INSERT INTO Run(IdAssistant, RunQuantity, RunDate, RunStatus, RunDescription)
VALUES (1,2,'28/03/2022','rodando','Rodando tabelas de excel')
SELECT * FROM Run

-- Inserindo dados na tabela EmailVerification
INSERT INTO EmailVerification(IdAssistant, Username, UserPassword, Domain)
VALUES (,'ricardinho','12345',)
SELECT * FROM EmailVerification


