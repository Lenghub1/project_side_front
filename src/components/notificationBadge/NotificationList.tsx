import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CP from "..";
import { Chip, ListItemButton, Stack } from "@mui/material";

interface NotificationListProps {
  anchorEl: Element;
  open: boolean;
  data: Array<any>;
}

const NotificationList = ({ anchorEl, open, data }: NotificationListProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {!data && (
        <CP.Container
          sx={{
            minWidth: "250px",
            height: "275px",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <CP.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <small> There is no notification</small>
          </CP.Typography>
        </CP.Container>
      )}
      {data && data.length && (
        <List>
          {data.map((item: any) => (
            <ListItem
              key={item.id}
              sx={{
                backgroundColor: "#f2f2f2",
              }}
            >
              <ListItemButton>
                <Stack>
                  <CP.Styled.Flex gap="8px">
                    <ListItemText primary={item.title} />
                    {!item.isSeen && (
                      <Chip size="small" label="New" color="primary" />
                    )}
                  </CP.Styled.Flex>
                  <ListItemText secondary={item.message} />
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Popover>
  );
};

export default NotificationList;
