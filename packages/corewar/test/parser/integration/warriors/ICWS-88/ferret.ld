;redcode-88
;name Nameless
;author Blameless
ORG	0
MOV.AB	#4908,	$9
CMP.I	<3,	<8
MOV.I	$9,	@7
CMP.I	<1,	<6
MOV.I	$7,	$-5
DJN.B	$-4,	$4
MOV.I	$4,	<4
DJN.B	$-1,	<3
ADD.AB	#3,	$2
JMP.B	$-3,	$0
DAT.F	#0,	#-10
SPL.B	$0,	$0
