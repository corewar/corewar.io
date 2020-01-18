;redcode-88
;name Nameless
;author Blameless
ORG	0
JMZ.B	$0,	<7
CMP.I	$6,	@6
JMP.B	$3,	$0
SUB.AB	#15,	$4
JMP.B	$-4,	$0
MOV.I	$2,	@2
JMP.B	$-6,	$0
DAT.F	#0,	#-14
