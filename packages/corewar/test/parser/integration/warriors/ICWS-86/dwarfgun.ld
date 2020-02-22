;redcode-86
;name Nameless
;author Blameless
ORG	2
MOV.AB	#0,	$-1
JMP.B	$-1,	$0
SPL.B	$7,	$0
JMP.B	$-3,	$0
DAT.F	#0,	#500
DAT.F	#0,	#3
DAT.F	#0,	#5000
MOV.AB	#0,	@-1
DJN.B	$-1,	$-2
MOV.AB	#-200,	$13
MOV.AB	#0,	$13
MOV.AB	#500,	$-7
MOV.AB	#3,	$-7
MOV.I	@-8,	<-9
DJN.B	$-1,	$-9
ADD.AB	#2,	$-11
SPL.B	@-12,	$0
MOV.I	<6,	<5
CMP.AB	#-23,	$5
JMP.B	$-2,	$0
ADD.AB	#2,	$2
JMP.B	@1,	$0
DAT.F	#0,	#-200
DAT.F	#0,	#0
