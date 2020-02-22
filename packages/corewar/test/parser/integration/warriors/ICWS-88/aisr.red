;Asi-R
;by Paolo Montrasio
;Italy
;
START         MOV   # -11,            B
LOOP          CMP   <  A,          <  B
              JMP      BOMB
              DJN      LOOP,          A
              MOV   # -11,            B
              MOV   #  5462,          A
LOOP2         MOV      ZERO,       <  A
              MOV      ZERO,       <  B
              DJN      LOOP2,         A
              MOV   #  5462,          A
B             JMP      START
BOMB          MOV      TRAP1,      @  A
              MOV      TRAP1,      @  B
              MOV      TRAP,       <  A
              MOV      TRAP,       <  B
              JMP      LOOP
TRAP          SPL                    TRAP
TRAP1         JMP      TRAP
ZERO          DAT                 #  0
A             DAT                 #  5462
              END      START
