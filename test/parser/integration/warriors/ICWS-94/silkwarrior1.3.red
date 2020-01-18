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
;kill
;assert CORESIZE==8000
;macro

STEP    equ     2364
SIZE    equ     12

warrior

        spl     1,          <-98
        mov     -1,         0
        spl     1,          <-99

paper   spl     @paper,     STEP
        mov.i   }paper,     >paper
        mov.i   gate,       >paper
        mov.i   gate,       {-5*SIZE-1
        mov.i   gate,       {4000
silk    jmp     @silk,      {paper
gate    dat.f   <2667,      <2*2667

end warrior                                   
