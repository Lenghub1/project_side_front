import useInput from "@/hooks/useInput";
import { useNavigate } from "react-router-dom";

import CP from "@/components";
import campusApi from "@/api/campus";

const SetCampusPage = () => {
  const navigate = useNavigate();
  const campusName = useInput("");
  const handleCampus = async (type: boolean) => {
    if (!type) return navigate("/campus");

    // please make result type. Do not use any type
    const result: any = await campusApi.addCampus(campusName.value.toString());
    if (result.status_code === 200) {
      campusName.setValue("");
      navigate("/campus");
    }
  };

  return (
    <>
      <CP.Styled.Wrapper padding={"50px 20px 100px 20px"}>
        <CP.Styled.Flex
          direction="column"
          gap={20}
          height="100%"
          justify="flex-start"
        >
          <CP.Styled.Flex direction="column" gap={15}>
            <CP.Typography variant="header">Set Campus</CP.Typography>
            <CP.Typography>ADD/EDIT Campus</CP.Typography>

            <CP.Input
              value={campusName.value}
              onChange={(e) => campusName.onChange(e)}
              placeholder="Campus Name"
              style={{ marginTop: "30px" }}
            ></CP.Input>

            <CP.Styled.Flex gap={10}>
              <CP.Button
                style={{
                  width: "100%",
                  background: "rgba(0,0,200,0.7)",
                  color: "white"
                }}
                variant="text"
                onClick={() => handleCampus(true)}
              >
                Confirm
              </CP.Button>

              <CP.Button
                style={{
                  width: "100%",
                  background: "rgba(200,0,0,0.7)",
                  color: "white"
                }}
                variant="text"
                onClick={() => handleCampus(false)}
              >
                Cancel
              </CP.Button>
            </CP.Styled.Flex>
          </CP.Styled.Flex>
        </CP.Styled.Flex>
      </CP.Styled.Wrapper>
    </>
  );
};

export default SetCampusPage;
