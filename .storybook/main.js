import { dirname, join } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    {
      directory: "../src/components/**",
      titlePrefix: "UI",
      files: "*.stories.*"
    },

    // {
    //   directory: "../../../packages/ui/src/**",
    //   titlePrefix: "UI",
    //   files: "*.stories.*",
    // },
    // {
    //   directory: "../../manage/src/**",
    //   titlePrefix: "Manage",
    //   files: "*.stories.*",
    // },
    // {
    //   directory: "../../home/src/**",
    //   titlePrefix: "Home",
    //   files: "*.stories.*",
    // },
    "./docs/**/*.mdx"
  ],
  addons: [
    getAbsolutePath("@storybook/addon-actions"),
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-viewport"),
    getAbsolutePath("@storybook/addon-console")
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  }
};
export default config;
