; reverse dwarf
; variation on the the classic DWARF;
; it just goes backwards

bomb    dat     #4
start   sub     #5,     bomb
        mov     #0,     @bomb
        jmp     start
	end     start
