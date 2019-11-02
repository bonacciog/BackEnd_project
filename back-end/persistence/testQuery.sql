 -- delete from 1001db.users where ID in (8,9,10)
-- ALTER TABLE 1001db.users AUTO_INCREMENT=1
/*insert into 1001db.users(Firstname,Lastname,University)
values ('Giovanni','Bonaccio','unibo'),
		('Simone','Bartoli','unibo'),
        ('Paolo','Caligiana','unibo')*/
        
/*insert into 1001db.Topics(FatherCategory, TopicName)
values ('Informatica','DBMA'),
		('Informatica','Graphics'),
        ('Informatica','AI')*/
      
/*select *
from 1001db.topics, 1001db.users;*/
-- alter table 1001db.users auto_increment=1
/*
insert into 1001db.accumulatedpoints(Users_ID, Topics_ID, XP)
values (1,1,30),
		(1,2,0),
        (1,3,50),
        (2,1,50),
        (2,2,10),
        (2,3,40),
        (3,1,20),
        (3,2,60),
        (3,3,20)*/
        
select U.ID, Firstname, Lastname, sum(XP) AS SUMXPs
from 1001db.topics T, 1001db.users U, 1001db.accumulatedpoints P
where T.ID=P.Topics_ID
and  U.ID=P.Users_ID
and FatherCategory = 'Informatica'
group by U.ID
order by sum(XP) DESC