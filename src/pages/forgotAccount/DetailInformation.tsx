import Button from "@mui/material/Button";
import CP from "@/components";
import { useParams } from "react-router-dom";
import Store from "@/store";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function DetailInformation() {
  const { id } = useParams();

  const [data, setData] = useRecoilState(Store.User.forgotAccountInformation);
  const navigate = useNavigate();
  const handleToLogin = () => {
    setData([]);
    navigate("/login");
  };
  return (
    <CP.Styled.Flex height="100%">
      <CP.Styled.Flex
        direction="column"
        height="100vh"
        gap="1rem"
        width="400px"
        margin="0 2rem"
        items="flex-start"
      >
        <CP.Typography variant="h4" marginBottom="2rem">
          Find Your Account
        </CP.Typography>

        <CP.Typography>
          {`The credential account for `}
          <strong>{`${data[id].firstName} ${data[id].lastName}
        `}</strong>
        </CP.Typography>
        <CP.Typography>
          {data[id].email && (
            <>
              {" "}
              {"email: "} <strong>{data[id].email}</strong>
            </>
          )}
        </CP.Typography>
        <CP.Typography>
          {data[id].phoneNumber && `phone: ${data[id].phoneNumber}`}
        </CP.Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          style={{ marginTop: "1rem" }}
          onClick={handleToLogin}
        >
          Login
        </Button>
      </CP.Styled.Flex>
    </CP.Styled.Flex>
  );
}
