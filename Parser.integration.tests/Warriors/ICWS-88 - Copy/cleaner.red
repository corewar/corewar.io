; Cleaner.s
;
; Pen
;
HEAD     DAT               # 0
SBOMB    SPL                 0
DBOMB    DAT               # 0
ORG      MOV   # HEAD-AIM,   AIM
SLOOP    MOV     SBOMB,    @ AIM
         DJN     SLOOP,      AIM
         MOV   # HEAD-AIM,   AIM
DLOOP    MOV     DBOMB,    @ AIM
         DJN     DLOOP,      AIM
         JMP     ORG
AIM      DAT               # 0
         END     ORG
