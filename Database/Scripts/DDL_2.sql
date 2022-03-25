--creating our database
create database DoisRP_tarde;
GO;

USE DoisRP_tarde;
GO;

--crate UserType table
create table UserType(
        IdUserType INT PRIMARY KEY Identity not null,
        TituloUserType int
);
GO

--create usuario table
create table Usuario(
        IdUsuario INT PRIMARY KEY Identity not null,
        Nome varchar(256) not null,
        Email varchar(256) not null unique,
        Senha varchar(100) not null,
        CPF char(11) not null unique,
        FotoUsuario text,
        Telefone char(11) unique,
        DataNasc DateTime not null,
        RG varchar(15) not null,
        --add the foreign key
        IdUserType INT FOREIGN KEY REFERENCES UserType(IdUserType)
);
GO

--create Empresa table
create table Empresa(
        IdEmpresa INT PRIMARY KEY Identity not null,
        NomeFantasia varchar(100) not null,
        RazaoSocial varchar(max),
        Endereco varchar(256) not null,
        Telefone char(11) not null unique,
        Email varchar(256) not null unique,
        Senha varchar(100) not null,       
        CNPJ varchar(15) not null unique,
        FotoEmpresa text
);
GO
--create Cargo table
create table Cargo(
        IdCargo INT PRIMARY KEY Identity not null,
        TituloCargo varchar(45) not null
);
GO
--create Funcionario table
create table Funcionario(
        IdFuncionario INT PRIMARY KEY Identity not null,
        Confirmacao BIT not null,

        --add the foreign keys
        IdUsuario INT FOREIGN KEY REFERENCES Usuario(IdUsuario),
        IdEmpresa INT FOREIGN KEY REFERENCES Empresa(IdEmpresa),
        IdCargo INT FOREIGN KEY REFERENCES Cargo(IdCargo)

);
GO

--create Jogador table
create table Jogador(
        IdJogador INT PRIMARY KEY Identity not null,
        Pontos int,

        --fk
        IdFuncionario INT FOREIGN KEY REFERENCES Funcionario(IdFuncionario)
);
GO

--create statustask table
create table StatusTask(
        IdStatus INT PRIMARY KEY Identity not null,
        Titulo varchar(100) not null,

);
GO

--create Card table
create table Task(
        IdTask INT PRIMARY KEY Identity not null,
        DataHora DateTime,
        Texto varchar(max) not null,
        --add the foreign keys
        IdFuncionario INT FOREIGN KEY REFERENCES Funcionario(IdFuncionario),
        IdStatus INT FOREIGN KEY REFERENCES StatusTask(IdStatus)
);
GO

--create Skin table
create table Skin(
        IdSkin INT PRIMARY KEY Identity not null,
        Title varchar(100) not null,
        SkinImages text unique,
        SkinDescription varchar(max)
);
GO

--create LibrarySkins table
create table LibrarySkins(
        IdLibrarySkins INT PRIMARY KEY Identity not null,
        UnlockData DateTime,

        --add foreign keys
        IdJogador INT FOREIGN KEY REFERENCES Jogador(IdJogador),
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
        IdJogador INT FOREIGN KEY REFERENCES Jogador(IdJogador)
);
GO

--create Likes table
create table Likes(
        IdLikes INT PRIMARY KEY Identity not null,
        LikesNumber int,

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost),
        IdJogador INT FOREIGN KEY REFERENCES Jogador(IdJogador)
);
GO

--create Comment table
create table Comment(
        IdComment int PRIMARY KEY Identity not null,
        Title varchar(45) not null,
        CommentDescription varchar(max),
        DataComment DateTime,
        --CommentImages text

        --foreign keys
        IdPost INT FOREIGN KEY REFERENCES Post(IdPost),
        IdJogador INT FOREIGN KEY REFERENCES Jogador(IdJogador)
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
        IdJogador INT FOREIGN key REFERENCES Jogador(IdJogador),
        IdTrophy INT FOREIGN KEY REFERENCES Trophy(IdTrophy)
);
GO

