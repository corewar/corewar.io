# Preprocessor

A number of preprocessor directives can be used within redcode. These directives affect how the parser turns the source redcode into the load file.

Note these preprocessor directives are used a parse time and are not output directly into the parsed output itself.

## EQU

The `EQU` directive allows `constants` to be defined, which can then be referred to through out your code.  This works in a similar way to [labels](labels). The difference is that you explicitly specify the value of these `constants` rather than being implicitly set based on where they are declared within the redcode.

The syntax for the `EQU` directive is as follows

```redcode
name EQU value
```

Constant names follow the same naming rules as labels (see [labels](labels) for details).

The value can be either a number, a label, one of the [special constants](#special-constants) or even a [mathematical expression](#mathematical-expressions) combining a mixture of these values.

### Literal Number Constant

Here is an example of using `EQU` to set a constant within the classic `dwarf`:

```redcode
step EQU 3044
ORG  top
bmb: dat    #step #step
top: add.ab bmb, bmb
     mov    bmb, @bmb
     jmp    top
```

The parsed output will look like this:

```redcode
ORG 1
DAT.F #3044, #3044
ADD.AB $-1, $-1
MOV.I $-2, @-2
JMP.B $-2, $0
```

Notice that all references to `step` have been replaced with the value of `step` i.e. `3044`.

### Label Constant

You can also use a `label` when declaring a `constant` using the `EQU` directive. When you do this, the parser first replaces all references to the constant within code with the `label` that the `constant` is equal to. After this substitution has been made, labels are replaced with their relative addresses in the normal way, see [labels](labels) for details.

```redcode
mybmb EQU bmb
ORG  top
bmb: dat    #step #step
top: add.ab mybmb, mybmb
     mov    mybmb, @mybmb
     jmp    top
```
Notice here that `mybmb` and `bmb` are equivalent.

## Mathematical Expressions



## Special constants



## FOR


