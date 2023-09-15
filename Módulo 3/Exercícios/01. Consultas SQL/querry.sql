--1
select id, compositor from musicas;

--2
select composicao, tempo from musicas where tempo > 240;

--3
select id, compositor, composicao from musicas where id > 47 and id < 123;

--4
select * from musicas where compositor is not null and tempo < 300 and compositor != 'Bach';

--5
select composicao, tempo from musicas where compositor = 'Mozart' OR compositor = 'Bach';

--6
select * from musicas order by id desc;

--7
select * from musicas order by tempo desc;

--8
select * from musicas order by tempo limit 5;

--9
select * from musicas order by tempo desc limit 10;

--10
select * from musicas order by tempo limit 10 offset 5;

--11
select * from musicas order by id offset 40 limit 10;

--12
select * from musicas order by id offset 60 limit 12;

--13
select distinct compositor from musicas where compositor is not null;

--14
select distinct compositor, composicao from musicas;

--15
select * from musicas where compositor like 'Bra%';

--16
select * from musicas where ritmo like '%troppo';

--17
select * from musicas where composicao ilike '%quartet%';

--18
select * from musicas where lower(composicao) not like '%quintet%';
