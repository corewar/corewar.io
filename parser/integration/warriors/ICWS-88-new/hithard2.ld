;redcode-88
;name Nameless
;author Blameless
ORG	0
MOV.AB	#4,	$9
MOV.AB	#11,	$9
MOV.I	$8,	$-8008
ADD.F	$7,	$-1
JMN.B	$-2,	$-2
MOV.AB	#-8008,	$-3
SUB.F	$3,	$4
DJN.B	$-5,	$2
MOV.I	$3,	<4
JMP.B	$-1,	$4
SPL.B	$0,	$11
DAT.F	#0,	#-10
DAT.F	#0,	#-10
