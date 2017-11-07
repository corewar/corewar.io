;SUD
;by Giovanni Ciraulo
;Italy
;
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
       DAT             0
P      DAT             2064
Q      DAT            -2070
START  ADD  # 16,      P
       SUB  # 11,      Q
       CMP  @ P,     @ Q
       JMP    B
CONTR  JMN    START,   P
A      ADD  # 1,       BOMB
       MOV    BOMB,  @ BOMB
       MOV    TNT,   < TNT
       JMP    A
BOMB   DAT             TZP
TNT    DAT             A
B      SUB  # 4,       P
       ADD  # 4,       Q
BA     MOV    DDT,   @ P
       MOV    DDT,   @ Q
TZP    ADD  # 2,       P
       SUB  # 2,       Q
       DJN    BA,      T
       ADD  # 10,      T
       JMP    CONTR
DDT    SPL             DDT
T      DAT             10
       END   START
