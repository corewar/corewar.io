; IMPS.S
;
; T. Takebayashi
;
LOOP     SPL              IMPS
         ADD   # 2,       LOOP
         JMP     LOOP
IMPS     MOV     0,       2
         MOV     0,       2
         END     LOOP
