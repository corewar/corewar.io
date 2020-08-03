export const redcodeLanguageDefinition = {
  defaultToken: '',
  tokenPostfix: '.red',
  ignoreCase: true,
  opcodes: [
    'DAT',
    'MOV',
    'ADD',
    'SUB',
    'MUL',
    'DIV',
    'MOD',
    'JMP',
    'JMZ',
    'JMN',
    'DJN',
    'CMP',
    'SLT',
    'SPL',
    'SEQ',
    'SNE',
    'NOP'
  ],
  preprocessor: ['EQU', 'END', 'ORG', 'FOR', 'ROF'],
  addressingModes: ['#', '$', '@', '<', '>', '{', '}', '*'],
  tokenizer: {
    root: [
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            '@opcodes': 'keyword',
            '@preprocessor': 'keyword',
            '@default': 'identifier'
          }
        }
      ],

      // meta
      [/;(name|author|strategy).*$/, 'meta'],
      [/;(redcode|redcode-.*)$/, 'meta'],
      [/;assert .+$/, 'meta'],

      // whitespace
      { include: '@whitespace' },

      // preprocessor maths <- THIS IS WRONG TROUbLE FINDING * (is it preprocessor?)
      // [/(?<=equ.+)(\+|\-|\*|\/)/][
      //   // delimiters
      //   (/[:,.]/, 'delimiter')
      // ],

      // numbers
      [/[0-9]+/, 'number'],

      // addressing mode
      [/(#|\$|@|<|>|{|}|\*)/, 'type']
    ],
    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/;.*$/, 'comment']
    ]
  }
}

export const redcodeTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // { token: 'custom-info', foreground: '808080' },
    // { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
  ],
  colors: {
    'editor.background': '#353E4A',
    'editor.lineHighlightBackground': '#20252C'
  }
}
