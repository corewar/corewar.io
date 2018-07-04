# Org and End Directives

By default, warriors are loaded into core with the first instruction as the starting instruction.

The `org` directive allows a different starting address to be specified. The `org` directive should be written on its own line and followed by an address indicating the start address relative to the first address in the warrior.

By convention, the `org` directive is usually placed at the top of the warrior's code.

```
org 1
dat #4, #0
add.ab -1, -1
```

The above example uses the `org` directive to set the first instruction to the `add` instruction rather than the `dat` instruction.

The `org` directive was introduced in the [ICWS'94](./#standards) standard. Previous standards used the `end` directive instead, which worked in the same way but was placed at the end of the warrior.

```
dat #4, #0
add.ab -1, -1
end 1
```

Note the `end` and `org` directives are semantically equivalent and either can be used.

## Parser Warnings

If both `ORG` or `END` directive is specified, the `ORG` directive will be used to determine the start address.

If multiple `ORG` or `END` directives are detected, the last one will be used (with `ORG` taking precedence over `END`).

Both these situations will generate a parser warning.
