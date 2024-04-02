import { transformData, generateFieldMapping } from "@/utils/api.util";
import { api } from ".";

const fieldMapping = generateFieldMapping({
  id: "id",
  type: "type",
  toUserId: "touserId",
  fromUerId: "fromUserId",
  title: "title",
  message: "message",
  isSeen: "isSeen",
});

const allNotifications = async (currentUserId: string) => {
  return api.get(`users/${currentUserId}/notifications`, {
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
  return api.get(`users/${currentUserId}/notifications/${notificationId}`, {
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
  return api.patch(
    `users/${currentUserId}/notifications/${notificationId}`,
    data,
    {
      transformResponse: [
        (response) => {
          const data = transformData(response, fieldMapping);
          return data;
        },
      ],
    }
  );
};

export { allNotifications, getNotificationById, updateNotification };
