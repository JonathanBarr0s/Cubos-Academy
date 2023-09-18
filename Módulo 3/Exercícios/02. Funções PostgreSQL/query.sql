--1
select count(medicamento) from farmacia;

--2
select MIN(idade) from usuarios;

--3
select MAX(idade) from usuarios;

--4
select avg(idade) AS "Media de idade" from usuarios where idade >= 18;

--5
select SUM(estoque) AS "Soma dos produtos Black e Yellow" from farmacia where categoria = 'black' OR categoria = 'yellow';

--6
select categoria, SUM(estoque) from farmacia where categoria is not null group by categoria;

--7
select sum(estoque) from farmacia where categoria is null;

--8
select * from farmacia where categoria is null;

--9
select concat(medicamento, ' (', categoria, ')') from farmacia where categoria is not null;

--10
select concat(id, ' - ', medicamento, ' (', coalesce(categoria, 'sem categoria'), ')') from farmacia where categoria is not null;

--11
select nome, idade, cast(cadastro as date) from usuarios where cadastro >= '2020-01-01' and cadastro <= '2020-12-31'

--12
select nome, idade, email, age(now (), cast(cadastro as timestamp)) from usuarios where idade < 18;

--13
select nome, idade, email, age(cast(now () as date), cast(cadastro as date)) from usuarios where idade > 60;

--14
select categoria, SUM(estoque) from farmacia group by categoria;

--15
select idade, count(idade) from usuarios where idade >= 18 group by idade;

--16
select categoria, sum(estoque) from farmacia group by categoria;