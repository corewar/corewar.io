; Chang1: Runner-up of the First Core War Tournament
; 	  by Morrison J. Chang
	mov	#0,	-1
	jmp	-1
	dat		#9
start	spl	-2
	spl	4
	add	#-16,	-3
	mov	#0,	@-4
help	jmp	-4
	spl	2
	jmp	-1
finish  mov	0,	1
	end	start
