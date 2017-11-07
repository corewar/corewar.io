;      KWC72C.S
;      KENNETH CLAPP
;
TOP2           DAT     #0
               DAT     #0
               DAT     #0
               DAT     #0
               DAT     #0
TOP1           DAT     #0
RESTOMP        MOV     ZERO,   @DEST1
STOMP          MOV     <DEST1, <DEST2
               MOV     <DEST1, <DEST2
               MOV     <DEST1, <DEST2
               MOV     <DEST1, <DEST2
               JMZ     STOMP,  @DEST1
               ADD     #9,     DEST1
               ADD     #9,     DEST2
               JMP     RESTOMP
DEST1          DAT     #TOP1
DEST2          DAT     #TOP2
ZERO           DAT     #TOP
               DAT     #10
               DAT     #325
               SPL     -7
               DAT     #4
DEST           DAT     #679
TOP            MOV     <ZERO,  679
               MOV     <ZERO,  DEST
               MOV     <ZERO,  STOP
START          MOV     NUM1,   <DEST
               MOV     NUM2,   <DEST
               ADD     #14,    DEST
               DJN     START,  TOP
STOP           JMP     TOP
               JMP     RESTOMP
NUM1           JMP     -1
NUM2           SPL     -12
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               DAT     #1
               END     START
