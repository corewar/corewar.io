;redcode-88
;name Nameless
;author Blameless
ORG	0
MOV.AB	#-11,	$10
CMP.I	<18,	<9
JMP.B	$9,	$0
DJN.B	$-2,	$16
MOV.AB	#-11,	$6
MOV.AB	#5462,	$14
MOV.I	$12,	<13
MOV.I	$11,	<3
DJN.B	$-2,	$11
MOV.AB	#5462,	$10
JMP.B	$-10,	$0
MOV.I	$6,	@8
MOV.I	$5,	@-2
MOV.I	$3,	<6
MOV.I	$2,	<-4
JMP.B	$-14,	$0
SPL.B	$0,	$0
JMP.B	$-1,	$0
DAT.F	#0,	#0
DAT.F	#0,	#5462
