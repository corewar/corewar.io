;redcode
;name MICE
;author Chip Wendell
;
;       MICE
;       by:
;         Chip Wendell
;
;
;        org     org
ptr     dat     #0     ,  #0
start   mov     #12    ,  ptr
loop    mov     @ptr   ,  <copy
        djn     loop   ,  ptr
        spl     @copy  ,  0
        add     #653   ,  copy
        jmz     start  ,  ptr
copy    dat     #0     ,  #833
        end     start