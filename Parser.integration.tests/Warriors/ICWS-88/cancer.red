;      CANCER.S
;      Thomas Gettys
;      1987
;
               JMP     START
               JMP     -1
START          SPL     COPY2
COPY1          MOV     CNTR,           PTR
INFECT1        MOV     GERM,           <PTR
               JMN     INFECT1,        PTR
               MOV     CNTR,           PTR
KILL1          MOV     POISON,         <PTR
               JMN     KILL1,          PTR
               JMP     COPY1
COPY2          MOV     CNTR,           PTR
INFECT2        MOV     GERM,           <PTR
               JMN     INFECT2,        <PTR
               MOV     CNTR,           PTR
KILL2          MOV     POISON,         <PTR
               JMN     KILL2,          PTR
               JMP     COPY2
GERM           SPL     0
POISON         DAT     #1
CNTR           DAT     #-20
PTR            DAT     #0
               END     START
