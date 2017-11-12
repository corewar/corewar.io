; LinCoGs
; Mark A.Durham
; October 5, 1987
;
START  ADD     #4,     RETURN
       JMP     RANDOM
SRC    DAT             #0
GAIT   DAT             #7
RANDOM MOV     GAIT,   SRC
       ADD     SRC,    SRC
       ADD     SRC,    SRC
       ADD     SRC,    GAIT
       ADD     #1,     GAIT
RETURN JMP     @RETURN
BOMB   ADD     #4,     RETURN
       MOV     GAIT,   @GAIT
       JMP     RANDOM
COPY   MOV     #BTM+1-SRC, SRC
       MOV     #BTM-1, DEST
DEST   ADD     #BTM,   GAIT
LOCO   MOV     <SRC,   <DEST
       JMN     LOCO,   SRC
       SPL     @GAIT
       ADD     #1,     RETURN
BTM    JMP     RANDOM
       END     START
