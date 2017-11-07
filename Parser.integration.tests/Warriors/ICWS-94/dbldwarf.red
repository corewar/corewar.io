DAT             #-0001
SUB #00005,   -0001
MOV #00000,  @-0002
JMP  -0002        
DAT          #0000
start   SPL  -0004,   #-1     
ADD #00005,   -0002
MOV #00000,  @-0003
JMP  -0002        
END  start     
