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
  {
    name: "home",
    path: "/",
    element: Pg.HomePage,
    children: [
      {
        name: "overviewOrganization",
        path: "overview",
        element: Pg.overviewOrganization,
        children: [
          {
            name: "createBranch",
            path: "createBranch",
            element: Pg.Branch.CreateBranch,
          },
        ],
      },
    ],
  },
  // { name: "login", path: "/login", element: Pg.LoginPage },

  // {
  //   name: "campusSelect",
  //   path: "/campus",
  //   element: Pg.Campus.default.CampusPage,
  // },
  // {
  //   name: "campusSetting",
  //   path: "/campus/set",
  //   element: Pg.Campus.default.SetCampusPage,
  // },
  {
    name: "chooseOrganization",
    path: "/login/organizations",
    element: Pg.choose.default.ScreenChooseOrganization,
  },
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
        path: "`create-account`",
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
    protected: false,
  },
  {
    name: "chooseOrganization",
    path: "/login/organizations",
    element: Pg.choose.default.ScreenChooseOrganization,
    protected: true,
  },

  {
    name: "group",
    path: "group",
    element: Pg.GroupPage,
  },
  {
    name: "employeeRegistrationsdetail",
    path: "organization/employee/registrations/details",
    element: Pg.Employee.default.EmployeeRegistrationDetail,
  },

  {
    name: "modifyBranch",
    path: "organization/modifyBranch",
    element: Pg.Branch.ModifyBranch,
  },
  {
    name: "test-redirect",
    path: "/test-redirect",
    element: Pg.Login.default.RedirectingPage,
  },
  {
    name: "verifytoken",
    path: "/verify-token",
    element: Pg.ForgetPassword.default.VerifyToken,
  },
  {
    name: "forgotaccount",
    path: "/forgot-account",
    element: Pg.ForgetAccount.default.ForgotAccount,
  },
  {
    name: "codesendingoptions",
    path: "/receive-option",
    element: Pg.ForgetAccount.default.CodeSendingOption,
  },
];

export default routes;
