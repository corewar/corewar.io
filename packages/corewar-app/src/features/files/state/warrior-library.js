export const warriorLibrary = [
  {
    name: `Looping Paper`,
    source: `;name Looping Paper
      step   equ 5620
  
      paper   mov    #5,       #0
      copy    mov    <paper,   {dest
              jmn    copy,     paper
              spl    >paper,   {-1277
      dest    jmz    step,     *0`
  },
  {
    name: `Blur Scanner`,
    source: `;name Blur Scanner
      step   equ 4884
  
      wptr    mov.b  scan,       #0
      scan    add    #step,      #step
      gate    mov    *bomb,      >wptr
              jmz.f  scan,       @scan
              jmn    wptr,       *wptr
  
      bomb    spl    0,          0
      clear   mov    dbmb,       >gate
              djn.f  clear,      >gate
      dbmb    dat    <2667,      2-gate`
  },
  {
    name: `Transposition Stone`,
    source: `;name Transposition Stone
      step   equ 1185           ; mod 5
  
      inc     spl    #-step,   <step
      stone   mov    >step,    1-step
              sub    inc,      stone
              djn.f  stone,    <5555`
  },
  {
    name: `Self-Vamping Vampire`,
    source: `;name Self-Vamping Vampire
      step   equ -715           ; mod 5
  
      inc     spl    #step,     <-step
      vampire mov    fang,      @fang   ; fang dropped here
              sub    inc,       fang
              djn.f  vampire,   *fang
  
              for    5
              dat    0,0
              rof
  
      trap    mov    bomb+1,    <vampire-9
              spl    trap
              jmp    trap+1
      bomb    dat    <5334,     <2667
  
              for    3
              dat    0,0
              rof
  
      fang    jmp    trap-vampire-step,<vampire+step
      `
  }
]
