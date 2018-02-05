;redcode-88
;name Nameless
;author Blameless
ORG	0
JMP.B	$4,	$0
MOV.AB	#0,	$-2
MOV.AB	#0,	$-3
JMP.B	$-2,	$0
SPL.B	$-3,	$0
SPL.B	$7,	$0
SPL.B	$2,	$0
JMP.B	$0,	$0
JMP.B	$0,	$0
SPL.B	$0,	$0
JMP.B	$-1,	$0
DAT.F	#0,	#-16
MOV.I	$-2,	<-1
MOV.I	$-4,	<-2
SUB.AB	#14,	$-3
JMN.B	$-3,	$-4
MOV.AB	#-16,	$-5
MOV.AB	#0,	<-6
SUB.AB	#15,	$-7
JMN.B	$-2,	$-8
MOV.AB	#-16,	$-9
JMP.B	$-9,	$0
