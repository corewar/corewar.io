;redcode-x verbose
;name Suicidal Alien 22
;author Franz
;strategy Two instruction reverse dwarf. Kills itself. Smallest it can be.
;strategy Watch out IMPs
where   EQU -1          ;where to start coundown from
bomb    MOV -1,where    ;mov instruction to bomb
	DJN bomb,bomb   ;decrement and jump, check not to kill itself
	END bomb
