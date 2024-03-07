module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "initial",
        "add",
        "change",
        "fix",
        "chore",
        "refactor",
        "docs",
        "style",
        "test",
        "perf",
        "ci",
        "build",
        "revert",
        "reset",
      ],
    ],
  },
};
