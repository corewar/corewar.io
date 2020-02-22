;redcode-86
;name Nameless
;author Blameless
ORG	3
MOV.AB	#0,	$-1
JMP.B	$-1,	$0
DAT.F	#0,	#9
SPL.B	$-2,	$0
SPL.B	$4,	$0
ADD.AB	#-16,	$-3
MOV.AB	#0,	@-4
JMP.B	$-4,	$0
SPL.B	$2,	$0
JMP.B	$-1,	$0
MOV.I	$0,	$1
