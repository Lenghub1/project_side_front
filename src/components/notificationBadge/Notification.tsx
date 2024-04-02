import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import NotificationList from "./NotificationList";

interface NotificationProps {
  isNew: boolean;
  data: Array<any>;
  unreadCount: number;
}
const Notification = ({ isNew, data, unreadCount }: NotificationProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((pre) => !pre);
  };
  return (
    <IconButton onClick={handleClick}>
      <Badge
        badgeContent={unreadCount}
        color={isNew ? "secondary" : "primary"}
        invisible={unreadCount === 0}
      >
        <NotificationsIcon />
      </Badge>
      <NotificationList anchorEl={anchorEl!} open={open} data={data} />
    </IconButton>
  );
};

export default Notification;
