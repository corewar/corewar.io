# Core

The Core is the landscape on which Corewar warriors battle for survival.

The Core represents computer memory within the Corewar virtual machine (or simulator). Each position within this memory is known as an [Address](#addresses) and each Address within the Core can contain a single [redcode](../redcode/) instruction.

At the beginning of a Round all competing warriors are [loaded](loader) into Core. This means that each of a Warrior's instructions are copied into successive Core addresses.

The instructions which Warriors execute have the ability to change the data stored within the Core, even overwriting or modifying their own instructions!  In this way Warriors attempt to corrupt their opponent's program code by modifying the area of the Core which contains their opponent's instructions.

## Initialisation

When a Round begins a new Core is initialised.  The size of the Core is determined by the rules configured for the round with the default size being 8000.  By default all instructions within the Core are initialised to: `DAT.F $0, $0` which are [Dat](../redcode/opcodes#dat_data) instructions.

## Addresses

Each position within Core has an abolute address, however in practice, warrior's use relative addresses and are unable to know the absolute address of the instructions they execute.

Because Warriors use relative addresses, it doesn't matter where in the Core the warrior is loaded, all addresses will still be valid as they are relative to the Warrior's current position, or more specifically relative to the the address of the currently [executing](execution) instruction.

Another important features of Corewar addressing (and maths operations in general) is that it uses mod maths.  This means that numbers and addresses within Corewar can never be less than zero or greater than or equal to the size of the Core.  If a number exceed the size of the Core it is wrapped back round to zero.

For example if the Core was of size 80 then adding 40 and 41 together would result in the number 1:

```redcode
40 + 41 = 1
```

This can be calculated by finding the modulus (or remainder) of dividing a number by the size of the Core.

```redcode
Add the two numbers together
40 + 41 = 81

Divide the result by the core size (80) and take the remainder
81 % 80 = 1
```

Because of relative addressing and mod math addressing, the Core is actually more like a circle than a grid.
