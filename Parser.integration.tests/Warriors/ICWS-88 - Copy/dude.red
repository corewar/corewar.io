;Dude
;by John R. Perry
;United States of America
;
I             MOV   #  0,             I-1
J             JMP      I
              MOV      TRP2,          J
C3            DAT                  #  C3
DUDE          MOV   #  0,             CNT
              MOV   #  201,           C2
              MOV   #  -99,           C3
LOOP          MOV   <  CNT,        <  C2
              MOV      BMB,        <  C3
              CMP   # -16,            CNT
C2            JMP      LOOP,          0
              MOV      CNT,        @  C3
TTT           SPL                     188
              JMP      I
TRP2          JMP      TTT
BMB           SPL                     BMB
CNT           DAT                  #  CNT
              END      DUDE
