;      DRACULA.S
;      MARTIN  STENT
;
START          MOV     TRAP,           @TARGET1
               SUB     #4,             TARGET1
               ADD     #4,             TRAP
               JMZ     START,          TRIGGER
WIPE           MOV     TARGET2,        @TARGET2
               DJN     WIPE,           TARGET2
KILLIMP        MOV     2,              <KILLIMP
               MOV     TARGET2,        <KILLIMP
               JMZ     KILLIMP,        TARGET2
WAITING        JMP     0
TARGET1        DAT     #-11
TARGET2        DAT     #-8
TRAP           SPL     14
HOLD           SPL     1
               DJN     -1,             TRIGGER
TRIGGER        DAT     #0
               END     START
