insert into 1001db.TypeInformations(Type, TimeInSec)
 values ('THEORY', 30),
 ('HANDS ON', 40),
 ('CASES', 50);
 
 insert into 1001db.Topics(TopicName)
 values('Investment banking and finance'),
		('Financial Accounting'),
       ('JAVA'),
       ('SQL'),
       ('VBA');
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



