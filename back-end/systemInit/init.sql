insert into 1001db.TypeInformations(Type, TimeInSec)
 values ('THEORY', 20),
 ('HANDS ON', 30),
 ('CASES', 30);
 
 insert into 1001db.Topics(TopicName)
 values('Investment banking and finance'),
       ('JAVA');
insert into 1001db.ExecutionTable values('chiave');
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
