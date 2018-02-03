;Fydgitr
;by Kenneth W. Clapp
;United States of America
;
TOP2          DAT                  #  0
              DAT                  #  0
              DAT                  #  0
              DAT                  #  0
              DAT                  #  0
TOP1          DAT                  #  0
RESTOMP       MOV      ZERO,       @  DEST1
STOMP         MOV   <  DEST1,      <  DEST2
              MOV   <  DEST1,      <  DEST2
              MOV   <  DEST1,      <  DEST2
              MOV   <  DEST1,      <  DEST2
              JMZ      STOMP,      @  DEST1
              ADD   #  9,             DEST1
SPLITA        ADD   #  9,             DEST2
              JMP      RESTOMP
DEST1         DAT                  #  -10
DEST2         DAT                  #  -16
ZERO          DAT                  #  12
              DAT                  #  10
SKIPA         DAT                  #  325
              SPL                     SPLITA
              DAT                  #  4
              DAT                  #  678
              JMP                     DEST2
              DAT                  #  7
              DAT                  #  678
              JMP                     SKIPA
              DAT                  #  1993
              DAT                  #  325
START         MOV   <  ZERO,          DEST
              MOV   <  ZERO,          DEST
              MOV   <  ZERO,          STOP
LOOP          MOV      NUM1,       <  DEST
              MOV      NUM2,       <  DEST
              ADD   #  14,            DEST
              DJN      LOOP,          COUNT
STOP          JMP      START
              JMP      RESTOMP
NUM1          JMP                     NUM1-1
NUM2          SPL                     NUM2-12
COUNT         DAT                  #  1
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
;
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
              DAT                  #  1
;
DEST          DAT                  #  1
              END      START
