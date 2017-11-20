;      TRAPPER.S
;      FRED B. WADE
;
               JMP     START
POINTER        DAT     0
SPLINST        SPL     SPLINST
START          MOV     SPLINST,        <POINTER
               JMN     START,          TESTLOC
               MOV     #0,             POINTER
KILLEM         MOV     POINTER,        <POINTER
               JMZ     KILLEM,         TESTLOC
               MOV     #0,             POINTER
               JMP     START
TESTLOC        DAT     1
               END
