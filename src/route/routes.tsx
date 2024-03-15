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
    children: [
      {
        name: "companySearch",
        path: "company-search",
        element: Pg.CompanySearch,
        children: [
          {
            name: "companySearchResult",
            path: ":companyId",
            element: Pg.CompanySearchResult,
          },
        ],
      },
      {
        name: "createAccount",
        path: "create-account",
        element: Pg.SignupPage,
      },
      {
        name: "joinCompany",
        path: "join-company",
        element: Pg.SignupPage,
      },
      {
        name: "employeeInfo",
        path: "employee-info",
        element: Pg.InformationInput,
      },
    ],
  },
  {
    name: "create-new-organization",
    path: "organization/new",
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
    element: Pg.Employee.default.EmployeeRegistration,
  },
  {
    name: "testLogin",
    path: "test-login",
    element: Pg.TestLoginPage,
  },

  {
    name: "group",
    path: "group",
    element: Pg.GroupPage,
  },
];

export default routes;
