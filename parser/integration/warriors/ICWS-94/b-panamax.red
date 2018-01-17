;redcode-94 verbose
;name B-Panama X
;kill test
;author Steven Morrell
;strategy  Better Stone / Silk (?) Paper

org boot

step equ 3044

stone     spl #0,>-10
          SPL #-step,<step
          MOV >-step,step+1
          ADD -2,-1
          DJN -2,<stone-50

cc        dat #-7

boot      mov stone+4,boot-200+4
          mov stone+3,<boot
          mov stone+2,<boot
          mov stone+1,<boot
          mov stone,<boot
          mov cc,boot-200+6

a         spl @boot,<-1000
          spl 1,<-2000
          spl 1,<-3000
          spl 1,<-4000
          mov {src,<src
          jmp @src,<1000

          dat <last,<2667
          dat <last,<2667
          dat <last,<2667

src       spl @0+8,2936+8
          mov }-1,>-1
          mov 5,>-2
          jmp -3,{-3
          spl 1,0
          mov 2,<-1
          djn.f -2,>-6
          dat <2667,<5334

;macro
for 70
          dat <last,<2667
rof

last      dat <last,<2667

end
