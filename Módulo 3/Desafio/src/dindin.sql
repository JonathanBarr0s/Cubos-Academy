create database dindin;

create table usuarios (
  id serial primary key,
  nome text,
  email text unique not null,
  senha text not null
);

create table categorias (
  id serial primary key,
  descricao text not null
);

insert into categorias (descricao)
values
  ('Alimentação'),
  ('Assinaturas e Serviços'),
  ('Casa'),
  ('Mercado'),
  ('Cuidados Pessoais'),
  ('Educação'),
  ('Família'),
  ('Lazer'),
  ('Pets'),
  ('Presentes'),
  ('Roupas'),
  ('Saúde'),
  ('Transporte'),
  ('Salário'),
  ('Vendas'),
  ('Outras receitas'),
  ('Outras despesas');
  

create table transacoes (
  id serial primary key,
  descricao text,
  valor int,
  data timestamp with time zone ,
  categoria_id serial references categorias(id) not null,
  usuario_id serial references usuarios(id) not null,
  tipo text
 );
 