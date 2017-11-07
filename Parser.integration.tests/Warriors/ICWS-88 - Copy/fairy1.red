; Fairy1.s
;
; by Keiji-Kawashima
;
BOMB     SPL             -1
CYCLE    DAT            # 509
ROUND    DAT            # 16
ORG      ADD   # 51,      SIGHT
LOOP     ADD   # 16,      SIGHT
         MOV     BOMB,  @ SIGHT
         DJN     LOOP,    CYCLE
         MOV   # 509,     CYCLE
         DJN     ORG,     ROUND
         MOV   #-64,      SIGHT
         MOV     CYCLE,   BOMB
         JMP     ORG
SIGHT    DAT   #-64
         END     ORG
