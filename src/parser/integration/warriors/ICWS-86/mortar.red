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

start	mov	#1	7046		; a := 1
	mov	#1	7046		; b := 1
loop	add	7044	7045		; b += a
	mov	#1	@7044		; @b := 1
	add	7043	7042		; a += b
	mov	#1	@7041		; @a := 1
	jmp	loop
