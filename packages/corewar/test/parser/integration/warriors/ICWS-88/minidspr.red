;      MINIDSPR.S
;      JON NEWMAN
;
MINID1 MOV     #-3,    <3
MINID2 MOV     #-3,    <2
MINID3 JMP     -2
MINID4 DAT     #-3
CLOOP  MOV     MINID4, @DEST
       MOV     MINID3, <DEST
       MOV     MINID2, <DEST
       MOV     MINID1, <DEST
       SPL     @DEST
       ADD     #1403,  DEST
       DJN     CLOOP,  COUNT
COUNT  DAT     #20
DEST   DAT     #-13
       END     CLOOP
