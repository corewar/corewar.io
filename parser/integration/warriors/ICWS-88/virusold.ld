;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; Name:		Virus
;;; Original Author:	John McLean
;;; Modified:		Michael Mauldin
;;;
;;; 1.	Changed code to work for Mauldin/Milazzo system.
;;; 2.	Changed increment from 4 to 9 so that virus has a
;;;	chance to beat dwarf.  With an increment of 4, 
;;;	dwarf wins 100 percent of the time.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; Real code for the virus program
ORG	3
JMP.B	$14,	$0	; First site for bomb
JMP.B	$9,	$0	; Data for 'jmp 9'
JMP.B	$0,	$0	; Data for 'jmp 0'
MOV.AB	#7999,	$1	; Initialize vsite
MOV.I	$-3,	$1	; Make 'vincr' be the difference between
SUB.F	$-3,	$1	;	'jmp n' and 'jmp n+9'
MOV.I	$-6,	$1	; Set viral bomb value
MOV.I	$1,	@1	; Fire viral bomb at vsite
SUB.AB	#9,	$1	; Decrement vsite by 9
ADD.F	$1,	$1	; Make vbomb be 'jmp n+9'
CMP.AB	#79,	$1	; About to subvert bogus code
JMP.B	$-4,	$0	; And repeat
JMP.B	$-9,	$0	; Start over
;;; Branch to one of several bogus programs
DAT.F	#0,	#1	; Next bogus code fragment
CMP.AB	#1,	$-1	; Next == 1?
JMP.B	$2,	$0
JMP.B	$5,	$0
CMP.AB	#3,	$-4	; Next == 3?
JMP.B	$11,	$0	; No, branch to program 2
JMP.B	$18,	$0	; Branch to program 3
;;; Bogus code for subverted program number 1
DAT.F	#0,	#36	; Site to drop 0 bomb
MOV.AB	#2,	$-8	; Make program 2 the next one
MOV.AB	#-4,	@-2	; Bombs away!
ADD.AB	#6,	$-3	; Increment bomb site
CMP.AB	#7974,	$-4	; About to bomb original virus?
JMP.B	$-3,	$0	; No: repeat
MOV.AB	#24,	$-6	; Re-initialize for next victim
MOV.AB	#0,	$1	; Zero next instruction
;;; Bogus code for subverted program number 2
DAT.F	#0,	#24	; Site to drop 0 bomb
MOV.AB	#3,	$-16	; Make program 3 the next one
MOV.AB	#-4,	@-2	; Bombs away!
ADD.AB	#4,	$-3	; Increment bomb site
CMP.AB	#7972,	$-4	; About to bomb original virus?
JMP.B	$-3,	$0	; No: repeat
MOV.AB	#16,	$-6	; Re-initialize for next victim
MOV.AB	#0,	$1	; Zero next instruction
;;; Bogus code for subverted program number 3
DAT.F	#0,	#16	; Site to drop 0 bomb
MOV.AB	#1,	$-24	; Make program 1 the next one
MOV.AB	#-4,	@-2	; Bombs away!
ADD.AB	#2,	$-3	; Increment bomb site
CMP.AB	#7970,	$-4	; About to bomb original virus?
JMP.B	$-3,	$0	; No: repeat
MOV.AB	#8,	$-6	; Re-initialize for next victim
MOV.AB	#0,	$1	; Zero next instruction
