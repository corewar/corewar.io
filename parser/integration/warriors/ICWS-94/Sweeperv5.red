;redcode-b verbose
;kill
;author Richard Hendricks
;name  Sweeper, v5
;strategy Basically, this program bootstraps itself 5000 cells away from its 
;strategy decoy.  Then it copies every 5th element onto the 6th, hopefully 
;strategy hurting enemy code, while running a 3-point imp spiral.
;strategy thanks to myer, bremermr@sonata.cc.purdue.edu for the help!
;strategy All good ideas are his, all goof-ups mine!
;Scored 145 Ranked 9th. :) :) :) :) :)
LOC EQU 4000
for 20                            ;Decoy
       MOV 1,1
       DAT #2667,<2667
rof
start  SPL #67,<-12               ;Start of actual bomber
       ADD -1,-13                 ;The <'s maintains the gate
       MOV -3,<-14                
       DAT <-15,<-15             
boot   MOV start, start+LOC-2     ;This is the code to move the bomber
       MOV start+1, start+LOC-1   ;away from our decoy
       MOV start+2, start+LOC
       MOV start-1,boot           ;This removes all references to the
       MOV start-1, boot+1        ;location we put our bomber
       MOV start-1, boot+2
       SPL 2,<-1335
       JMP start+LOC-2            ;This starts bomber execution
       MOV start-1, boot+10       ;This removes the reference in the JMP
for 15                            ;More decoy
       DAT <2667,#2667
       MOV 1,1
rof
end boot
