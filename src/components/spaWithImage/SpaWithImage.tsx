import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import { Flex } from "@/pages/getStarted/GetStarted"; // Ensure this import is correctly typed
import CP from ".."; // Ensure this import is correctly typed
import useScreenSize from "@/hooks/useScreenSize"; // Ensure this hook is correctly typed

// Define the type for the children prop
interface ScrollableWrapperProps {
  children: React.ReactNode;
}

export const ScrollableWrapper = ({ children }: ScrollableWrapperProps) => {
  return (
    <CP.Styled.Flex padding="0 1rem" height="100vh" overflow="auto">
      <CP.Styled.Div padding="1rem 0" margin="auto 0">
        {children}
      </CP.Styled.Div>
    </CP.Styled.Flex>
  );
};

// Define the type for the children prop
interface SpaWithImageProps {
  children: React.ReactNode;
}

const SpaWithImage = ({ children }: SpaWithImageProps) => {
  const location = useLocation();
  const { isMobile, isTablet } = useScreenSize(); // Ensure useScreenSize returns a typed object

  const getImageSrc = (pathname: string): string => {
    const routeToImageMap: { [key: string]: string } = {
      "/login": "/random-unsplash.jpg",
      // Add other routes and images as needed
    };

    return routeToImageMap[pathname] || "/random-unsplash.jpg";
  };

  const imageSrc = getImageSrc(location.pathname);

  return (
    <Flex>
      <>
        {isMobile || isTablet ? (
          <>{children}</>
        ) : (
          <ScrollableWrapper>{children}</ScrollableWrapper>
        )}
      </>
      <CP.Styled.Div
        style={{
          display: isMobile || isTablet ? "none" : "block",
        }}
      >
        <Flex height="100%">
          <Box
            component="img"
            src={imageSrc}
            alt="Dynamic image based on route"
            sx={{
              width: 1,
              height: "100vh",
              objectFit: "cover",
            }}
          />
        </Flex>
      </CP.Styled.Div>
    </Flex>
  );
};

export default SpaWithImage;
