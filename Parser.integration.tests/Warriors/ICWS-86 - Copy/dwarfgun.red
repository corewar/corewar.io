;;; dwarfgun program.
;;; Choon Piaw (piaw@soda.berkeley.edu)

stomp   mov     #0,     -1
        jmp     stomp
start   spl     init
        jmp     stomp
ptr     dat     #500
count   dat     #3

;;;; dwarf part

dwf     dat     #5000
loop    mov     #0,     @dwf
        djn     loop,   dwf
;;; initialization
init    mov     #-200,  ptr2
        mov     #0,     count2
        mov     #500,   ptr
        mov     #3,     count
;;; dwarf copy part
dwfcp   mov     @count, <ptr
        djn     dwfcp,  count
        add     #2,     ptr
        spl     @ptr            ; leave dwarf running.
;;;; copy self upstream
selfcp  mov     <count2,<ptr2
        cmp     #-23,   count2
        jmp     selfcp
        add     #2,     ptr2
        jmp     @ptr2
ptr2    dat     #-200
count2  dat     #0
