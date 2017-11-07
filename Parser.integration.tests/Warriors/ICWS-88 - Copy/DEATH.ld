;Death.s
;by Mark A. Durham: July 21, 1988
;United States of America
;
ORG	0
DJN.B	$0,	<7
JMN.B	$-1,	$9
MOV.I	$7,	@6
DJN.B	$-1,	$5
MOV.AB	#-5,	$4
MOV.I	$3,	@3
DJN.B	$-1,	$2
JMN.B	$-3,	#-7
DAT.F	#0,	#-7
SPL.B	$0,	$0
DAT.F	#0,	#1
