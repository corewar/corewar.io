; This is RAIDAR, a program suggested by A.K. Dewdney's original Scientific
; American article about Core War.  A slower and more clumsy version of this
; program, called BIG-RAIDAR, is also supplied; BIG-RAIDAR is slower to move,
; but has a higher chance of stepping on opponents and is easier to watch.

; Picket width is 32
; Inner distance (btwn picket edge and program edge) is 164
; Program width is 25 (Not including leading 3 data lines)
; On panic, program jumps 400

targ1	dat #0
targ2	dat #0
dst	dat #0
start	mov #33 dst
	mov #-163 targ1
	mov #223 targ2       	; 165 + dist targ2->end-of-prog + 1 + 32
uploop	mov #42 <targ1
	mov #42 <targ2
	djn uploop dst
scan	mov #-163 targ1
	mov #223 targ2		; ditto as above
	mov #33 dst
scango	cmp #42 <targ1
	jmp panic
	cmp #42 <targ2
	jmp panic2
	djn scango dst
	jmp scan
panic	mov #25	dst
	mov #-400 targ1
pan	mov @dst <targ1
	djn pan dst
	jmp @targ1
panic2  mov #25 dst
	mov #425 targ1
pan2	mov @dst <targ1
	djn pan dst
	jmp @targ1
