;redcode-94
;name     Ryooki
;kill     Ryooki
;author   T.Hsu
;strategy Just a simple paper
;assert   CORESIZE == 8000 && MAXLENGTH >= 100 && VERSION >= 60
;macro
;-----------------------------------------------------------------------------
;  1.0  Just an imp killing paper.
;  1.1  Use nop and jmz.f in the paper.
;  1.2  Use "mov 0,}0" instead of nop.  Use "spl @nxt" instead of "spl nxt".
;  1.3  Larger due to anti-vampire code.  Use labels instead of numbers.
;  1.4  Use "nop >0,0" instead of "mov 0,}0".
ORG	0
SPL.B	$1,	$0
SPL.B	$1,	$0
MOV.I	$-1,	#0
NOP.B	>0,	$0	; B-fld holds source
MOV.I	<-1,	{1
SPL.B	@-3365,	>800	; A-fld holds destination
MOV.I	$3,	{-1	; anti-imp  instruction
MOV.I	$2,	}25	; anti-vamp instruction
JMZ.F	*-4,	*-4
DAT.F	<2667,	<5334	; bomb designed to kill imps
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
DAT.F	$0,	$0
