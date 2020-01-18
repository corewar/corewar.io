;redcode-88
;name Nameless
;author Blameless
ORG	0
MOV.I	$8,	<11
MOV.I	$8,	<10
JMP.B	$-2,	$9
MOV.AB	#-16,	$8
MOV.I	$6,	<7
JMN.B	$-1,	$6
MOV.AB	#-16,	$5
JMP.B	$-7,	$0
JMP.B	$-1,	$0
SPL.B	$0,	$0
DAT.F	#0,	#0
DAT.F	#0,	#-16
