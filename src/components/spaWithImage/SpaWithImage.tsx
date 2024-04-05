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
  const { isMobile, isTablet } = useScreenSize();
  return (
    <CP.Styled.Flex
      padding="0 1rem"
      height={isMobile || isTablet ? "auto" : "100svh"}
      overflow={isMobile || isTablet ? "hidden" : "auto"}
      style={{ minHeight: "100svh" }}
    >
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
      <ScrollableWrapper>{children}</ScrollableWrapper>
      <CP.Styled.Div
        style={{
          display: isMobile || isTablet ? "none" : "block",
        }}
      >
        <Flex height="100%">
          <Box
            sx={{
              width: 1,
              height: "100svh",
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Flex>
      </CP.Styled.Div>
    </Flex>
  );
};

export default SpaWithImage;
