;redcode-88
;name Nameless
;author Blameless
ORG	0
MOV.I	$12,	@10
SUB.AB	#4,	$9
ADD.AB	#4,	$10
JMZ.B	$-3,	$12
MOV.I	$7,	@7
DJN.B	$-1,	$6
MOV.I	$2,	<0
MOV.I	$4,	<-1
JMZ.B	$-2,	$3
JMP.B	$0,	$0
DAT.F	#0,	#-11
DAT.F	#0,	#-8
SPL.B	$14,	$0
SPL.B	$1,	$0
DJN.B	$-1,	$1
DAT.F	#0,	#0
