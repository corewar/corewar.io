;Sieve
;by Dirk Wolff-Klammer
;West Germany
;
ORG	1
DAT.F	#0,	#0
MOV.I	<9,	$16
;
JMZ.B	$6,	$8
MOV.AB	#16,	$-3
MOV.I	@-4,	<13
DJN.B	$-1,	$-5
SPL.B	@11,	$0
JMZ.B	$-6,	$-7
MOV.AB	#7,	$2
JMZ.B	$-8,	$-9
DAT.F	#0,	#7
DAT.F	#0,	#125
DAT.F	#0,	#250
DAT.F	#0,	#500
DAT.F	#0,	#1000
DAT.F	#0,	#2000
DAT.F	#0,	#4000
DAT.F	#0,	#0
