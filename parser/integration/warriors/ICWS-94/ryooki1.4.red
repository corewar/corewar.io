;redcode-94
;name     Ryooki
;kill     Ryooki
;author   T.Hsu
;strategy Just a simple paper
;assert   CORESIZE == 8000 && MAXLENGTH >= 100 && VERSION >= 60
;macro
;-----------------------------------------------------------------------------
;  1.0  Just an imp killing paper.
;  1.1  Use nop and jmz.f in the paper.
;  1.2  Use "mov 0,}0" instead of nop.  Use "spl @nxt" instead of "spl nxt".
;  1.3  Larger due to anti-vampire code.  Use labels instead of numbers.
;  1.4  Use "nop >0,0" instead of "mov 0,}0".

	    org     boot_paper

nxt_paper   equ     -3365

boot_paper  spl     1 ,0
	    spl     1 ,0
	    mov.i   -1,#0

p_src       nop     >0        ,0            ; B-fld holds source
p_cpy       mov.i   <p_src    ,{p_dst
p_dst       spl     @nxt_paper,>800         ; A-fld holds destination
	    mov.i   p_bomb    ,{p_dst       ; anti-imp  instruction
	    mov.i   p_bomb    ,}25          ; anti-vamp instruction
	    jmz.f   *p_cpy    ,*p_cpy
p_bomb      dat     <2667     ,<2667*2      ; bomb designed to kill imps

cnt         for     90
	    dat     0,0
	    rof
