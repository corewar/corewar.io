; W2.s
;
; Douglas McDaniels
;
ITIP     DAT                 0
WHERE    DAT                 0
COUNT    DAT               # 0
U        DAT                 0
START    SPL                 ART
TT       MOV     U,          WHERE
         MOV   #-128,        COUNT
RESTART  MOV     STALL2,   < WHERE
         MOV     STALL1,   < WHERE
         SUB   # 30,         WHERE
         SUB   # 31,         COUNT
         DJN     RESTART,    COUNT
         SUB   # 5,          U
         DJN     TT,         A
Q        DAT               #-30
ART      MOV     Q,        < ITIP
         DJN     ART,        Q
         MOV   #-30,         Q
         MOV   # 0,          ITIP
         JMP     ART
STALL1   SPL                 0
STALL2   JMP                -1
A        DAT               # 6
         END     START
