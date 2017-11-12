;;; This is not intended to be a complete battle program.  Its only purpose
;;; is to demonstrate a program's self-copying ability.
;;;
;;; See also: JUGGERNAUT.
ORG	2
DAT.F	#0,	#7
DAT.F	#0,	#106
MOV.I	<-2,	<-1
JMN.B	$-1,	$-3
MOV.AB	#7,	$96
MOV.AB	#106,	$96
JMP.B	$96,	$0
