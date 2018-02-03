;redcode-88
;name Nameless
;author Blameless
ORG	3
SPL.B	$-1,	$0
DAT.F	#0,	#509
DAT.F	#0,	#16
ADD.AB	#51,	$9
ADD.AB	#16,	$8
MOV.I	$-5,	@7
DJN.B	$-2,	$-5
MOV.AB	#509,	$-6
DJN.B	$-5,	$-6
MOV.AB	#-64,	$3
MOV.I	$-9,	$-10
JMP.B	$-8,	$0
DAT.F	#0,	#-64
