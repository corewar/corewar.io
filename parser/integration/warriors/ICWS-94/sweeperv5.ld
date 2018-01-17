;redcode-b verbose
;kill
;author Richard Hendricks
;name  Sweeper, v5
;strategy Basically, this program bootstraps itself 5000 cells away from its 
;strategy decoy.  Then it copies every 5th element onto the 6th, hopefully 
;strategy hurting enemy code, while running a 3-point imp spiral.
;strategy thanks to myer, bremermr@sonata.cc.purdue.edu for the help!
;strategy All good ideas are his, all goof-ups mine!
;Scored 145 Ranked 9th. :) :) :) :) :)
ORG	44
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
MOV.I	$1,	$1
DAT.F	#2667,	<2667
SPL.B	#67,	<-12	;Start of actual bomber
ADD.F	$-1,	$-13	;The <'s maintains the gate
MOV.I	$-3,	<-14
DAT.F	<-15,	<-15
MOV.I	$-4,	$3994	;This is the code to move the bomber
MOV.I	$-4,	$3994	;away from our decoy
MOV.I	$-4,	$3994
MOV.I	$-8,	$-3	;This removes all references to the
MOV.I	$-9,	$-3	;location we put our bomber
MOV.I	$-10,	$-3
SPL.B	$2,	<-1335
JMP.B	$3987,	$0	;This starts bomber execution
MOV.I	$-13,	$2	;This removes the reference in the JMP
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
DAT.F	<2667,	#2667
MOV.I	$1,	$1
