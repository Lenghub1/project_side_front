import React from "react";
import kebab from "lodash.kebabcase";
import cn from "classnames";

import { createComponentUrl } from "../../../../utils/createComponentUrl";
import { Typography } from "ui";

import styles from "./index.module.css";

type CardProps = {
  componentName: string;
  mode: string;
};

enum ImageState {
  INITIAL,
  LOADED,
  ERROR,
}

const COMPONENTS_WITH_SAFE_ZONE = ["SidePanel"];

export const Card: React.FC<CardProps> = ({ componentName, mode }) => {
  const [imageState, setImageState] = React.useState(ImageState.INITIAL);
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setImageState(ImageState.LOADED);
    }
  }, []);

  const handleError = () => setImageState(ImageState.ERROR);

  const handleLoad = () => setImageState(ImageState.LOADED);

  console.log(
    "createImageUrl(componentName, mode) : ",
    createImageUrl(componentName, mode),
    componentName
  );
  return (
    <a href={createComponentUrl(componentName)} className={styles.card}>
      <figure>
        <div className={styles.imageWrapper}>
          {imageState === ImageState.ERROR && (
            <div
              className={cn(styles.image, {
                [styles.withSafeZone]:
                  COMPONENTS_WITH_SAFE_ZONE.includes(componentName),
              })}
            >
              <Typography variant="default">{componentName}</Typography>
            </div>
          )}

          {imageState !== ImageState.ERROR && (
            <img
              ref={imageRef}
              src={createImageUrl(componentName, mode)}
              alt={componentName}
              className={cn(styles.image, {
                [styles.imageHidden]: imageState === ImageState.INITIAL,
                [styles.withSafeZone]:
                  COMPONENTS_WITH_SAFE_ZONE.includes(componentName),
              })}
              loading="lazy"
              decoding="async"
              onError={handleError}
              onLoad={handleLoad}
            />
          )}
        </div>

        <figcaption className={styles.caption}>
          <Typography variant="default">{componentName}</Typography>
        </figcaption>
      </figure>
    </a>
  );
};

function createImageUrl(componentName: string, mode: string) {
  return `./images/${kebab(componentName)}-${
    mode === "dark" ? "dark-" : ""
  }preview-snap.png`;
}
