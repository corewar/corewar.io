; This is RAIDAR, a program suggested by A.K. Dewdney's original Scientific
; American article about Core War.  A slower and more clumsy version of this
; program, called BIG-RAIDAR, is also supplied; BIG-RAIDAR is slower to move,
; but has a higher chance of stepping on opponents and is easier to watch.
; Picket width is 32
; Inner distance (btwn picket edge and program edge) is 164
; Program width is 25 (Not including leading 3 data lines)
; On panic, program jumps 400
ORG	3
DAT.F	#0,	#0
DAT.F	#0,	#0
DAT.F	#0,	#0
MOV.AB	#33,	$-1
MOV.AB	#-163,	$-4
MOV.AB	#223,	$-4	; 165 + dist targ2->end-of-prog + 1 + 32
MOV.AB	#42,	<-6
MOV.AB	#42,	<-6
DJN.B	$-2,	$-6
MOV.AB	#-163,	$-9
MOV.AB	#223,	$-9	; ditto as above
MOV.AB	#33,	$-9
CMP.AB	#42,	<-12
JMP.B	$5,	$0
CMP.AB	#42,	<-13
JMP.B	$8,	$0
DJN.B	$-4,	$-14
JMP.B	$-8,	$0
MOV.AB	#25,	$-16
MOV.AB	#-400,	$-19
MOV.I	@-18,	<-20
DJN.B	$-1,	$-19
JMP.B	@-22,	$0
MOV.AB	#25,	$-21
MOV.AB	#425,	$-24
MOV.I	@-23,	<-25
DJN.B	$-6,	$-24
JMP.B	@-27,	$0
