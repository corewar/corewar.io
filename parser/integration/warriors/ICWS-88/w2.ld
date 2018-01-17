; W2.s
;
; Douglas McDaniels
;
ORG	4
DAT.F	#0,	#0
DAT.F	#0,	#0
DAT.F	#0,	#0
DAT.F	#0,	#0
SPL.B	$11,	$0
MOV.I	$-2,	$-4
MOV.AB	#-128,	$-4
MOV.I	$14,	<-6
MOV.I	$12,	<-7
SUB.AB	#30,	$-8
SUB.AB	#31,	$-8
DJN.B	$-4,	$-9
SUB.AB	#5,	$-9
DJN.B	$-8,	$9
DAT.F	#0,	#-30
MOV.I	$-1,	<-15
DJN.B	$-1,	$-2
MOV.AB	#-30,	$-3
MOV.AB	#0,	$-18
JMP.B	$-4,	$0
SPL.B	$0,	$0
JMP.B	$-1,	$0
DAT.F	#0,	#6
