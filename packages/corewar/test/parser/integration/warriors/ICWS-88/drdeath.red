;Dr. Death
;by A. K. Dewdney
;Canada
;
START         SPL                     PARTA
              SPL                     PARTB
PTR           SPL                     PARTC
TOP           MOV   #  0,             PTR
ZAP           MOV      PTR,           BOMB
SPAWNA        JMP      TOP
PARTA         MOV   #  0,          @  WHOA
              ADD   #  101,           WHOA
LOOPA         MOV   #  0,          @  WHOB
              ADD   #  101,           WHOB
WHOA          MOV   #  1,             BANG
PARTB         JMP      LOOPA
WHOB          DAT                   # 500
CENTER        CMP   @  BOMB,       @  BOMB
              JMP      KILL
              CMP   # -1,             BOMB
              JMP      SKIP1
              SUB   # -32,            BOMB
              SUB   # -32,            BOMB+1
SKIP1         ADD   #  1,             BOMB
              ADD   #  1,             BOMB+1
PARTC         MOV   #  1,             DONG
              JMP      CENTER
MID           SUB   #  1,             BANG-1
              JMZ      SKIP2,         BANG-1
              SPL                     SPAWNA
SKIP2         SUB   #  1,             BANG
              JMZ      SKIP3,         BANG
              SPL                     LOOPA
;
SKIP3         SUB   #  1,             DONG
              JMZ      SKIP4,         DONG
              SPL                     CENTER
SKIP4         SUB   #  1,             DONG+1
              JMZ      SKIP5,         DONG+1
              SPL                     -51
SKIP5         MOV   #  1,             ZAP
              JMP      MID
KILL          MOV   @  BOMB,       @  BOMB+1
              JMP      CENTER
BOMB          DAT                  #  SPAWNA
              DAT                  #  -75
              DAT                  #  1
BANG          DAT                  #  1
DONG          DAT                  #  1
              DAT                  #  1
              END                     START
