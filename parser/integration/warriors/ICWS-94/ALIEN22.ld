;redcode-x verbose
;name Alien 22
;author Franz
;strategy Two instruction reverse dwarf. Becomes IMP.
;strategy Watch out IMPs
ORG	0
MOV.I	$3,	@3	;mov istruction to bomb
DJN.B	$-1,	$2	;decrement and jump, check not to kill itself
MOV.I	$0,	$1	;IMP
DAT.F	#0,	#-4	;dat bomb and countdown
