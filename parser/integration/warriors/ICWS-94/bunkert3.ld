;redcode-94
;name Bunker t3
;kill Bunker
;author P.Kline
;strategy self-repair pair
ORG	2
DAT.F	#0,	#50
DAT.F	#0,	#4049
MOV.I	<-2,	<-1
MOV.I	<-3,	<-2
MOV.I	<-4,	<-3
MOV.I	<-5,	<-4
MOV.I	<-6,	<-5
MOV.I	<-7,	<-6
MOV.I	<-8,	<-7
MOV.I	<-9,	<-8
MOV.I	<-10,	<-9
MOV.I	<-11,	<-10
MOV.I	<-12,	<-11
SPL.B	$1,	$0	; create 11 processes
MOV.I	$-1,	$0
SPL.B	$1,	$0
MOV.I	$-1,	$0
SPL.B	$23,	$0
JMP.B	$4022,	$0
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
SUB.A	#0,	#4000	; reset counter after fix
SUB.BA	}6,	$-1	; sum partner's b-operands
JMN.A	$3,	$-2	; they should total to zero
MOV.I	$6,	>-20	; slow core-clear
JMP.B	$-3,	{3	; go again, reset pointer
MOV.I	$5,	{2	; zap partner's code
SPL.B	$-6,	$1000	; reset self while partner dies
MOV.I	<3993,	{3993	; repair partner's code
JMP.B	$3992,	#2964	; restart partner
DAT.F	<2667,	#50	; core-clear bomb
DAT.F	#11,	#4011	; repair pointers
DAT.F	$0,	$0
