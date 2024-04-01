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
        protected: false,
      },
      {
        name: "accountVerification",
        path: "activate-account",
        element: Pg.AccountVerification,
        protected: false,
      },
      {
        name: "phoneActivation",
        path: "verify-phone",
        element: Pg.Verification.default.OTP,
        protected: false,
      },
    ],
  },
  {
    name: "loginpage",
    path: "/login",
    element: Pg.LoginPage.default.LoginPage,
    protected: false,
    children: [
      {
        name: "verify2FA",
        path: "verify-2fa",
        element: Pg.Verification.default.OTP,
      },
    ],
  },
  // {
  //   name: "login",
  //   path: "/test-login",
  //   element: Pg.Login.default.Login,
  //   protected: false,
  //   children: [
  //     {
  //       name: "mainLogin",
  //       path: "",
  //       element: Pg.Login.default.TestLoginPage,
  //       protected: false,
  //     },
  //   ],
  // },
  {
    name: "chooseOrganization",
    path: "login/choose-organization",
    element: Pg.choose.default.ScreenChooseOrganization,
    protected: true,
  },
  {
    name: "fillForm",
    path: "fillForm",
    element: Pg.FillForm.default.FillForm,
    protected: true,
  },
  {
    name: "joinOrganization",
    path: "join-organization",
    element: Pg.choose.default.ScreenJoinOrganization,
    protected: true,
  },
  {
    name: "joinOrganization",
    path: "create-organization",
    element: Pg.choose.default.ScreenCreateOrganization,
    protected: true,
  },
  {
    name: "home",
    path: "/",
    element: Pg.HomePage,
    protected: true,
    children: [
      {
        name: "organization",
        path: "organization",
        element: Pg.Organization.default.Organization,
        protected: true,
        children: [
          {
            name: "organization",
            path: "create",
            element: Pg.Organization.default.NewOrganization,
            protected: true,
          },
          {
            name: "overviewOrganization",
            path: "",
            element: Pg.Organization.default.OverviewOrganization,
            protected: true,
            children: [
              {
                name: "createBranch",
                path: "createBranch",
                element: Pg.Branch.CreateBranch,
                protected: true,
              },
            ],
          },
          {
            name: "modifyBranch",
            path: "modifyBranch",
            element: Pg.Branch.ModifyBranch,
            protected: true,
          },
        ],
      },
      {
        name: "employee",
        path: "employee",
        element: Pg.Employee.default.Employee,
        protected: true,
        children: [
          {
            name: "employee-management",
            path: "",
            element: Pg.Employee.default.EmployeeTable,
            protected: true,
          },
          {
            name: "create-new-employee",
            path: "create",
            element: Pg.Employee.default.CreateEmployee,
            protected: true,
          },
          {
            name: "employee-registrations",
            path: "registration",
            element: Pg.Employee.default.EmployeeRegistration,
            protected: true,
          },
        ],
      },
    ],
  },
  {
    name: "checkStatus",
    path: "/check-status",
    element: Pg.CheckStatus.default.CheckStatus,
    protected: true,
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
    name: "redirect",
    path: "/redirect",
    element: Pg.LoginPage.default.RedirectingPage,
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
