;redcode-86
;name Nameless
;author Blameless
ORG	2
DAT.F	#0,	#7
DAT.F	#0,	#13
MOV.I	<-2,	<-1
JMN.B	$-1,	$-3
MOV.AB	#7,	$3
MOV.AB	#13,	$3
JMP.B	$3,	$0
