; PinUp.s
;
; T. Takebayashi
;
COUNT    DAT               # 20
ORIG     MOV   #-16,         COUNT2
         MOV   # 20,         COUNT
LOOP1    MOV     BOMB2,    < COUNT
         MOV     BOMB1,    < COUNT
         ADD   # 10,         COUNT
         MOV     BOMB2,    < COUNT2
         MOV     BOMB1,    < COUNT2
         SUB   # 6,          COUNT2
         JMN     LOOP1,      COUNT2
         MOV   #-16,         COUNT3
LOOP2    MOV     COUNT,    < COUNT3
         DJN     LOOP2,      COUNT3
         JMP     ORIG
BOMB1    SPL     0
BOMB2    JMP    -1
COUNT2   DAT                 0
COUNT3   DAT                 0
         END     ORIG