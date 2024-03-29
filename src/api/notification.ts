import { transformData, generateFieldMapping } from "@/utils/api.util";
import { api } from ".";

const fieldMapping = generateFieldMapping({
  id: "id",
  type: "type",
  toUserId: "touserId",
  fromUerId: "fromUserId",
  message: "message",
  isSeen: "isSeen",
});

const allNotifications = async (currentUserId: string) => {
  return api.get(`/notifications/${currentUserId}`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

const getNotificationById = async (
  currentUserId: string,
  notificationId: string
) => {
  return api.get(`/notifications/${currentUserId}/${notificationId}`, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

const updateNotification = async (
  currentUserId: string,
  notificationId: string,
  data: any
) => {
  return api.patch(`/notifications/${currentUserId}/${notificationId}`, data, {
    transformResponse: [
      (response) => {
        const data = transformData(response, fieldMapping);
        return data;
      },
    ],
  });
};

export { allNotifications, getNotificationById, updateNotification };
