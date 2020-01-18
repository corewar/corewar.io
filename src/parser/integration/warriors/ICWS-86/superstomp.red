;;; SUPER IMP STOMPER

;;; Because an IMP STOMPER spends only half its time stomping (and the other
;;; half executing a JMP instruction), it has a good chance of being overrun
;;; by an assaulting IMP.  The more time we spend stomping, the better our
;;; chances are (as illustrated in the program below.)  We become much more
;;; vulnerable to bombs, though, due to size increase.

;;; See also: IMP STOMPER

stomp	dat #0
start	mov #0 stomp
	mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
        mov #0 stomp
	jmp start
