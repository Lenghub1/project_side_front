import React from "react";

import { Gap } from "./components/Gap.jsx";
import { DocumentIcon } from "./components/icons/DocumentIcon.jsx";
import { ComponentIcon } from "./components/icons/ComponentIcon.jsx";
import { FlashIcon } from "./components/icons/FlashIcon.jsx";
import { OverviewIcon } from "./components/icons/OverviewIcon.jsx";
import { ComponentsOverviewIcon } from "./components/icons/ComponentsOverviewIcon.jsx";
import { DiamondsBlankIcon } from "./components/icons/DiamondsBlankIcon.jsx";

const NAME_TO_ICON_MAP = {
  "Quick start": <FlashIcon />,
  "Icons overview": <OverviewIcon />,
  "Components overview": <ComponentsOverviewIcon />,
};

const renderIcon = (item) => {
  const { type, name, parent, depth } = item;
  switch (type) {
    case "docs": {
      return (
        NAME_TO_ICON_MAP[name] || (
          <>
            {depth > 1 && <Gap size={20} />}
            <DocumentIcon />
          </>
        )
      );
    }

    case "ui": {
      if (parent && parent.includes("ui")) {
        return <ComponentIcon />;
      }

      return <DocumentIcon />;
    }

    case "story": {
      return (
        <>
          {depth > 1 && <Gap size={20} />}
          {depth > 1 ? <DiamondsBlankIcon /> : <ComponentIcon />}
        </>
      );
    }

    default:
      return null;
  }
};

export const renderLabel = (item) => (
  <span className="item-label">
    {renderIcon(item)}
    <span>{item.name}</span>
  </span>
);
