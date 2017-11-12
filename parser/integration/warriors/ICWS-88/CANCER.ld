;      CANCER.S
;      Thomas Gettys
;      1987
;
ORG	2
JMP.B	$2,	$0
JMP.B	$-1,	$0
SPL.B	$8,	$0
MOV.I	$16,	$17
MOV.I	$13,	<16
JMN.B	$-1,	$15
MOV.I	$13,	$14
MOV.I	$11,	<13
JMN.B	$-1,	$12
JMP.B	$-6,	$0
MOV.I	$9,	$10
MOV.I	$6,	<9
JMN.B	$-1,	<8
MOV.I	$6,	$7
MOV.I	$4,	<6
JMN.B	$-1,	$5
JMP.B	$-6,	$0
SPL.B	$0,	$0
DAT.F	#0,	#1
DAT.F	#0,	#-20
DAT.F	#0,	#0
