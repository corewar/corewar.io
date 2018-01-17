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

imp_sz01    equ     2668
imp_sz02    equ     imp_sz01
imp_sz03    equ     2667
imp_prc01   equ     8
imp_prc02   equ     imp_prc01
imp_prc03   equ     10
imp_off01   equ     -2
imp_off02   equ     0
imp_off03   equ     -7
imp_first   equ     (start-1834)+2*imp_sz02
stone_inc   equ     190
stone_offst equ     701
dec_offst   equ     (imp_sz03*2)-stone_inc

            org     start
;-----------------------------------------------------------------------------
;  Boot strap

start       mov.i   imp_2,imp_first+imp_off02+2 ; gate busting imp
            mov.i   imp_3,imp_first+imp_off03   ; normal imp
            mov.i   <stone_src,@stone_dst2      ; stone
            mov.i   <stone_src,<stone_dst       ;   put B-field of "djn.a"
            mov.i   <stone_src,<stone_dst       ;   to use as the stone_src
            mov.i   <stone_src,<stone_dst
            spl     @stone_dst,<dec_offst
            mov.i   <stone_src,<stone_dst
;-----------------------------------------------------------------------------
;  Vector launch the imps

imp_split   spl     1,<dec_offst                ; 26 processes
            spl     1,<dec_offst
            mov.i   imp_2,<start                ; finish booting imp
stone_dst   mov.i   -2,#stone_end+1-stone_offst     ;\ notice how these ptrs
stone_dst2  mov.i   -1,#stone_end+1-(stone_offst-1) ;/ are conviently erased
            spl     <0,#imp_vector               ;\ decrement self to launch
stone_src   djn.a   @(imp_vector-1),#stone_end+1 ;/ imps, B-fld before A-fld
;-----------------------------------------------------------------------------
;  Self splitting stone and core clear

stone       mov.i   <stone_spl+5+stone_inc*800,stone_spl
stone_spl   spl     stone,<dec_offst+stone
            add.f   stone_end+1,stone
            djn.f   stone_spl,<dec_offst+stone
stone_end   mov.i   stone_inc,<-stone_inc
;-----------------------------------------------------------------------------
;  Decoy

cnt         for     65
            dat     0,0
            rof
;-----------------------------------------------------------------------------
;  Launch vectors

imp_2       mov.i   #(imp_sz02/2),imp_sz02
imp_3       mov.i   #(imp_sz03/2),imp_sz03

imp_A_fld   equ     imp_first+(imp_prc&who+1-2*cnt)*imp_sz&who+imp_off&who
imp_B_fld   equ     imp_first+(imp_prc&who+0-2*cnt)*imp_sz&who+imp_off&who
who         for     3
cnt         for     (imp_prc&who)/2
            jmp     imp_A_fld,imp_B_fld
            rof
            rof
imp_vector
            end
