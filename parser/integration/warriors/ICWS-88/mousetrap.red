;      MOUSETRP.S
;      BILL HAMAKER
;
START          MOV     #-10,           @TARGET1
               SUB     TARGET1,        @TARGET1
               MOV     TRAP,           <TARGET1
               SUB     #7,             TARGET1
               MOV     TRAP,           -6
               JMP     START
               DAT     #0
               DAT     #0
DOOR           DJN     CELL,           COUNT
               MOV     COUNT,          CELL
CELL           SPL     DOOR
               MOV     BOMB,           @TARGET2
               SUB     #2,             TARGET2
               JMP     CELL
               DAT     #0
               DAT     #0
COUNT          DAT     #64
TRAP           JMP     @TARGET1
TARGET1        DAT     #-3
BOMB           DAT     #-22
TARGET2        DAT     #-22
               END     START

