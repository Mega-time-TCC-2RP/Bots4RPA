--Triggers troféus

SELECT * FROM UserName
SELECT * FROM TROPHY
SELECT * FROM LibraryTrophy

CREATE TRIGGER [dbo].[TrofeuValidacao]
ON UserName
AFTER UPDATE
AS
BEGIN
	--IF (SELECT COUNT(IdUser) FROM deleted) > 1 AND (SELECT COUNT(IdUser) FROM inserted) > 1
	--	BEGIN 
	--		DECLARE @Contador INT;
	--		SET @Contador = 0
	--		WHILE (@Contador < )
	--	End;
		DECLARE @ValidacaoAntiga INT;
		DECLARE @ValidacaoAtual INT;
		DECLARE @IdUsuario INT;
		SET @IdUsuario = (SELECT IdUser FROM inserted);
		SET @ValidacaoAntiga = (SELECT UserValidation FROM deleted);
		SET @ValidacaoAtual = (SELECT UserValidation FROM inserted);
		IF @ValidacaoAntiga = 0 AND @ValidacaoAtual = 1

		DECLARE @IdPlayer INT;
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
END
GO