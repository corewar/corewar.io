;      TRAPPER.S
;      FRED B. WADE
;
ORG	0
JMP.B	$3,	$0
DAT.F	#0,	$0
SPL.B	$0,	$0
MOV.I	$-1,	<-2
JMN.B	$-1,	$6
MOV.AB	#0,	$-4
MOV.I	$-5,	<-5
JMZ.B	$-1,	$3
MOV.AB	#0,	$-7
JMP.B	$-6,	$0
DAT.F	#0,	$1
