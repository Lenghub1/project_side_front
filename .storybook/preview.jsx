import React from "react";
// import "../public/global.css";
import alfaTheme from "./theme";
import Theme, { lightTheme, darkTheme } from "../src/theme";

// import guidelinesStyles from "!css-loader!!postcss-loader!../public/guidelines.css";

/** @type { import('@storybook/react').Preview } */

// if (window.location.href.includes("guidelines")) {
//   setGuidelinesStyles(rmCommentsFromCss(guidelinesStyles.toString()));
// }

export const parameters = {
  viewMode: "docs",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  docs: {
    theme: alfaTheme
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "Quick start",
        "Structure",
        "Components overview",
        "Icons overview",
        "Changelog",
        "UI",
        "HOME",
        "MANAGE"
      ]
    }
  }
};

export const decorators = [
  (Story) => {
    return (
      // <ThemeProvider value={customTheme}>
      <Theme>
        <div className="sb-unstyled">
          <Story />
        </div>
      </Theme>
      // </ThemeProvider>
    );
  }
];

export default {
  parameters,
  decorators
};
