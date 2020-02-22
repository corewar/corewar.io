; Kirin.s
;
; by Eiji-Kako
;
A     DAT            # 4096
B     DAT            # 9003
H1    SPL     0
H2    JMP    -1
ORG   MOV     H2,    < B
      MOV     H1,    < B
      ADD   # 826,     B
      DJN     ORG,     A
      SPL     PROG2
      JMP     PROG3
      SPL     0
      JMP    -1
PROG2 DJN     0,       A
      DJN    -1,       A
      JMP    -1
PROG3 MOV     0,       1
      END     ORG
