;      DR. FROG.S
;      OGI OGAS
;
NEW    MOV     #-3,    @2
       DJN     NEW,    PTR
PTR    DAT     #-3
START  SPL     NEW
       SPL     0
       MOV     0,      3
       MOV     0,      3
       MOV     0,      3
       END     START

