;Wipe 5
;by Anonymous
;
COUNT         DAT                    0
START         MOV      COUNT-1,      CLEAR
LOOP1         SUB      SUBT,         PNTR
              CMP      CLEAR,      @ PNTR
              JMP      WIPE
              JMP      LOOP1
WIPE          CMP      IMP,        @ PNTR
              JMP      WIPE2
GATE          SPL      GETIMP
WIPE2         MOV      PNTR,         PTR
LOOP2         MOV      SPLIT,      @ PTR
              ADD   #  1,            PTR
              CMP      CLEAR,      @ PTR
CLOSED        JMP      LOOP2
              MOV      PTR,        < COUNT
WIP2          MOV      SPLIT,      @ PNTR
              CMP      CLEAR,      < PNTR
              JMP      WIP2
              CMP      SPLIT,        PTR
              JMP      LOOP1
              MOV      COUNT,        PNTR
              MOV   # -58,           PNTR
              ADD      COUNT,        PNTR
              MOV      CLEAR,      @ PNTR
              SUB   #  4,            SUBT
              JMN      LOOP1,        SUBT
              MOV      COUNT,        PTR
              MOV   #  0,            COUNT
LOOP4         MOV   <  COUNT,        CLEAR
              MOV      SPLIT2,     @ CLEAR
              CMP      COUNT,        PTR
              JMP      LOOP4
              MOV      PNTR,         PTR
LOOP3         MOV      PTR,        < PNTR
              JMP      LOOP3
IMPPTR        DAT                    66
IMPPTR2       DAT                    66
VELOCITY      DAT                    3
GETIMP        ADD      PNTR,         IMPPTR
              MOV      CLOSED,       GATE
              MOV      IMPPTR,       IMPPTR2
LOOP5         MOV      CLEAR,      @ IMPPTR
              CMP   @  IMPPTR2,      IMP
              JMP      LOOP5
              MOV      CLEAR,      @ IMPPTR2
              ADD      VELOCITY,     IMPPTR2
              ADD      VELOCITY,     IMPPTR
              CMP   @  IMPPTR2,      IMP
              JMP      LOOP5
              ADD   #  1,            VELOCITY
              JMP      LOOP5
IMP           MOV      IMP,          IMP+1
SUBT          DAT                    12
SPLIT2        SPL                    SPLIT2
CLEAR         DAT                    0
PTR           DAT                    0
SPLIT         SPL                    PTR
PNTR          DAT                   -58
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
;
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
              DAT                    1
              END      START
