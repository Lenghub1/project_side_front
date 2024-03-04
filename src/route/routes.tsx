import * as Pg from "@/pages";

export interface RouteProps {
  name: string;
  path: string;
  element?: any;
  menu?: boolean;
  children?: RouteProps[];
}

console.log(Pg);
const routes: RouteProps[] = [
  { name: "home", path: "/", element: Pg.HomePage },
  { name: "login", path: "/login", element: Pg.LoginPage },
  {
    name: "campusSelect",
    path: "/campus",
    element: Pg.Campus.default.CampusPage
  },
  {
    name: "campusSetting",
    path: "/campus/set",
    element: Pg.Campus.default.SetCampusPage
  }
];

export default routes;
