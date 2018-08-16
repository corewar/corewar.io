# Comments

Redcode allows single line comments to be included in the warrior's source code by using the semi-colon `;` character similar to assembly language.

The parser will ignore everything after the semi-colon (exlucding it from the parsed output) until it encounters the end of the line.

At times, redcode can be quite cryptic so comments are a useful way of documentation and explaining your code.  Placing a semi-colon at the beginning of a line is also a convenient way to temporarily remove a line of code while debugging etc.

```redcode
mov 0, 1
; this is a comment
add 3, 4   ; this is also a comment
;jmp -1 this line of code has been commented out and will not be included in the parsed output
```

The above redcode will be parsed to produce the following output.  Note that comments are completed removed.

```redcode
mov.i $0, $1
add.ab $3, $4
```

It is possible to include multi-line comments in redcode by using a [FOR block](preprocessor#for) with a count of zero:

```redcode
FOR 0
This is a multi-line comment
It is a good place to explain a complex strategy
or subtle nuance of the warrior's code
```

Because the `FOR` block has a count of zero, the entire thing is completely removed during parsing.
