; Kirin.s
;
; by Eiji-Kako
;
ORG	4
DAT.F	#0,	#4096
DAT.F	#0,	#9003
SPL.B	$0,	$0
JMP.B	$-1,	$0
MOV.I	$-1,	<-3
MOV.I	$-3,	<-4
ADD.AB	#826,	$-5
DJN.B	$-3,	$-7
SPL.B	$4,	$0
JMP.B	$6,	$0
SPL.B	$0,	$0
JMP.B	$-1,	$0
DJN.B	$0,	$-12
DJN.B	$-1,	$-13
JMP.B	$-1,	$0
MOV.I	$0,	$1
