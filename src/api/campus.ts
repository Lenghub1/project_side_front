import { uuid } from "@/utils/commonUtil";

const getCampusList = async () => {
  // This is temp data
  return new Promise((res) => {
    const campusList = JSON.parse(localStorage.getItem("campusList"));
    setTimeout(() => {
      return res(campusList);
    }, 1000);
  });
};

const addCampus = async (param: string) => {
  // This is temp API flow
  return new Promise((res) => {
    const campusList = JSON.parse(localStorage.getItem("campusList"));
    const newCampusList = campusList
      ? [...campusList, { id: uuid(), name: param }]
      : [{ id: uuid(), name: param }];
    localStorage.setItem("campusList", JSON.stringify(newCampusList));

    setTimeout(() => {
      return res({
        status_code: 200,
        message: "ok"
      });
    });
  });
};

const campusApi = {
  getCampusList,
  addCampus
};

export default campusApi;
