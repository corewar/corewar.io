; PinUp.s
;
; T. Takebayashi
;
ORG	1
DAT.F	#0,	#20
MOV.AB	#-16,	$15
MOV.AB	#20,	$-2
MOV.I	$12,	<-3
MOV.I	$10,	<-4
ADD.AB	#10,	$-5
MOV.I	$9,	<10
MOV.I	$7,	<9
SUB.AB	#6,	$8
JMN.B	$-6,	$7
MOV.AB	#-16,	$7
MOV.I	$-11,	<6
DJN.B	$-1,	$5
JMP.B	$-12,	$0
SPL.B	$0,	$0
JMP.B	$-1,	$0
DAT.F	#0,	$0
DAT.F	#0,	$0
