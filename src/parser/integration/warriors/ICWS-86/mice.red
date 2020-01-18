; MICE:  Winner of the First Core War Tournament
;	 by Chip Wendell

ptr	dat	#0
start	mov	#12,	ptr	
loop	mov	@ptr,	<5
	djn	loop,	ptr	
	spl	@3		
spiff	add	#653,	2	
	jmz	-5,	-6
	dat	#833
	end	start
