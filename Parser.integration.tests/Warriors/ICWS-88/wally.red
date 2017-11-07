;Wally
;by Gaylan D. Wallis
;United States of America
;
KILL          MOV      J1,         @ PTR
LOOP          MOV      S1,         < PTR
              JMZ      LOOP,       < PTR
              CMP   #  842,        @ PTR
              JMP      KILL
              MOV   #  0,            S1
              ADD   # -16,           PTR
              JMP      LOOP
S1            SPL                    S1
J1            JMP     -1
PTR           DAT                   -64
              DAT                    842
              DAT                    842
              DAT                    842
              DAT                    842
              END      KILL
