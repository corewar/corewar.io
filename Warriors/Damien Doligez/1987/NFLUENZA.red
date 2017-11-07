;      NFLUENZA.S
;      MORRISON CHANG
;
               JMP     START
STOMPER        MOV     #0,     -2
               MOV     #0,     -3
               JMP     STOMPER
START          SPL     STOMPER
               SPL     SPREAD
               SPL     HOLDII
HOLDI          JMP     0
HOLDII         JMP     0
VIRUS          SPL     0
               JMP     -1
PTR            DAT     -16
SPREAD         MOV     -2,     <PTR
               MOV     -4,     <PTR
               SUB     #14,    PTR
               JMN     SPREAD, PTR
RESET1         MOV     #-16,   PTR
KILL           MOV     #0,     <PTR
               SUB     #15,    PTR
               JMN     KILL,   PTR
RESET2         MOV     #-16,   PTR
               JMP     SPREAD
               END
