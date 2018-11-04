module.exports = {
  extends: [
    'stylelint-config-css-modules',
    'stylelint-config-recommended-scss',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
}
