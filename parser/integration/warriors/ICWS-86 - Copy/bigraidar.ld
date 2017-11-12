; Big-raidar
; For notes about how this works, see Dewdney's first article,
;   or the "raidar" program.
ORG	3
DAT.F	#0,	#0
DAT.F	#0,	#0
DAT.F	#0,	#0
MOV.AB	#201,	$-1
MOV.AB	#-121,	$-4
MOV.AB	#346,	$-4
MOV.AB	#42,	<-6
MOV.AB	#42,	<-6
DJN.B	$-2,	$-6
MOV.AB	#-121,	$-9
MOV.AB	#346,	$-9
MOV.AB	#201,	$-9
CMP.AB	#42,	<-12
JMP.B	$5,	$0
CMP.AB	#42,	<-13
JMP.B	$8,	$0
DJN.B	$-4,	$-14
JMP.B	$-8,	$0
MOV.AB	#25,	$-16
MOV.AB	#-963,	$-19
MOV.I	@-18,	<-20
DJN.B	$-1,	$-19
JMP.B	@-22,	$0
MOV.AB	#25,	$-21
MOV.AB	#1013,	$-24
MOV.I	@-23,	<-25
DJN.B	$-6,	$-24
JMP.B	@-27,	$0
