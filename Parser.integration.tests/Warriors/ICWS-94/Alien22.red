;redcode-x verbose
;name Alien 22
;author Franz
;strategy Two instruction reverse dwarf. Becomes IMP.
;strategy Watch out IMPs
where   EQU -4          ;number to start coundown from
bomb    MOV dat1,@dat1  ;mov istruction to bomb
	DJN bomb,dat1   ;decrement and jump, check not to kill itself
	MOV 0,1         ;IMP
dat1    DAT #where      ;dat bomb and countdown
	END bomb
