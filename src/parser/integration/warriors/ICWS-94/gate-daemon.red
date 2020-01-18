;redcode
;name Gate-Daemon
;author Richard Hendricks

START  SPL    $     2, $     0
       JMP    $     0, <    -3
       SUB    #     3, $    -2
       SPL    $     2, $     0
       JMP    $    -2, $     0
       MOV    $    -4, @    -3
       JMP    @    -4, $     0

       END    START
