insert into 1001db.Typeinformations(Type, TimeInSec)
 values ('Definitions', 30),
 ('HandsOn', 40),
 ('Cases', 60);
 
 insert into 1001db.Topics(TopicName)
 values('Finance'),
       ('Programming Tools');
 
 insert into 1001db.Executiontable values('chiave');
insert into 1001db.Challengequestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)
values('Marianne Merill is a really cute girl, always wearing yellow canary dresses; she graduated cum laude in maths and she is now working in the Equity Capital Markets team. She amazed recruiters with her analytical skills, but sometimes seems to lack of business sense and basic definitions. You are good friends and she always asks you to sum up some basic concepts she would feel ashamed to ask others. This morning you found the following question on your internal chat coming from her: “What does Enterprise value really represent?” You have to be sure you’ll be helpful, thus you type back:',
'“The value of a company’s core business operations to all the investors in the company.”',
'“The value of a company’s whole business operations to all the investors in the company.”',
'“The value of a company’s equity to only equity investors.”',
'“The value of a company’s equity to all the investors in the company.”',
10,1,null);

insert into 1001db.Challengequestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)
values('What is Value of equity actually?

You refrain from laughing in order not to offend her and say:
',
'“The value of the whole business to the only equity investors” ',
'“The value of the equity (only) to the only equity investors”',
'“The value of the core business to the only equity investors”',
'“The value of the equity (only) to all the investors”',
10,1,null),
('“I see, hence when I am calculating the Value of equity, what are the figures I have to leave out from the equation? “',

'“You leave out current liabilities and long term debt plus the “other liabilities””',
'“You leave out the accounts payable, current debt and accrued liabilities”',
'“You leave out the long term debt, the additional paid in capital and the accumulated deficit”',
'“You leave out the current debt, the long term debt and the accumulated deficit”.',
10,1,null);

insert into 1001db.Questiontypeinformation(ChallengeQuestions_ID, TypeInformations_ID)
values(1,1),(2,1),(3,1);

insert into 1001db.Challengequestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)
values('Ok, thanks a lot! I’ll use your precious advice. Ops, wait a moment… Coming back to the enterprise value, I have a few doubts: as it is -by definition - the value of a company’s core business operations to all the investors in the company, should I SUBTRACT from calculations cash, assets held for sale and assets of discontinued business?', 
'Yes, definitely. Anyhow, be aware that the cash you are subtracting should be the excess cash to be precise.',
'Yes, definitely',
'No, these are not “non-operating assets”',
'No. Subtract only cash and assets held for sale.',
10,1,'Companies always need buffer to stay alive, thus the cash you know can be considered not necessary to the operating business is the amount you actually have to subtract.'),
('Ok. So how about subtracting also Accounts receivable, current content assets and current tax receivables?',
'That’s wrong! They are operating assets!',
'That’s only partly right. Do not subtract current tax receivables',
'That’s right. They are non operating assets',
'That’s right. Rememeber to include also excess cash in your subtraction!',
10,1,null),
('With regards to current financial assets, do you subtract them in this calculation?',
'It actually depends on how liquid they are and how core to the business they are',
'Yes, always do it',
'No, never do it.',
'It actually depends on how liquid they are.',
10,1,null),
('Perfect… Then I may consider PPE something which is fixed and thus non operating. Hence I am going to subtract them from the equity value, right?',
'No, don’t do it!',
'Exactly',
'Yes, but it depends how core they are',
'None of the previous',
10,1,null),
('Ok. Last question, I promise!: since we use PPE in our operating activities and thus we don’t subtract them, the situation is different concerning goodwill and other intangibles, right? I guess I am going to subtract them from the equity value !',
'No, don’t do it!',
'Yes, always do it.',
'You cannot say a priori.',
'It depends on the kind of company acquiring the other company.',
10,1,null);

insert into 1001db.Questiontypeinformation(ChallengeQuestions_ID, TypeInformations_ID)
values(4,2),(5,2),(6,2),(7,2),(8,2);

insert into 1001db.Challengequestions(QuestionText, Answer_A, Answer_B, Answer_C, Answer_D, XPValue, Topics_ID, Explanation)
values('I see… Now I feel more confident about the report I have to handle my manager tomorrow. You know, I performed the DCF analysis to come up with the right multiples. There’s this start up which still faces net losses which wants to target another smaller company with a leverage buyout. He wants me to analyze the current value of the start up, but I’m afraid if I’m stressing the right multiple. I guess I should focus on P/E. What do you think?',
'Why don’t you focus more on E.V/EBITDA?',
'That’s a good idea. P/E is really useful to understand how much the investors are appreciating this company.',
'Try to focus on E.V/Sales',
'Why don’t you focus more on Market capitalization/Net Income?',
10,1,'E.V/EBITDA would be a proper multiple to analyze the value of the company because EBITDA allows to understand the amount of cash available, which is fundamental for a company which wants to undergo a LBO and also enables to value a firm facing net losses, given that EBITDA is almost for sure still positive.'),
('On October 31st  after the memorandum of understanding, While FCA shares soared 8.7 per cent, PSA shares fell 12.8 per cent. Analysts at Citi pointed out that this fact was caused by:',
'The lack of cash out for PSA’s shareholders, who were asked to remain patient.',
'The fact that FCA executive Mike Manley would drive the ship, leaving out PSA executive Mr. Tavares as the number 2.',
'The disinvestments that PSA has been forced to do in order to cash out its shareholders',
'The pressure of the French government for the closure of several plants.',
10,1,null);
insert into 1001db.Questiontypeinformation(ChallengeQuestions_ID, TypeInformations_ID)
values(9,3),(10,3);
-- select * from 1001db.typeinformations