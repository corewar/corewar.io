module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      '**/tests/*.ts',
      '**/*Helper.ts'
    ],
    browsers: ['PhantomJS'],
    singleRun: true,
    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },

    reporters: ["progress",'coverage', "karma-typescript"],
  });
};