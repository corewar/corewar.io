;      ROLLER.S
;      M. PALUDAN
;
       JMZ     0,      <7
       CMP     6,      @6
       JMP     3
       SUB     #15,    4
       JMP     -4
       MOV     2,      @2
       JMP     -6
       DAT     #-14
       END
