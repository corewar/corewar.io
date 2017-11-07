;redcode-94
;name Pyramid v5.5
;author Michael Constant
;strategy  quick-vamp -> vampire
;macro

; ----------- Quick-Scan Parameters (see diagrams at end of program) -------
OVERLAP1 equ    50
OVERLAP2 equ    0
BIGSTEP equ     100
OFFSET  equ     150
BOMBDIR equ     -1           ; 1 is forward, -1 is backward
SPACE   equ     6
; --------------------------------------------------------------------------

STEP    equ     3364

first   spl     split
wimp    jmp     #0,     <-15

look
qscan   for     6
        sne.x   (first+OFFSET+(qscan*2*BIGSTEP)), (first+(CORESIZE/2)+OFFSET+(qscan*2*BIGSTEP))
        seq.x   (first+OFFSET+BIGSTEP+(qscan*2*BIGSTEP)), (first+(CORESIZE/2)+OFFSET+BIGSTEP+(qscan*2*BIGSTEP))
        mov.ab  #(first+OFFSET+(qscan*2*BIGSTEP))-found, @found
        rof

        jmn     found+1,found

qscan   for     6
        sne.x   (first+OFFSET+((qscan+6)*2*BIGSTEP)), (first+(CORESIZE/2)+OFFSET+((qscan+6)*2*BIGSTEP))
        seq.x   (first+OFFSET+BIGSTEP+((qscan+6)*2*BIGSTEP)), (first+(CORESIZE/2)+OFFSET+BIGSTEP+((qscan+6)*2*BIGSTEP))
        mov.ab  #(first+OFFSET+((qscan+6)*2*BIGSTEP))-found, @found
        rof

        jmn     found+1,found

qscan   for     6
        sne.x   (first+OFFSET+((qscan+12)*2*BIGSTEP)), (first+(CORESIZE/2)+OFFSET+((qscan+12)*2*BIGSTEP))
        seq.x   (first+OFFSET+BIGSTEP+((qscan+12)*2*BIGSTEP)), (first+(CORESIZE/2)+OFFSET+BIGSTEP+((qscan+12)*2*BIGSTEP))
        mov.ab  #(first+OFFSET+((qscan+12)*2*BIGSTEP))-found, @found
        rof

found   jmz.b   first,  #0
        add.b   found,  found2
        sne.x   @found, @found2
        add.ab  #(CORESIZE/2), found
        jmn.f   2,      @found
        add.ab  #BIGSTEP,found
mkfang  sub.ba  found,  qfang
        add.b   found,  qfang
        mov.i   qfang,  @qfang
        sub.f   subber, qfang
        djn.b   -2,     #((BIGSTEP+(OVERLAP1+OVERLAP2))/SPACE)+1
found2  jmp     first,  #found+BIGSTEP

qfang   jmp     (BOMBDIR*OVERLAP1)+pit+(qfang-found), #(-BOMBDIR*OVERLAP1)+found-qfang
subber  dat     <BOMBDIR*SPACE, <-BOMBDIR*SPACE

        for     13
        dat     0,      0
        rof

pit     mov.i   wimp-11,<wimp-11
        spl     -1,     <wimp-5
        spl     -1,     <wimp-5
        jmp     -3,     <wimp-5
        dat     0,      0
        dat     0,      0
split   spl     #STEP,  <-STEP
vamp    mov.i   fang,   @fang
        add.f   split,  fang
        djn.f   vamp,   <-3000
fang    jmp     -7+STEP,#-3-STEP

        end     look
