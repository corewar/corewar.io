;      ZAMZOW.S
;      J. P. ZAMZOW
;
ORG	0
JMP.B	$7,	$0
DAT.F	#0,	$0
DAT.F	#0,	$0
DAT.F	#0,	$0
DAT.F	#0,	$0
DAT.F	#0,	$0
DAT.F	#0,	$0
JMZ.B	$0,	<21
CMP.I	$21,	@20
JMP.B	$3,	$0
MOV.AB	#8166,	$18
JMP.B	$-4,	$0
ADD.AB	#6,	$16
MOV.I	$14,	<15
MOV.I	$13,	<14
MOV.I	$12,	<13
MOV.I	$11,	<12
MOV.I	$10,	<11
MOV.I	$9,	<10
MOV.I	$8,	<9
DJN.B	$-13,	$5
MOV.I	$5,	$2007
MOV.I	$7,	$2007
SPL.B	$2005,	$0
JMP.B	$-17,	$0
DAT.F	#0,	$150
JMP.B	$0,	$0
DAT.F	#0,	$0
DAT.F	#0,	$-27
DAT.F	#0,	$327
