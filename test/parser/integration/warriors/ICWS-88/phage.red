;      PHAGE.S
;      NORIO SUZUKI
;
START  MOV     <7,     <11
       DJN     -1,     11
       MOV     #7,     261
       MOV     #259,   264
       MOV     #14,    264
       SPL     251
       JMP     2
       DAT     7
       SPL     @5
       ADD     #8,     4
       JMP     -2
       DAT     259
       DAT     14
       DAT     2
       END

