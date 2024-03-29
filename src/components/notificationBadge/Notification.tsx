import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";

interface NotificationProps {
  isNew: boolean;
  unreadCount: number;
}
const Notification = ({ isNew, unreadCount }: NotificationProps) => {
  const [open, setOpen] = useState(false);
  return (
    <IconButton onClick={() => setOpen((pre) => !pre)}>
      <Badge
        badgeContent={unreadCount}
        color={isNew ? "secondary" : "primary"}
        invisible={unreadCount === 0}
      >
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default Notification;
