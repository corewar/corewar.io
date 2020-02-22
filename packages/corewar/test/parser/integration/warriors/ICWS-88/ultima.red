;      ULTIMA RATIO REGUM (URR.S)
;      LASZLO KISS
;
START  MOV     A,      <ADDR
       MOV     B,      <ADDR
       JMP     -2,     ADDR
S1     MOV     #-16,   ADDR
       MOV     C,      <ADDR
       JMN     -1,     ADDR
       MOV     #-16,   ADDR
       JMP     START
A      JMP     -1
B      SPL     0
C      DAT     #0
ADDR   DAT     #-16
       END

