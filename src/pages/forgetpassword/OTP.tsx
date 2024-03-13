import React, {
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  BaseSyntheticEvent,
  ClipboardEvent,
  SyntheticEvent,
} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CP from "@/components";
import { authApi } from "@/api/auth";
import { handleApiRequest } from "@/api";

const Flex = styled(CP.Styled.Flex)`
  overflow: unset;
`;

const OTPContainer = CP.Styled.Flex;

const OTPInput = styled.input`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const OTP = () => {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);
  const [arrayValue, setArrayValue] = useState<(string | number)[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [maskedValue, setMaskedValue] = useState<(string | number)[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  // handle pasting OTP code
  const handleOnPaste = (e: ClipboardEvent, index: number) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").split("");
    if (paste.every((item) => !isNaN(Number(item)))) {
      let newInputValue = [...arrayValue];
      let newMaskedValue = [...maskedValue];
      for (let i = 0; i < paste.length; i++) {
        if (index + i < arrayValue.length) {
          newInputValue[index + i] = paste[i];
          newMaskedValue[index + i] = "*";
        }
      }
      setArrayValue(newInputValue);
      setMaskedValue(newMaskedValue);
    }
  };
  // handle clicking keyboard event
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const keyCode = parseInt(e.key);
    if (
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !(e.metaKey && e.key === "v") &&
      !(keyCode >= 0 && keyCode <= 9)
    ) {
      e.preventDefault();
    }
  };

  // on change
  const handleChange = (e: BaseSyntheticEvent, index: number) => {
    const input = e.target.value;
    console.log("INPUT index ", index, "=", input);
    if (!isNaN(input)) {
      setArrayValue((preValue: (string | number)[]) => {
        const newArray = [...preValue];
        newArray[index] = input;
        return newArray;
      });

      setMaskedValue((prevValue: (string | number)[]) => {
        const newArray = [...prevValue];
        newArray[index] = "*";
        return newArray;
      });

      if (input !== "" && index < arrayValue.length - 1) {
        inputs.current[index + 1]?.focus();
      }

      // if the 6 input field, has value, then auto submit to OTP verify
      console.log("Lenght of array", arrayValue);
      if (arrayValue.every((value) => value !== "")) {
        arrayValue.every((value) => {
          console.log;
        });
      }
    }
  };

  //handle on key up
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setArrayValue((prevValue: (string | number)[]) => {
        const newArray = [...prevValue];
        newArray[index] = "";
        return newArray;
      });

      setMaskedValue((prevValue: (string | number)[]) => {
        const newArray = [...prevValue];
        newArray[index] = "";
        return newArray;
      });

      if (index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  async function verifyOTP(otp: string): Promise<void> {
    const [response, error] = await handleApiRequest(() =>
      authApi.verifyForgetPasswordToken(otp)
    );
    if (error) {
      console.log("error");
      return;
    }
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("Value", arrayValue.join(""));
    return;
    await verifyOTP(arrayValue.join(""));
  };

  // handle key up delet value from inpu
  return (
    <CP.Styled.Wrapper height="100vh">
      <Flex height="inherit">
        <CP.Styled.Div padding={!isMobile ? "0 1rem" : "0 16px"} width="600px">
          <Flex
            items="flex-start"
            direction="column"
            padding={!isMobile ? "0 3rem" : "0px"}
          >
            <CP.Typography
              variant="h4"
              margin="0 0 2rem"
              textAlign="center"
              width={"100%"}
            >
              OTP Verification
            </CP.Typography>
            <Flex direction="column">
              <CP.Typography fontWeight="semibold" textAlign="center">
                Enter the verification code we just sent to your
              </CP.Typography>
              <CP.Typography marginBottom={"2rem"}>
                number {"+855 ********* 10"}
              </CP.Typography>
            </Flex>
            <OTPContainer>
              {maskedValue.map((value: string | number, index: number) => (
                <OTPInput
                  key={`index-${index}`}
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onPaste={(e) => handleOnPaste(e, index)}
                  maxLength={1}
                  autoComplete="off"
                  accessKey={String(index)}
                />
              ))}
            </OTPContainer>
            <Flex direction="column" gap="24px" overflow="unset" margin="16px">
              <Flex>
                <CP.Typography marginRight={1}>
                  Didn't receive code?{" "}
                </CP.Typography>
                <CP.Typography
                  fontWeight="semibold"
                  color={"primary"}
                  sx={{ cursor: "pointer" }}
                >
                  {" "}
                  Resend
                </CP.Typography>
              </Flex>
              <CP.Button type="submit" onClick={handleSubmit}>
                Verify
              </CP.Button>
              <CP.Typography
                fontWeight="semibold"
                sx={{ cursor: "pointer" }}
                margin={1}
                onClick={() => navigate("/forgetPassword")}
              >
                CHANGE PHONE NUMBER
              </CP.Typography>
            </Flex>
          </Flex>
        </CP.Styled.Div>
      </Flex>
    </CP.Styled.Wrapper>
  );
};

export default OTP;
