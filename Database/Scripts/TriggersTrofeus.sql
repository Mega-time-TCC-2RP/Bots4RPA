--Triggers trofeus
CREATE TRIGGER [dbo].[TrofeuValidacao]
ON UserName
AFTER UPDATE
AS
BEGIN
		DECLARE @ValidacaoAntiga INT;
		DECLARE @ValidacaoAtual INT;
		DECLARE @IdUsuario INT;
		SET @IdUsuario = (SELECT IdUser FROM inserted);
		SET @ValidacaoAntiga = (SELECT UserValidation FROM deleted);
		SET @ValidacaoAtual = (SELECT UserValidation FROM inserted);
		IF @ValidacaoAntiga = 0 AND @ValidacaoAtual = 1
		DECLARE @IdPlayer INT;
		IF(SELECT COUNT(Player.IdPlayer) FROM UserName
			LEFT JOIN Employee ON UserName.IdUser = Employee.IdUser
			LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee WHERE UserName.IdUser = @IdUsuario) = 1
			BEGIN
				SET @IdPlayer = (
				SELECT IdPlayer FROM UserName
				LEFT JOIN Employee
				ON UserName.IdUser = Employee.IdUser
				LEFT JOIN Player
				ON Employee.IdEmployee = Player.IdEmployee
				WHERE UserName.IdUser = @IdUsuario
				);
				insert into LibraryTrophy(IdPlayer, IdTrophy)
				VALUES (@IdPlayer, 2);
			END;
END
GO

CREATE TRIGGER [dbo].[TrofeuCriarAssistente]
ON Assistant
AFTER INSERT
AS 
BEGIN
	DECLARE @IdEmployee INT;
	SET @IdEmployee = (SELECT IdEmployee FROM inserted);
	IF (SELECT COUNT (Player.IdPlayer) FROM Employee
		LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
		WHERE Employee.IdEmployee = @IdEmployee) = 1
		BEGIN
			DECLARE @IdPlayer INT;
			DECLARE @AssistantCount INT;
			SET @IdPlayer = (SELECT Player.IdPlayer FROM Employee
			LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee);
			
			SET @AssistantCount = (SELECT COUNT(IdAssistant) FROM Assistant WHERE IdEmployee = @IdEmployee);

			IF(@AssistantCount >= 1 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 3) = 0)
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 3);
			END;
			IF(@AssistantCount >= 5 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 4) = 0)
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 4);
			END;
			IF(@AssistantCount >= 10 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 5) = 0)
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 5);
			END;
		END;
END
GO

CREATE TRIGGER [dbo].[TrofeuAdquirirAssistentes]
ON LibraryAssistant
AFTER INSERT
AS BEGIN
	DECLARE @IdEmployee INT;
	SET @IdEmployee = (SELECT IdEmployee FROM inserted);
	IF (SELECT COUNT (Player.IdPlayer) FROM Employee
		LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
		WHERE Employee.IdEmployee = @IdEmployee) = 1
		BEGIN
			DECLARE @IdPlayer INT;
			DECLARE @LibraryAssistantCount INT;
			SET @IdPlayer = (SELECT Player.IdPlayer FROM Employee
			LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee);
			SET @LibraryAssistantCount = (SELECT COUNT(IdLiraryAssistant) FROM LibraryAssistant WHERE IdEmployee = @IdEmployee);

			IF(@LibraryAssistantCount >= 1 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 6) = 0)
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 6);
			END;
			IF(@LibraryAssistantCount >= 5 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 7) = 0)
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 7);
			END;
			IF(@LibraryAssistantCount >= 10 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 8) = 0)
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 8);
			END;
		END;
END
GO

CREATE TRIGGER [dbo].[TrofeuAlterarSkin]
ON LibraryAssistant
AFTER UPDATE
AS
BEGIN
	DECLARE @IdEmployee INT;
	SET @IdEmployee = (SELECT IdEmployee FROM inserted);
	IF (SELECT COUNT (Player.IdPlayer) FROM Employee
		LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
		WHERE Employee.IdEmployee = @IdEmployee) = 1
		BEGIN
			DECLARE @IdPlayer INT;
			SET @IdPlayer = (SELECT Player.IdPlayer FROM Employee
			LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee);
			DECLARE @SkinAntiga INT;
			DECLARE @SkinNova INT;
			SET @SkinAntiga = (SELECT IdLibrarySkin FROM deleted)
			SET @SkinNova = (SELECT IdLibrarySkin FROM inserted)
			IF @SkinAntiga != @SkinNova AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer and IdTrophy = 9) = 0
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 9);
			END;
		END;
