;Wasp Nest
;by Alexander Burtzev
;Union of Soviet Socialist Republics
;
PUSK          MOV      FB,         <  B
              MOV      FA,         <  B
              MOV   <  A,          <  B
              SUB   <  A,          <  A
              JMP   @  B
U             DAT                     4000
SKIPA         MOV      U,          <  U
              DJN      SKIPA,      <  U
S             SPL                     SKIPA
A             JMP      S
FA            JMP      A
              JMP     -1
              JMP     -1
              JMP     -1
              JMP     -1
              JMP     -1
              JMP     -1
              JMP     -1
B             JMP     -1
FB            JMP     -1
START         MOV   # -223,          FB
SEC           MOV   #  0,            A
;
              ADD   # -1407,         B
              SPL                    10
              SPL                    10
              SPL                    10
              SPL                    10
              SPL                    10
              SPL                    10
              SPL                    10
              SPL                    10
              SPL                    10
              JMP                    PAUSE
              JMP                    1
              JMP                    1
              JMP                    1
              JMP                    1
              JMP                    1
              JMP                    1
              JMP                    1
              JMP                    1
              JMP                    PUSK
PAUSE         JMP                    1
              JMP                    1
              JMP                    1
              DJN      SEC,          K
              MOV   # -1000,         K
LOOP          MOV      K,          < K
              DJN      LOOP,       < K
K             DAT                    7
              END      START
