import { AppBar, Toolbar, Typography } from "@mui/material";
import Notification from "@/components/notificationBadge/Notification";
import { allNotifications } from "@/api/notification";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "@/store/userStore";
import { Error } from "@/pages/error";

const TopBar = () => {
  const user = useRecoilValue(userState);
  const [isNew, setIsNew] = useState(false);
  console.log(user);
  const { data, error, refetchData } = useFetch(() =>
    allNotifications(user?.id)
  );
  if (error && error.statusCode !== 404) {
    return <Error status={error.statusCode} />;
  }

  useEffect(() => {
    console.log(data);
    setIsNew(data?.docs.length);
  }, [data, isNew]);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Riem App
        </Typography>
        <Notification
          isNew={isNew}
          unreadCount={data?.pagination.total_docs}
          data={data?.docs}
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
