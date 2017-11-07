;;; SUPER IMP STOMPER
;;; Because an IMP STOMPER spends only half its time stomping (and the other
;;; half executing a JMP instruction), it has a good chance of being overrun
;;; by an assaulting IMP.  The more time we spend stomping, the better our
;;; chances are (as illustrated in the program below.)  We become much more
;;; vulnerable to bombs, though, due to size increase.
;;; See also: IMP STOMPER
ORG	1
DAT.F	#0,	#0
MOV.AB	#0,	$-1
MOV.AB	#0,	$-2
MOV.AB	#0,	$-3
MOV.AB	#0,	$-4
MOV.AB	#0,	$-5
MOV.AB	#0,	$-6
MOV.AB	#0,	$-7
MOV.AB	#0,	$-8
MOV.AB	#0,	$-9
MOV.AB	#0,	$-10
MOV.AB	#0,	$-11
MOV.AB	#0,	$-12
MOV.AB	#0,	$-13
MOV.AB	#0,	$-14
MOV.AB	#0,	$-15
MOV.AB	#0,	$-16
MOV.AB	#0,	$-17
MOV.AB	#0,	$-18
JMP.B	$-18,	$0
