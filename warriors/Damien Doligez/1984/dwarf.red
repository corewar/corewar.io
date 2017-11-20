;redcode
;name Dwarf
;author A. K. Dewdney
;assert CORESIZE % 5 == 0

	DAT		-1
start	ADD	#5,	-1
	MOV	#0,	@-2
	JMP	-2

	END	start