; Parasite6.s
;
DPTR1    DAT                    1024*4
ORG      JMN     ATT1,        @ DPTR1
         ADD   # 8,             DPTR1
C1       JMN     ATT2,        @ DPTR2
         SUB   # 8,             DPTR2
C2       JMN     ORG,           DPTR2
ORG2     MOV   # 1024*4+13,     DPTR1
         MOV   # 1024*4-14,     DPTR2
LOOP     MOV     JBOMB,       @ DPTR1
         ADD   # 2,             DPTR1
         MOV     JBOMB,       < DPTR2
         DJN     LOOP,          DPTR2
         MOV     DPTR2,         JBOMB
         JMP     ORG2
ATT1     MOV   # 16,            COUNT
LOOP1    MOV     SBOMB,       < DPTR1
         DJN     LOOP1,         COUNT
         ADD   # 32,            DPTR1
         JMP     C1
ATT2     MOV   # 15,            COUNT
LOOP2    MOV     SBOMB,       < DPTR2
         DJN     LOOP2,         COUNT
         SUB   # 1,             DPTR2
COUNT    JMP     C2
JBOMB    JMP     0
SBOMB    SPL     0
DPTR2    DAT                    1024*4
         END     ORG
