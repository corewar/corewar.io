;redcode-94 quiet
;name Homemade Ice Cream
;kill Homemade Ice Cream
;author P.Kline
;strategy bscan, spiral attack, antivamp, paper
;macro

unpit    mov 20,<5           ; destroy vampire's pit
avb      dat 0,0
spiral   dat 0,0

scan     sub #13,trace       ; initial scan
start    jmz.f scan,@trace
         mov @trace,spiral   ; save for spiral-attack
trace    mov p1b,-130        ; bombs away
         sub #8,@start
         djn trace,#13
         jmp fintrap,1000
         
     for 7
         dat 0,0
     rof
gloc     dat 0,0
     for 9
         dat 0,0
     rof
     
fintrap  add #8*13,trace     ; reset pointer
trptr    sub spiral,trace    ; in case it's a fang...
killimp  mov avb,@trace      ; spiral-attack on imps
         add spiral,@trptr
         jmn.f killimp,@trace; until dat-zero is found
         spl av,1000
dloc     jmp p1,gate+50
         
     for 22
         dat 0,0
     rof

av       jmz.a 0,<av2        ; search for a fang
         mov.ab @av2,@av2    ; take the a-operand (pit location)
av2      mov unpit,@200      ; zap the pit
         spl #0,<gloc        ; core-clear and gate
         mov gate,<-100 
         djn.f -1,<-101
gate     dat <gloc+3,<gloc+2
         
    for 27
         dat 0,0
    rof
    
p1       spl 1,1000              ; create 7 processes
         spl 1,1000
         mov -1,0
         
p1s      mov p1b,<410
p1a      mov #7,p1s              ; 7-process paper
         mov <p1s,<p1n           ; create child
p1n      spl @p1n,<-1333+23      ; start child
         mov p1b,<p1n
         jmz @0,@p1a             ; if i'm ok, go again
p1b      dat <2667,<5334
         end start
