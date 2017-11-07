;      PLAGUE.S
;      R. PALUDAN
;
       SPL     13
       SPL     12
       ADD     #24,    10
       JMZ     -1,     @9
       MOV     12,     @8
       MOV     12,     <7
       ADD     #1,     6
       JMP     -5
       DAT             #1
       DAT             #2
       DAT             #3
       DAT             #4
       DAT             #5
       MOV     2,      <2
       JMP     -1
       DAT             #-16
       JMP     -1
       SPL     0
       END

