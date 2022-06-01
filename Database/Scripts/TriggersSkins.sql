CREATE TRIGGER [dbo].[AdquirirSkins]
ON Player
AFTER INSERT
AS
BEGIN
	DECLARE @IdPlayer INT;
	SET @IdPlayer = (SELECT IdPlayer FROM inserted);
	DECLARE @Contadora INT;
	SET @Contadora = 1;
	WHILE(SELECT COUNT(IdSkin) FROM Skin) >= @Contadora
	BEGIN
		DECLARE @IdSkin INT;
		WITH SkinByRow AS (SELECT Title, IdSkin, ROW_NUMBER() OVER (ORDER BY IdSkin) AS RowNumber FROM Skin)
		SELECT @IdSkin = IdSkin FROM SkinByRow WHERE RowNumber = @Contadora;
		INSERT INTO LibrarySkins(IdSkin, IdPlayer) VALUES
		(@IdSkin, @IdPlayer);
		SET @Contadora = @Contadora + 1;
	END;
END;
GO

----Dar as skins para os players que já existem
--DECLARE @ContadoraPlayer INT;
--SET @ContadoraPlayer = 1;
--WHILE (SELECT COUNT(IdPlayer) FROM Player) >= @ContadoraPlayer
--BEGIN
--	DECLARE @IdPlayer INT;
--	WITH PlayerByRow AS (SELECT IdPlayer, ROW_NUMBER() OVER (ORDER BY IdPlayer) AS RowNumber FROM Player)
--	SELECT @IdPlayer = IdPlayer FROM PlayerByRow WHERE RowNumber = @ContadoraPlayer;
--	DECLARE @Contadora INT;
--	SET @Contadora = 1;
--	WHILE(SELECT COUNT(IdSkin) FROM Skin) >= @Contadora
--	BEGIN
--		DECLARE @IdSkin INT;
--		WITH SkinByRow AS (SELECT Title, IdSkin, ROW_NUMBER() OVER (ORDER BY IdSkin) AS RowNumber FROM Skin)
--		SELECT @IdSkin = IdSkin FROM SkinByRow WHERE RowNUMBER = @Contadora;
--		IF (SELECT COUNT(IdLibrarySkins) FROM LibrarySkins WHERE IdPlayer = @IdPlayer AND IdSkin = @IdSkin) = 0
--		BEGIN
--			INSERT INTO LibrarySkins(IdSkin, IdPlayer) VALUES
--			(@IdSkin, @IdPlayer);
--		END;
--		SET @Contadora = @Contadora + 1;
--	END;
--	SET @ContadoraPlayer = @ContadoraPlayer + 1;
--END;