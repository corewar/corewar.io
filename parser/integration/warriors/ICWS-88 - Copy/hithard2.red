;Hit Hard 2
;by Jon Newman
;United States of America
;
START         MOV   #  4,             CNT
              MOV   #  11,            BOMB1
LOOP1         MOV      BOMB1,        -8008
              ADD      BOMB1,         LOOP1
              JMN      LOOP1,         LOOP1
START2        MOV   # -8008,          LOOP1
              SUB      CNT,           BOMB1
              DJN      LOOP1,         CNT
LOOP2         MOV      BOMB2,      <  TARGET2
CNT           JMP      LOOP2,         TARGET2+1
BOMB1         SPL      0,             11
BOMB2         DAT                  # -10
TARGET2       DAT                  # -10
              END      START
