;      PMJUMP.S
;      PAOLA MONTRASIO
;
               JMP     SPAWN
FROM           DAT     0
SPAWN          SPL     DOUBLEIMP
INIT           MOV     #11,    FROM
LOOP           MOV     @FROM,  <10
               DJN     LOOP,   FROM
               SPL     @TO
               ADD     #500,   TO
               JMZ     INIT,   FROM
TO             DAT     800
DOUBLEIMP      MOV     0,      2
               MOV     0,      2
               END

