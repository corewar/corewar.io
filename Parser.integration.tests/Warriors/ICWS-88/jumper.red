;      JUMPER.S
;      PAOLO   MONTRASIO
;
FROM           DAT     #0
               SPL     DOUBLEIMP
INIT           MOV     #11,    FROM
LOOP           MOV     @FROM,  <TO
               DJN     LOOP,   FROM
               SPL     @TO
               ADD     #500,   TO
               JMZ     INIT,   FROM
TO             DAT     #800
DOUBLEIMP      MOV     0,      2
               MOV     0,      2
               END     INIT
