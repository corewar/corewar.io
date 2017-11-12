;;; COMMANDO, originally by A.K. Dewdney
;;; 	reconstructed from description by blojo@soda.berkeley.edu.
;;; If one of the NOPs (jmp 1) in the program below is taken out, and the
;;; CMP below them is changed to #-16 instead of #-17, COMMANDO will work
;;; faster, but all the IMPs will land on the same spot when they are
;;; created.  I left it this way because it is easier to see what is going
;;; on, and is neater to watch.
ORG	2
MOV.AB	#0,	$-1
JMP.B	$-1,	$0
SPL.B	$-2,	$0
MOV.I	$13,	$113
SPL.B	$112,	$0
MOV.AB	#0,	$12
MOV.AB	#101,	$12
MOV.I	<10,	<11
JMP.B	$1,	$0
JMP.B	$1,	$0
JMP.B	$1,	$0
JMP.B	$1,	$0	; a nop-- without it, COMMANDO catches up
; with its imps and munges itself.
CMP.AB	#-17,	$5
JMP.B	$-6,	$0
ADD.AB	#2,	$4
JMP.B	@3,	$0
MOV.I	$0,	$1
DAT.F	#0,	#0
DAT.F	#0,	#99
