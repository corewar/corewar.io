;redcode-94
;name   Vector
;author T.Hsu

imp_sz  equ     2667

boot    spl     1      ,#0
        spl     1      ,#0
        spl     <0     ,#vector+1
        djn.a   @vector,#0

imp     mov.i   #0,imp_sz

        jmp     imp+imp_sz*7,imp+imp_sz*6   ; normally this is in a for/rof
        jmp     imp+imp_sz*5,imp+imp_sz*4   ; loop, but I wanted to make the
        jmp     imp+imp_sz*3,imp+imp_sz*2   ; order of the vectors obvious
vector  jmp     imp+imp_sz  ,imp

        end     boot
