;redcode-94 quiet
;name Scimitar
;kill Scimitar
;author P.Kline
;strategy bomber
;macro
step     equ   27
count    equ   1470

	 jmp   clr
start    mov   sb,@st
st       mov   {100,*cnt-(2*count*step)-1
	 add   bmb,st
cnt      djn   start,#count-1
sb       spl   #step,0
clr      mov   bmb,>-13
	 djn.f clr,{-14
  for 22
	 dat   0,0
  rof
	 dat   <4,step+step
bmb      dat   <4,step+step
	 end   start
