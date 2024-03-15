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
  { name: "home", path: "/", element: Pg.HomePage },
  { name: "login", path: "/login", element: Pg.LoginPage },
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
    name: "createEmployee",
    path: "organization/employee/create",
    element: Pg.Employee.default.CreateEmployee,
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
    name: "loginpage",
    path: "login",
    element: Pg.Login.default.LoginPage,
    protected: false,
  },
  {
    name: "forgetpassword",
    path: "/forget-password",
    element: Pg.ForgetPassword.default.ForgetPassword,
    protected: false,
    children: [
      {
        name: "forgetpasswordOTP",
        path: "verify-otp",
        element: Pg.Verification.default.OTP,
        protected: false,
      },
      {
        name: "resetPassword",
        path: "reset-password",
        element: Pg.ForgetPassword.default.ResetPassword,
        protected: false,
      },
    ],
  },
  {
    name: "verifytoken",
    path: "verify-token",
    element: Pg.Verification.default.VerifyToken,
    protected: false,
  },
  {
    name: "test-redirect",
    path: "/test-redirect",
    element: Pg.Login.default.RedirectingPage,
    protected: false,
  },

  {
    name: "forgotaccount",
    path: "/forgot-account",
    element: Pg.ForgetAccount.default.ForgotAccount,
    protected: false,
    children: [
      {
        name: "accountinformation",
        path: "informations",
        element: Pg.ForgetAccount.default.AccountList,
        protected: false,
        children: [
          {
            name: "accountdetail",
            path: ":id",
            element: Pg.ForgetAccount.default.DetailInformation,
            protected: false,
          },
        ],
      },
    ],
  },
];

export default routes;
