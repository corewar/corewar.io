;redcode
;name Pinchers
;author Richard Hendricks

START  SPL.B  $     2, $     0
       JMP.B  $     0, <  -100
       SPL.B  $     2, $     0
       JMP.B  $     0, <    -2
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10
       MOV.I  $     0, $    10

       END    START
