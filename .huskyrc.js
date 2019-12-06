const tasks = (...arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'commit-msg': tasks('commitlint -E HUSKY_GIT_PARAMS'),
    'pre-commit': tasks(
      'yarn format',
      'yarn lint',
      'yarn bootstrap',
      'yarn test',
      'yarn run:scoped api/services build:dev',
      'yarn run:scoped client/services build:dev',
    ),
  },
};
