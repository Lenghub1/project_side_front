import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CP from "@/components";
import Paper from "@mui/material/Paper";
import { useRecoilValue } from "recoil";
import Store from "@/store";
import { useNavigate } from "react-router-dom";

// Sample data array

export default function AlignItemsList() {
  const users = useRecoilValue(Store.User.forgotAccountInformation);
  const navigate = useNavigate();
  const maskPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/.(?=.{4})/g, "*"); // Masks all but the last 4 digits
  };

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
      credentials += `Phone number: ${maskPhoneNumber(user.phoneNumber)}`;
    }
    return credentials;
  };
  return (
    <CP.Styled.Flex width="100%" height="100vh" direction="column">
      <CP.Typography variant="h4" marginBottom="1rem">
        Indentify Your Account
      </CP.Typography>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {users.map((user, index) => (
          <Paper
            key={index}
            sx={{
              marginBottom: "10px",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
            onClick={() => navigate(`/forgot-account/informations/${index}`)}
          >
            <ListItem
              alignItems="flex-start"
              onClick={() => {
                console.log("Checking info of", index);
              }}
            >
              <ListItemAvatar>
                <Avatar alt={user.lastName} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user.firstName + user.lastName}
                secondary={<> {creadential(user)}</>}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </CP.Styled.Flex>
  );
}
