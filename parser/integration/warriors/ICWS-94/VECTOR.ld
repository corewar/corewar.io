;redcode-94
;name   Vector
;author T.Hsu
ORG	0
SPL.B	$1,	#0
SPL.B	$1,	#0
SPL.B	<0,	#7
DJN.A	@5,	#0
MOV.I	#0,	$2667
JMP.B	$18668,	$16001	; normally this is in a for/rof
JMP.B	$13333,	$10666	; loop, but I wanted to make the
JMP.B	$7998,	$5331	; order of the vectors obvious
JMP.B	$2663,	$-4
