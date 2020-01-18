;;; This is not intended to be a complete battle program.  Its only purpose
;;; is to demonstrate a program's self-copying ability.
;;;
;;; See also: JUGGERNAUT.

src     dat     #7
dest    dat     #106
start   mov     <src    <dest
        jmn     start   src
        mov     #7      96
        mov     #106    96
        jmp     96
