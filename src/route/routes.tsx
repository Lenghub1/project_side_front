import * as Pg from "@/pages";

export interface RouteProps {
  name: string;
  path: string;
  element?: any;
  menu?: boolean;
  children?: RouteProps[];
}

const routes: RouteProps[] = [
  { name: "home", path: "/", element: Pg.HomePage },
  { name: "login", path: "/login", element: Pg.LoginPage },
  {
    name: "campusSelect",
    path: "/campus",
    element: Pg.Campus.default.CampusPage,
  },
  {
    name: "campusSetting",
    path: "/campus/set",
    element: Pg.Campus.default.SetCampusPage,
  },
  {
    name: "getStarted",
    path: "/get-started",
    element: Pg.GetStarted,
  },
  {
    name: "createAccount",
    path: "create-account",
    element: Pg.SignupPage,
  },
  {
    name: "organization",
    path: "organization",
    element: Pg.Organization.default.Organization,
  },
  {
    name: "employeeManagement",
    path: "organization/employee/management",
    element: Pg.Employee.default.EmployeeTable,
  },
  {
    name: "employeeRegistrations",
    path: "organization/employee/registrations",
    element: Pg.Employee.default.EmployeeTable,
  },
];

export default routes;
