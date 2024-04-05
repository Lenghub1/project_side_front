import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CP from "@/components";
import Paper from "@mui/material/Paper";
import { forgotAccountInformation } from "@/store/userStore";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { Title } from "../companySearch/CompanySearch";
import { useRecoilState } from "recoil";
import theme from "@/theme/ligthTheme";
export const maskPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/.(?=.{2})/g, "*"); // Masks all but the last 4 digits
};
export default function AlignItemsList() {
  const location = useLocation();
  const [users, setUsers] = useRecoilState(forgotAccountInformation);
  const navigate = useNavigate();

  useEffect(() => {
    if (!users[0]) {
      navigate("/forgot-account");
    }
  }, [users]);

  const isAccountInformationRoute =
    location.pathname === "/forgot-account/informations";

  const maskEmail = (email: string): string => {
    const [username, domain] = email.split("@");
    const maskedUsername = username.replace(/.(?=.{2})/g, "*"); // Masks all but the last 2 characters
    const masked = `${username.charAt(0)}${username.charAt(1)}${maskedUsername.substring(2)}@${domain}`;
    return masked;
  };

  const creadential = (user: any) => {
    let credentials = "";
    if (user.email) {
      credentials += `Email: ${maskEmail(user.email)}`;
    }
    if (user.email && user.phoneNumber) {
      credentials += "\n";
    }
    if (user.phoneNumber) {
      credentials += `Phone number: +855 ${user.phoneNumber.slice(4, 6)} ${maskPhoneNumber(user.phoneNumber.slice(7))}`;
    }
    return credentials;
  };

  const handleGoBack = () => {
    setUsers([]);
    navigate(-1);
  };
  return (
    <>
      {isAccountInformationRoute ? (
        <CP.Styled.Flex height="100%">
          <CP.Styled.Flex
            width="400px"
            height="100vh"
            direction="column"
            items="flex-start"
            margin="0 1rem"
          >
            <Title> Found Accounts </Title>
            <CP.Typography marginBottom={1}>
              Please click to see the credential information.
            </CP.Typography>
            <List
              sx={{
                width: "100%",

                maxHeight: "calc(100vh - 500px)",
                overflowY: "auto",
              }}
            >
              {users.map((user: any, index: number) => (
                <Paper
                  variant="outlined"
                  key={index}
                  sx={{
                    marginBottom: "10px",
                    "&:hover": {
                      cursor: "pointer",
                      borderColor: theme.palette.primary.main,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    },
                  }}
                  onClick={() =>
                    navigate(`/forgot-account/informations/${index}`)
                  }
                >
                  <ListItem alignItems="flex-start" onClick={() => {}}>
                    <ListItemAvatar>
                      <Avatar alt={user.lastName} src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.firstName + " " + user.lastName}
                      secondary={<> {creadential(user)}</>}
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
            <CP.Button
              sx={{ maxWidth: 360 }}
              variant="text"
              fullWidth
              onClick={handleGoBack}
            >
              Go Back
            </CP.Button>
          </CP.Styled.Flex>
        </CP.Styled.Flex>
      ) : (
        <Outlet />
      )}
    </>
  );
}
