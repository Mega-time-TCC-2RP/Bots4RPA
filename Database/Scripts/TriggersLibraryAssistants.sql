--Triggers Library Assistant

DROP TRIGGER [dbo].[AssistantsLibraries];
GO

CREATE TRIGGER [dbo].[AssistantsLibraries]
ON Assistant
AFTER INSERT
AS
BEGIN
		DECLARE @IdAssistant INT;
		DECLARE @IdEmployee INT;
		DECLARE @AssistantName VARCHAR;
		SET @IdAssistant = (SELECT IdAssistant FROM inserted);
		SET @IdEmployee = (SELECT IdEmployee FROM inserted);
		SET @AssistantName = (SELECT AssistantName FROM inserted);

		DECLARE @IdCorporation INT;
		SET @IdCorporation = (
			SELECT IdCorporation FROM Employee
			WHERE IdEmployee = @IdEmployee
		);

		INSERT INTO LibraryAssistant (IdEmployee, IdAssistant, Nickname)
				VALUES(@IdEmployee, @IdAssistant, @AssistantName);

		DECLARE @Contadora INT;
		SET @Contadora = 1;

		WHILE(SELECT COUNT(IdEmployee) FROM Employee) >= @Contadora
		BEGIN
			DECLARE @IdCorporationEmployee INT;
			DECLARE @IdUserType INT;
			DECLARE @IdEmployeeQuery INT;
			WITH EmployeeByRow AS (SELECT IdEmployee, IdCorporation, ROW_NUMBER() OVER (ORDER BY IdEmployee) AS RowNumber FROM Employee)
			SELECT @IdCorporationEmployee = IdCorporation FROM EmployeeByRow WHERE RowNumber = @Contadora;
			WITH EmployeeByRow AS (SELECT IdEmployee, IdCorporation, ROW_NUMBER() OVER (ORDER BY IdEmployee) AS RowNumber FROM Employee)
			SELECT @IdEmployeeQuery = IdEmployee FROM EmployeeByRow WHERE RowNumber = @Contadora;
			SET @IdUserType = (SELECT IdUserType FROM UserName 
			LEFT JOIN Employee 
			ON Employee.IdUser = UserName.IdUser 
			WHERE Employee.IdEmployee = @IdEmployeeQuery);

			IF @IdUserType = 2 AND @IdCorporationEmployee = @IdCorporation AND @IdEmployeeQuery != @IdEmployee
			BEGIN
				INSERT INTO LibraryAssistant (IdEmployee, IdAssistant, Nickname)
				VALUES(@IdEmployeeQuery, @IdAssistant, @AssistantName);
			END;
		END;
END
GO