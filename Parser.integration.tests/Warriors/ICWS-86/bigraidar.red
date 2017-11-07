; Big-raidar
; For notes about how this works, see Dewdney's first article,
;   or the "raidar" program.

targ1	dat #0
targ2	dat #0
dst	dat #0
start	mov #201 dst
	mov #-121 targ1
	mov #346 targ2
uploop	mov #42 <targ1
	mov #42 <targ2
	djn uploop dst
scan	mov #-121 targ1
	mov #346 targ2
	mov #201 dst
scango	cmp #42 <targ1
	jmp panic
	cmp #42 <targ2
	jmp panic2
	djn scango dst
	jmp scan
panic	mov #25	dst
	mov #-963 targ1
pan	mov @dst <targ1
	djn pan dst
	jmp @targ1
panic2  mov #25 dst
	mov #1013 targ1
pan2	mov @dst <targ1
	djn pan dst
	jmp @targ1
