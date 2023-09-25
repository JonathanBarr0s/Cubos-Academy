--1
create database Conexão_Nodejs_com_PostgreSQL;

create table autores (
  id serial primary key,
  nome text not null,
  idade integer
);

--4
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    nome text NOT NULL,
    genero text,
    editora text,
    data_publicacao DATE,
    autor_id INT REFERENCES autores(id)
);