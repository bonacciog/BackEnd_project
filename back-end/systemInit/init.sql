insert into 1001db.TypeInformations(Type, TimeInSec)
 values ('THEORY', 20),
 ('HANDS ON', 30),
 ('CASES', 30);
 
 insert into 1001db.Topics(TopicName)
 values('Investment banking and finance'),
       ('JAVA');
insert into 1001db.ExecutionTable values('chiave');

INSERT INTO `1001db`.`CompanySizes`
(`Quantity`)
VALUES
('0-1 employees'),
('2-10 employees'),
('11-50 employees'),
('51-200 employees');

INSERT INTO `1001db`.`CompanyTypes`
(`Name`)
VALUES
('Public company'),
('Self-employed'),
('Government agency'),
('Nonprofit'),
('Sole proprietorship'),
('Privately held'),
('Partnership');

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));



