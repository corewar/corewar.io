;redcode-94
;name Bunker t3
;kill Bunker
;author P.Kline
;strategy self-repair pair
space    equ 4000
step     equ 13

copyf    dat    #fin
copyt    dat    #fin+space

start    mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 mov <copyf,<copyt
	 
	 spl 1               ; create 11 processes
	 mov -1,0
	 spl 1
	 mov -1,0
	 spl chk
	 jmp chk+space

     for 20
	 dat 0,0
     rof

rset     sub.a  #0,#space                ; reset counter after fix

chk      sub.ba }fix,rset                ; sum partner's b-operands
	 jmn.a  kill,rset                ; they should total to zero
clr      mov    d3,>-20                  ; slow core-clear
loop     jmp    chk,{fix                 ; go again, reset pointer

kill     mov    d4,{fix                  ; zap partner's code
	 spl    rset,1000                ; reset self while partner dies
fix      mov    <rset+space,{rset+space  ; repair partner's code
offset   jmp    rset+space,#2964         ; restart partner
d3       dat    <2667,#50                ; core-clear bomb
d4       dat    #fin-rset,#fin-rset+space; repair pointers

fin      dat 0,0

	 end    start
