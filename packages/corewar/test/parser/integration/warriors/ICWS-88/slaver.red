;Slaver
;by Gerald Frost
;United States of America
;
TOP           MOV      BOMB,          TOP-2
              JMP      TOP,        <  TOP-2
CATCH         JMP   @  CATCH,         TOP-1
BOMB          DAT      0,             0
LOOP          MOV      BOMB,          TOP-2
              ADD   # -5,             CATCH
              ADD   #  5,             SLAVER
SLAVER        MOV      CATCH,         TRIGGER
              DJN      LOOP,       #  1620
              MOV   # -8,             CATCH
              MOV   #  16,            SLAVER
              MOV   #  1620,          SLAVER+1
              SPL   <  TOP-2,         TOP
              JMP      SLAVER,        TOP
CLUB          DAT      0,             0
ENTRY         MOV      TOP+1,      <  SLOT
              MOV      BOMB,       <  SLOT
HOLE          MOV      BOMB,       <  SLOT
              SPL   <  TOP-6,         HOLE
SLOT          JMP      ENTRY,         TOP-1
              JMP      ENTRY,         0
TRIGGER       JMP      ENTRY,         0
              JMP      ENTRY,         0
              JMP      ENTRY,         0
              END      SLAVER
