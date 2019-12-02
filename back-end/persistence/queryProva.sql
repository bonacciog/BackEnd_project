select  C.ID, TopicName, C.ReceiverProposal_ID as Opponent, sum(CR.XP) as MYXP, IF(sum(CR.XP)>sum(OpponentTable.OpponentXPs),'true','false') as Win
from 1001db.Challenge C, 1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ, 1001db.Topics T, (
	select ReceiverProposal_ID, XP as OpponentXPs, ChallengeID
    from 1001db.Challenge C, 1001db.ChallengeResults CR
    where C.ID = CR.ChallengeID
    group by ReceiverProposal_ID
) as OpponentTable
where C.SenderProposal_ID = 1
and CQ.ID = CR.QuestionID
and T.ID = CQ.Topics_ID
and OpponentTable.ChallengeID = C.ID
and OpponentTable.ReceiverProposal_ID = C.ReceiverProposal_ID
UNION
select  C.ID, TopicName, C.SenderProposal_ID, sum(CR.XP) as MYXP, IF(sum(CR.XP)>sum(OpponentTable.OpponentXPs),'true','false') as Win
from 1001db.Challenge C, 1001db.ChallengeResults CR, 1001db.ChallengeQuestions CQ, 1001db.Topics T, (
	select SenderProposal_ID, XP as OpponentXPs, ChallengeID
    from 1001db.Challenge C, 1001db.ChallengeResults CR
    where C.ID = CR.ChallengeID
    group by SenderProposal_ID
) as OpponentTable
where C.ReceiverProposal_ID = 1
and CQ.ID = CR.QuestionID
and T.ID = CQ.Topics_ID
and OpponentTable.ChallengeID = C.ID
and OpponentTable.SenderProposal_ID = C.SenderProposal_ID