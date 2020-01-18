;redcode-94
;name   Single Vector
;author T.Hsu

imp_sz  equ     2667

        dat     0      ,#imp+imp_sz*3
boot    spl     1      ,#imp+imp_sz*2
        spl     1      ,#imp+imp_sz
vector  djn.a   @vector,#imp

imp     mov.i   #0,imp_sz

        end     boot