END;
GO

CREATE TRIGGER [dbo].[TrofeuTerminarTarefa]
ON Workflow
AFTER UPDATE
AS
BEGIN
	DECLARE @IdEmployee INT;
	SET @IdEmployee = (SELECT IdEmployee FROM inserted);
	IF (SELECT COUNT (Player.IdPlayer) FROM Employee
		LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
		WHERE Employee.IdEmployee = @IdEmployee) = 1
		BEGIN
			DECLARE @IdPlayer INT;
			SET @IdPlayer = (SELECT Player.IdPlayer FROM Employee
			LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee);
			DECLARE @StatusAntigo INT;
			DECLARE @StatusNovo INT;
			SET @StatusAntigo = (SELECT IdStatus FROM deleted);
			SET @StatusAntigo = (SELECT IdStatus FROM inserted);
			IF @StatusAntigo != 3 AND @StatusNovo != 3 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 14) = 0
			BEGIN
				INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
				(@IdPlayer, 14);
			END;
		END;
END;
GO

CREATE TRIGGER [dbo].[TrofeuPostarSocial]
ON Post
AFTER INSERT
AS
BEGIN
	DECLARE @IdPlayer INT;
	SET @IdPlayer = (SELECT IdPlayer FROM inserted);
	IF (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 15) = 0
		INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
		(@IdPlayer, 15);
END;
GO

CREATE TRIGGER [dbo].[TrofeuComentar]
ON Comment
AFTER INSERT
AS BEGIN
	DECLARE @IdPlayer INT;
	SET @IdPlayer = (SELECT IdPlayer FROM inserted);
	IF (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 16) = 0
		INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
		(@IdPlayer, 16);
END;
GO

CREATE TRIGGER [dbo].[TrofeuCurtir]
ON Likes
AFTER INSERT
AS BEGIN
	DECLARE @IdPlayer INT;
	SET @IdPlayer = (SELECT IdPlayer FROM inserted);
	IF (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 17) = 0
		INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
		(@IdPlayer, 17);
END;
GO

CREATE TRIGGER [dbo].[TrofeuExecutado]
ON Run
AFTER INSERT
AS
BEGIN
	DECLARE @IdAssistant INT;
	SET @IdAssistant = (SELECT IdAssistant FROM inserted);
	DECLARE @IdEmployee INT;
	SET @IdEmployee = (SELECT IdEmployee FROM Assistant WHERE IdAssistant = @IdAssistant);
	IF (SELECT COUNT (Player.IdPlayer) FROM Employee
		LEFT JOIN Player ON Employee.IdEmployee = Player.IdEmployee
		WHERE Employee.IdEmployee = @IdEmployee) = 1
		BEGIN
			DECLARE @IdPlayer INT;
			SET @IdPlayer = (SELECT IdPlayer FROM Player WHERE Player.IdEmployee = @IdEmployee);
			IF(SELECT COUNT (IdRun) FROM Run 
			LEFT JOIN Assistant ON Run.IdAssistant = Assistant.IdAssistant
			LEFT JOIN Employee ON Assistant.IdEmployee = Employee.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee) >= 10 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 10) = 0
				BEGIN
					INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
					(@IdPlayer, 10);
				END;
			IF(SELECT COUNT (IdRun) FROM Run 
			LEFT JOIN Assistant ON Run.IdAssistant = Assistant.IdAssistant
			LEFT JOIN Employee ON Assistant.IdEmployee = Employee.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee) >= 50 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 11) = 0
				BEGIN
					INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
					(@IdPlayer, 11);
				END;
			IF(SELECT COUNT (IdRun) FROM Run 
			LEFT JOIN Assistant ON Run.IdAssistant = Assistant.IdAssistant
			LEFT JOIN Employee ON Assistant.IdEmployee = Employee.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee) >= 100 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 12) = 0
				BEGIN
					INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
					(@IdPlayer, 12);
				END;
			IF(SELECT COUNT (IdRun) FROM Run 
			LEFT JOIN Assistant ON Run.IdAssistant = Assistant.IdAssistant
			LEFT JOIN Employee ON Assistant.IdEmployee = Employee.IdEmployee
			WHERE Employee.IdEmployee = @IdEmployee) >= 1000 AND (SELECT COUNT(IdLibraryTrophy) FROM LibraryTrophy WHERE IdPlayer = @IdPlayer AND IdTrophy = 13) = 0
				BEGIN
					INSERT INTO LibraryTrophy (IdPlayer, IdTrophy) VALUES
					(@IdPlayer, 13);
				END;
		END;
END
GO

CREATE TRIGGER 