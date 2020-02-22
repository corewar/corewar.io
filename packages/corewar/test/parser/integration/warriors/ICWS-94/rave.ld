;redcode-94
;name Rave
;author Stefan Strack
;strategy Carpet-bombing scanner based on Agony and Medusa's
;strategy (written in ICWS'94)
;strategy Submitted: @date@
ORG	1
SUB.F	$11,	$1
CMP.I	$125,	$113
SLT.A	#24,	$-1
DJN.F	$-3,	<-308
MOV.AB	#14,	$2
MOV.I	$4,	>-4
DJN.B	$-1,	#0
SUB.AB	#14,	$-6
JMN.B	$-8,	$-8
SPL.A	$0,	$0
MOV.I	$1,	<-4
DAT.F	<-42,	<-42
