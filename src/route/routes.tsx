import * as Pg from "@/pages";

export interface RouteProps {
  name: string;
  path: string;
  element?: any;
  menu?: boolean;
  protected?: boolean;
  allowedRoles?: string[];
  children?: RouteProps[];
}

const routes: RouteProps[] = [
  // { name: "login", path: "/login", element: Pg.Login.default.Login },
  {
    name: "getStarted",
    path: "/get-started",
    element: Pg.GetStarted,
    protected: false,
    children: [
      {
        name: "companySearch",
        path: "company-search",
        element: Pg.CompanySearch,
        protected: false,
        children: [
          {
            name: "companySearchResult",
            path: ":companyId",
            element: Pg.CompanySearchResult,
            protected: false,
          },
        ],
      },
      {
        name: "createAccount",
        path: "create-account",
        element: Pg.SignupPage,
        protected: false,
      },
      {
        name: "joinCompany",
        path: "join-company",
        element: Pg.SignupPage,
        protected: false,
      },
      {
        name: "employeeInfo",
        path: "employee-info",
        element: Pg.InformationInput,
      },
    ],
  },
  {
    name: "testLogin",
    path: "test-login",
    element: Pg.TestLoginPage,
    protected: false,
  },
  {
    name: "home",
    path: "/",
    element: Pg.HomePage,
    children: [
      {
        name: "employee",
        path: "employee",
        element: Pg.Employee.default.Employee,
        children: [
          {
            name: "employee-management",
            path: "manage",
            element: Pg.Employee.default.EmployeeTable,
          },
          {
            name: "create-new-employee",
            path: "create",
            element: Pg.Employee.default.CreateEmployee,
          },
          {
            name: "employee-registrations",
            path: "registration",
            element: Pg.Employee.default.EmployeeRegistration,
          },
        ],
      },
      {
        name: "organization",
        path: "organization",
        children: [
          {
            name: "organization",
            path: "create",
            element: Pg.Organization.default.Organization,
          },
        ],
      },
    ],
  },
];

export default routes;
