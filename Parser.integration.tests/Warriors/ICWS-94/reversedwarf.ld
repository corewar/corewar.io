; reverse dwarf
; variation on the the classic DWARF;
; it just goes backwards
ORG	1
DAT.F	#0,	#4
SUB.AB	#5,	$-1
MOV.AB	#0,	@-2
JMP.B	$-2,	$0
