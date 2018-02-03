;redcode-94
;name Gate-Daemon
;author Richard Hendricks
ORG	0
SPL.B	$2,	$0
JMP.B	$0,	<-3
SUB.AB	#3,	$-2
SPL.B	$2,	$0
JMP.B	$-2,	$0
MOV.I	$-4,	@-3
JMP.B	@-4,	$0
