;Sieve
;by Dirk Wolff-Klammer
;West Germany
;
A             DAT                    0
START         MOV   <  COUNT,        DEST
;
              JMZ      LEND,         COUNT
              MOV   #  16,           A
LOOP          MOV   @  A,          < DEST
              DJN      LOOP,         A
              SPL                 @  DEST
              JMZ      START,        A
LEND          MOV   #  7,            COUNT
              JMZ      START,        A
COUNT         DAT                    7
              DAT                    125
              DAT                    250
              DAT                    500
              DAT                    1000
              DAT                    2000
              DAT                    4000
DEST          DAT                    0
              END      START
