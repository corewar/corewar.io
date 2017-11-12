;      PMJUMP.S
;      PAOLA MONTRASIO
;
ORG	0
JMP.B	$2,	$0
DAT.F	#0,	$0
SPL.B	$8,	$0
MOV.AB	#11,	$-2
MOV.I	@-3,	<10
DJN.B	$-1,	$-4
SPL.B	@3,	$0
ADD.AB	#500,	$2
JMZ.B	$-5,	$-7
DAT.F	#0,	$800
MOV.I	$0,	$2
MOV.I	$0,	$2
