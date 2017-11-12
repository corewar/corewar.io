;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; 
;;; 			  M O R T A R
;;;
;;; A VERY offensive program which fires 1's randomly using
;;; the Fibonacci series to generate pseudo-random numbers.
;;;
;;; Author:	Michael L. Mauldin
;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
ORG	0
MOV.AB	#1,	$7046	; a := 1
MOV.AB	#1,	$7046	; b := 1
ADD.B	$7044,	$7045	; b += a
MOV.AB	#1,	@7044	; @b := 1
ADD.B	$7043,	$7042	; a += b
MOV.AB	#1,	@7041	; @a := 1
JMP.B	$-4,	$0
