;redcode-94
;name     Aeka
;kill     Aeka
;author   T.Hsu
;strategy Suicidal stone & vector launched, gate busting imp spiral
;assert   CORESIZE == 8000 && MAXLENGTH >= 100
;-----------------------------------------------------------------------------
;  1.0  Original based on Cannonade by P.Kline
;  1.1  Erase pointer to stone, better decoy, use immediate mode more
;  1.2  Reposition imps so that they don't cause djn.a to fall through
;  1.3  Use a decoy that looks like a pointer, put boot ptrs in unused fields
;  1.4  Use A-field indirection to shorten imp launch code
;  1.5  Use "spl <0,#vector" instead of "djn.a *(vector-1),#0"
;       Split before finishing to boot the gate busting imps, better constants
;  1.6  Back to "djn.a *(vec-1),#0" to be less vulnerable to quick-scanners
;       Move around decoy code & launch vectors, launch normal imps first
;  1.7  Back to "spl <0,#vec" to save on space, no decoy
;       More redundancy in for the imps
;  1.8  Compress boot code for the gate busting imp
;  1.9  Made B-field of "djn.a" do double duty as a boot pointer
;       Made dec_offset help gate against imps during core-clear
;  2.0  Better use of for/rof in the vector launch
;
;  Vulnerabilities
;  -- hyper-perfect gates (gate busting imps have a tough time with these)
;  -- anti-imp paper (the stone is not designed to stun/kill paper)
;  -- suicidal stone (if gate busting imp dies, we don't want stone to die)
;  -- quick scanners (due to long boot time and use of "spl <0,#vec")
ORG	0
;-----------------------------------------------------------------------------
;  Boot strap
MOV.I	$85,	$3504	; gate busting imp
MOV.I	$85,	$3494	; normal imp
MOV.I	<12,	@10	; stone
MOV.I	<11,	<8	;   put B-field of "djn.a"
MOV.I	<10,	<7	;   to use as the stone_src
MOV.I	<9,	<6
SPL.B	@5,	<-2856
MOV.I	<7,	<4
;-----------------------------------------------------------------------------
;  Vector launch the imps
SPL.B	$1,	<-2856	; 26 processes
SPL.B	$1,	<-2856
MOV.I	$75,	<-10	; finish booting imp
MOV.I	$-2,	#-692	;\ notice how these ptrs
MOV.I	$-1,	#-692	;/ are conviently erased
SPL.B	<0,	#87	;\ decrement self to launch
DJN.A	@85,	#6	;/ imps, B-fld before A-fld
;-----------------------------------------------------------------------------
;  Self splitting stone and core clear
MOV.I	<6,	$1
SPL.B	$-1,	<-2857
ADD.F	$3,	$-2
DJN.F	$-2,	<-2859
MOV.I	$190,	<-190
;-----------------------------------------------------------------------------
;  Decoy
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
;-----------------------------------------------------------------------------
;  Launch vectors
MOV.I	#1334,	$2668
MOV.I	#1333,	$2667
JMP.B	$-1911,	$3421
JMP.B	$752,	$-1916
JMP.B	$3415,	$747
JMP.B	$-1922,	$3410
JMP.B	$-1913,	$3419
JMP.B	$750,	$-1918
JMP.B	$3413,	$745
JMP.B	$-1924,	$3408
JMP.B	$3403,	$736
JMP.B	$-1932,	$3401
JMP.B	$733,	$-1934
JMP.B	$3398,	$731
JMP.B	$-1937,	$3396
