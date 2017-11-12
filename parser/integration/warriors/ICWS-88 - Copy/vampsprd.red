;      VAMPSPRD.S
;      JON NEWMAN
;
INIT           JMP     CLOOP
COUNT          DAT     10
CLOOP          MOV     @SOURCE,        <DEST
               DJN     CLOOP,          SOURCE
               ADD     #3,             DEST
               JMP     3
BLANK1         DAT     0
BLANK2         DAT     0
               SPL     @DEST
               MOV     #19,            SOURCE
               ADD     #1416,          DEST
               DJN     CLOOP,          COUNT
DEST           DAT     1421
SOURCE         DAT     19
BLANK3         DAT     0
BLANK4         DAT     0
TARGET         DAT     -1401
BOMBLOOP       MOV     BITE,           @TARGET
               MOV     FANG,           <TARGET
               ADD     #632,           BITE
               SUB     #631,           TARGET
               JMP     BOMBLOOP
BLANK5         DAT     0
BLANK6         DAT     0
BITE           DAT     1410
TRAP           MOV     #-18,           TTARG
               MOV     #-7,            PURGE
TRAPLOOP       MOV     #-18,           <TTARG
               SPL     @PURGE
               JMP     @PURGE
BLANK7         DAT     0
BLANK8         DAT     0
FANG           JMP     @1
TTARG          DAT     -18
PURGE          DAT     -7
               END

