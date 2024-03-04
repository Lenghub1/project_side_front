import React, { useState } from "react";

import { CONFIG } from "./config";

const EMPTY_GROUP = "EMPTY";

export const ComponentsOverview = () => {
  const [mode, setMode] = useState<string>("light");
  const [query, setQuery] = useState("");

  const data = query
    ? Object.keys(CONFIG).reduce(
        (res, groupName) => {
          const group = CONFIG[groupName].filter((componentName) =>
            componentName.toLowerCase().includes(query.toLowerCase())
          );

          if (group.length > 0) {
            if (!res[EMPTY_GROUP]) {
              res[EMPTY_GROUP] = [];
            }

            res[EMPTY_GROUP].push(...group);
          }

          return res;
        },
        {} as typeof CONFIG
      )
    : CONFIG;

  const groups = Object.keys(data);
  const hasData = groups.length > 0;

  return (
    <div
      id="components-overview"
      className="sb-unstyled"
      style={{ paddingTop: 30 }}
    >
      Component OverView
    </div>
  );
};
