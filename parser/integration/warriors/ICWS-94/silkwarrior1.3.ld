;redcode-94
;name Silk Warrior 1.3
;author J.Pohjalainen
;strategy Silk Warrior   ( Paper - The Next Generation )
;strategy ==============================================
;strategy v1.0: only one tiny paper
;strategy v1.1: made it bigger and maybe more lethal
;strategy v1.2: better distribution (starts as a mod-40)
;strategy       now kills previous copies and does some
;strategy       selftesting
;strategy v1.3: bigger and more lethal, I hope
ORG	0
SPL.B	$1,	<-98
MOV.I	$-1,	$0
SPL.B	$1,	<-99
SPL.B	@0,	$2364
MOV.I	}-1,	>-1
MOV.I	$4,	>-2
MOV.I	$3,	{-61
MOV.I	$2,	{4000
JMP.B	@0,	{-5
DAT.F	<2667,	<5334
