;;; JUGGERNAUT: A program which moves through memory by copying itself.

;;; See also: GEMINI

src	dat	#7
dest	dat	#13
start	mov	<src	<dest
	jmn	start	src
	mov	#7	3
	mov	#13	3
	jmp	3
