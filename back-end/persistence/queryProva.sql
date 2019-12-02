select  C.ID, TopicName, sum(CR.XP) as ISenderXP,  sum(OpponentTable.OpponentXPs) as ReceiverXP, IF(sum(CR.XP)>sum(OpponentTable.OpponentXPs),'Yes','No') as Win
from 1001db.Challenge C, 1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ, 1001db.Topics T, (
	select ReceiverProposal_ID, XP as OpponentXPs, ChallengeID
    from 1001db.Challenge C, 1001db.ChallengeResults CR
    where C.ID = CR.ChallengeID
    group by ReceiverProposal_ID
) as OpponentTable, (
	select SenderProposal_ID, XP as OpponentXPs, ChallengeID
    from 1001db.Challenge C, 1001db.ChallengeResults CR
    where C.ID = CR.ChallengeID
    group by SenderProposal_ID
) as OpponentTable1
where (C.SenderProposal_ID = 1
and CQ.ID = CR.QuestionID
and T.ID = CQ.Topics_ID
and OpponentTable.ChallengeID = C.ID
and OpponentTable.ReceiverProposal_ID = C.ReceiverProposal_ID)
or
(C.ReceiverProposal_ID = 1
and CQ.ID = CR.QuestionID
and T.ID = CQ.Topics_ID
and OpponentTable1.ChallengeID = C.ID
and OpponentTable1.SenderProposal_ID = C.SenderProposal_ID)
group by C.ID
