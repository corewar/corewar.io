;redcode-88
;name Nameless
;author Blameless
ORG	1
DAT.F	#0,	#4096
JMN.B	$13,	@-1
ADD.AB	#8,	$-2
JMN.B	$16,	@23
SUB.AB	#8,	$22
JMN.B	$-4,	$21
MOV.AB	#4109,	$-6
MOV.AB	#4082,	$19
MOV.I	$16,	@-8
ADD.AB	#2,	$-9
MOV.I	$14,	<16
DJN.B	$-3,	$15
MOV.I	$14,	$12
JMP.B	$-7,	$0
MOV.AB	#16,	$9
MOV.I	$10,	<-15
DJN.B	$-1,	$7
ADD.AB	#32,	$-17
JMP.B	$-15,	$0
MOV.AB	#15,	$4
MOV.I	$5,	<6
DJN.B	$-1,	$2
SUB.AB	#1,	$4
JMP.B	$-18,	$0
JMP.B	$0,	$0
SPL.B	$0,	$0
DAT.F	#0,	#4096
