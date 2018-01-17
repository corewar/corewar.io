;      SPLAT.S
;      R. PALUDAN
;
ORG	0
JMZ.B	$0,	<-1
SPL.B	@-2,	$0
JMP.B	$-2,	$0
