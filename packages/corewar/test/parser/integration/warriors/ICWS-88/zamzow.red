;      ZAMZOW.S
;      J. P. ZAMZOW
;
               JMP     START
SAFETY         DAT     0
               DAT     0
               DAT     0
               DAT     0
               DAT     0
               DAT     0
START          JMZ     START,          <SEEK
               CMP     FLAG,           @SEEK
               JMP     KILL
               MOV     #8166,          SEEK
               JMP     START
KILL           ADD     #6,             SEEK
               MOV     BOMB,           <SEEK
               MOV     BOMB,           <SEEK
               MOV     BOMB,           <SEEK
               MOV     BOMB,           <SEEK
               MOV     BOMB,           <SEEK
               MOV     BOMB,           <SEEK
               MOV     BOMB,           <SEEK
               DJN     START,          COUNT
               MOV     SURVIVR,        2007
               MOV     FLAG,           2007
               SPL     2005
               JMP     START
COUNT          DAT     150
SURVIVR        JMP     0
BOMB           DAT     0
SEEK           DAT     -27
FLAG           DAT     327
               END

