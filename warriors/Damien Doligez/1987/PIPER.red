;      PIPER.S
;
START  ADD     #65,    BAIT
LURE   MOV     BAIT,   @TARGET
       ADD     #48,    BAIT
       SUB     #48,    TARGET
       JMN     LURE,   TARGET
SET    MOV     #-12,   PTR
BOMB   MOV     PTR,    @PTR
       DJN     BOMB,   PTR
       JMP     SET
BAIT   JMP     @0
TARGET DAT     -48
PTR    DAT     -12
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
       DAT     0
TRAP   SPL     0
       JMP     TRAP
       END
