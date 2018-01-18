;redcode
;name RotLD TNG
;author Nandor Sieben
;Return of the Living Dead The Next Generation

;assert MAXPROCESSES > 60
;assert VERSION >= 60

dist   equ 8000 / 7     ;distance between two living deads

moves  equ mov next, <-1    ;multi-line equ
       equ jmp @-2

sp     spl sp1
sp0    spl sp01
sp00   spl sp001
sp000  mov gen, gen+dist
       moves
sp001  mov gen, gen+2*dist
       moves
sp01   spl sp011
sp010  mov gen, gen+3*dist
       moves
sp011  mov gen, gen+4*dist
       moves
sp1    spl sp11
sp10   spl sp101
sp100  mov gen, gen+5*dist
       moves
sp101  mov gen, gen+6*dist
       moves
sp11   spl sp111
sp110  mov gen, gen+7*dist
       moves
sp111  jmp next

       for 69  ;fill space
       dat 0,0
       rof

next   spl #0 ,>-10
gen    djn.I #0,<-10
