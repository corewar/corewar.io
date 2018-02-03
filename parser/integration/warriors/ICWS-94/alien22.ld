;redcode-94
;name Alien 22
;author Franz
;strategy Two instruction reverse dwarf. Becomes IMP.
;strategy Watch out IMPs
ORG	0
MOV.I	$3,	@3
DJN.B	$-1,	$2
MOV.I	$0,	$1
DAT.F	#0,	#-4
