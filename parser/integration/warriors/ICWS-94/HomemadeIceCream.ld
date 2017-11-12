;redcode-94 quiet
;name Homemade Ice Cream
;kill Homemade Ice Cream
;author P.Kline
;strategy bscan, spiral attack, antivamp, paper
;macro
ORG	4
MOV.I	$20,	<5	; destroy vampire's pit
DAT.F	$0,	$0
DAT.F	$0,	$0
SUB.AB	#13,	$3	; initial scan
JMZ.F	$-1,	@2
MOV.I	@1,	$-3	; save for spiral-attack
MOV.I	$93,	$-130	; bombs away
SUB.AB	#8,	@-3
DJN.B	$-2,	#13
JMP.B	$18,	$1000
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
ADD.AB	#104,	$-21	; reset pointer
SUB.F	$-26,	$-22	; in case it's a fang...
MOV.I	$-28,	@-23	; spiral-attack on imps
ADD.F	$-28,	@-2
JMN.F	$-2,	@-25	; until dat-zero is found
SPL.B	$24,	$1000
JMP.B	$57,	$79
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
JMZ.A	$0,	<2	; search for a fang
MOV.AB	@1,	@1	; take the a-operand (pit location)
MOV.I	$-58,	@200	; zap the pit
SPL.B	#0,	<-42	; core-clear and gate
MOV.I	$2,	<-100
DJN.F	$-1,	<-101
DAT.F	<-42,	<-43
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
SPL.B	$1,	$1000	; create 7 processes
SPL.B	$1,	$1000
MOV.I	$-1,	$0
MOV.I	$6,	<410
MOV.AB	#7,	$-1	; 7-process paper
MOV.I	<-2,	<1	; create child
SPL.B	@0,	<-1310	; start child
MOV.I	$2,	<-1
JMZ.B	@0,	@-4	; if i'm ok, go again
DAT.F	<2667,	<5334
