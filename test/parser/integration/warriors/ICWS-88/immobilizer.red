;Immobilizer
;by Bram Cohen
;United States of America
;
START         SPL                      STARTA
              JMP       STARTB
PTRC          DAT                    # 26
PTRA          DAT                    # 32
IMMBLZEA      MOV    #  32,            PTRA
STARTA        MOV       SPLBOMBA,    @ PTRA
              ADD    #  16,            PTRA
              JMN       STARTA,        PTRA
KILLA         MOV    #  26,            PTRC
SKIPA         MOV       PTRA,        @ PTRC
              ADD    #  2,             PTRC
              JMN       SKIPA,         PTRC
              JMP       IMMBLZEA
SPLBOMBA      SPL                      SPLBOMBA
              DAT                    # 0
              DAT                    # 0
              DAT                    # 0
IMMBLZEB      MOV    # -32,            PTRB
STARTB        MOV       SPLBOMBB,    @ PTRB
              SUB    #  16,            PTRB
              JMN       STARTB,        PTRB
KILLB         MOV    # -26,            PTRB
SKIPB         MOV       PTRB,        @ PTRB
              SUB    #  2,             PTRB
              JMN       SKIPB,         PTRB
              JMP       IMMBLZEB
SPLBOMBB      SPL                      SPLBOMBB
PTRB          DAT                    #-32
              END      START
