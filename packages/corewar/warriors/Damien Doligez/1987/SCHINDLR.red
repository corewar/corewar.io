;      SCHINDLR.S
;      MICHAEL SCHINDLER
;
       JMP     START
NULL   DAT     0
TRAP   MOV     NULL,   -2
       DJN     TRAP,   -3
       JMP     TRAP
KILL   MOV     NULL,   <TARGET
       JMN     KILL,   TARGET
       MOV     #NULL-2-TARGET, TARGET
       MOV     #-10,   TARGET
       JMP     KILL
TARGET DAT     -6
WHAT   DAT     10
       JMP     @90
       JMP     @80
       JMP     @70
       JMP     @60
       JMP     @50
       JMP     @40
       JMP     @30
       JMP     @20
       JMP     @10
ABS    DAT     46
WHERE  DAT     -25
FLAG   DAT     1
START  MOV     @WHAT,  @WHERE
       SUB     #10,    WHERE
       DJN     START,  WHAT
       ADD     #100,   ABS
       MOV     #10,    WHAT
       JMN     START,  FLAG
       SPL     KILL
       SPL     TRAP
WORK   SPL     0
       MOV     NULL,   <TARGET
       MOV     NULL,   <TARGET
       JMP     -2
PRISON MOV     NULL,   0
       MOV     #0,     FLAG
       SPL     WORK
       JMP     -1
       END
