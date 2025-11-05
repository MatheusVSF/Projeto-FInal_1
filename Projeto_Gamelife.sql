Drop table Agente cascade;
Drop table Tarefa cascade;
Drop table Item cascade;
Drop table Tag cascade;
Drop table Conquista cascade;
drop table Usuario cascade;

CREATE TABLE Usuario (
	id VARCHAR(15) PRIMARY KEY,
	email VARCHAR NOT NULL,
	senha VARCHAR NOT NULL, 
	nome VARCHAR NOT NULL,
	classe VARCHAR NOT NULL, 
	xp int, 
	nivel int, 
	moedas numeric(10, 2),
	ativo bool
);
CREATE TABLE Conquista (
	id VARCHAR(15) PRIMARY KEY, 
	id_user VARCHAR(15), 
	FOREIGN KEY (id_user) REFERENCES Usuario(id),
	titlo VARCHAR unique, 
	descricao VARCHAR, 
	meta INT, 
	progresso INT, 
	concluido bool
);

create table Tag (
	id VARCHAR(15) primary key, 
	conquista_id VARCHAR(15), 
	FOREIGN key (conquista_id) references Conquista(id),
	nome_comquista varchar,
	Foreign key (nome_comquista) references Conquista(titlo)
);

create table Item (
	id VARCHAR(15) primary key, 
	user_id VARCHAR(15), 
	foreign key (user_id) references Usuario(id), 
	nome varchar, 
	sprit varchar, 
	descricao varchar, 
	preco numeric(10, 2)
); 

create table Tarefa (
	id VARCHAR(15) primary key, 
	user_id VARCHAR(15), 
	foreign key (user_id) references Usuario(id), 
	tipo varchar, 
	prazo date, 
	dificuldade varchar, 
	status bool
);

Create table Agente (
	user_id VARCHAR(15), 
	foreign key (user_id) references Usuario(id), 
	valor_interacao int
);

SELECT * FROM Usuario
