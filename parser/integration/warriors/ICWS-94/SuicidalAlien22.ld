;redcode-x verbose
;name Suicidal Alien 22
;author Franz
;strategy Two instruction reverse dwarf. Kills itself. Smallest it can be.
;strategy Watch out IMPs
ORG	0
MOV.I	$-1,	$-1	;mov instruction to bomb
DJN.B	$-1,	$-1	;decrement and jump, check not to kill itself
