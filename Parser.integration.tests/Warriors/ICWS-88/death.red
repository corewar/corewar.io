;Death.s
;by Mark A. Durham: July 21, 1988
;United States of America
;
START         DJN      START,      <  BOMB
              JMN      START,         FENCE
FREEZE        MOV      ICE,        @  TARGET
              DJN      FREEZE,        TARGET
              MOV   # -1-TARGET,      TARGET
KILL          MOV      TARGET,     @  TARGET
              DJN      KILL,          TARGET
BOMB          JMN      KILL-1,     #  START
TARGET        DAT                  #  FREEZE-1
ICE           SPL                     ICE
FENCE         DAT                  #  1
              END      START
