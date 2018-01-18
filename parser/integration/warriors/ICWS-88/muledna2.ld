; NOTE: This is a shortened version of Mule DNA, one of the '88
;  finalists. The complete version can be found in DMDMULE.RED.
;
;Mule DNA
;by Douglas McDaniels
;United States of America
;
ORG	4
DAT.F	#0,	#1588
DAT.F	#0,	#1337
DAT.F	#0,	#123
SPL.B	$0,	$0
SPL.B	$17,	$0
CMP.I	<-5,	<-4
MOV.I	$-3,	@-6
CMP.I	<-7,	<-6
MOV.I	$-5,	@-7
DJN.B	$-4,	$-7
MOV.AB	#1589,	$-10
MOV.AB	#168,	$-9
MOV.I	$-12,	<-12
MOV.I	$-13,	<-13
MOV.I	$-14,	<-14
DJN.B	$-3,	$-13
JMP.B	$-6,	$0
;
; #SET  COPY     1
; #SET  ONE      1588
; #SET  TWO      1337
; #REPEAT        63
; #SET  ONE      ONE+86
; #SET  TWO      TWO+86
;
DAT.F	#0,	#1588	;  1674
DAT.F	#0,	#1337	;  1423
DAT.F	#0,	#123
SPL.B	$0,	$0
SPL.B	$17,	$0
CMP.I	<-5,	<-4
MOV.I	$-3,	@-6
CMP.I	<-7,	<-6
MOV.I	$-5,	@-7
DJN.B	$-4,	$-7
MOV.AB	#1589,	$-10	;  1675
MOV.AB	#168,	$-9
MOV.I	$-12,	<-12
MOV.I	$-13,	<-13
MOV.I	$-14,	<-14
DJN.B	$-3,	$-13
JMP.B	$-6,	$0
;
; #END
;
