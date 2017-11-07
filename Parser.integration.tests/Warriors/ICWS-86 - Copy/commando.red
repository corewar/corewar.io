;;; COMMANDO, originally by A.K. Dewdney
;;; 	reconstructed from description by blojo@soda.berkeley.edu.

;;; If one of the NOPs (jmp 1) in the program below is taken out, and the
;;; CMP below them is changed to #-16 instead of #-17, COMMANDO will work
;;; faster, but all the IMPs will land on the same spot when they are
;;; created.  I left it this way because it is easier to see what is going
;;; on, and is neater to watch.

imps	mov	#0,	-1
	jmp	imps
start	spl	imps
	mov	imp,	113
	spl	112
	mov	#0,	count
	mov	#101,	ptr
loop	mov	<count,	<ptr
	jmp	1
	jmp	1
	jmp	1
	jmp	1		; a nop-- without it, COMMANDO catches up
				; with its imps and munges itself.
	cmp	#-17,	count
	jmp	loop
	add	#2,	ptr
	jmp	@ptr
imp	mov	0,	1
count	dat	#0
ptr	dat	#99
