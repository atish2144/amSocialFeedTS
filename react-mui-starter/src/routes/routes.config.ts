import { lazy } from "react";

// Lazy load your page components
const Home = lazy(() => import("../pages/home/home"));
const Login = lazy(() => import("../pages/auth/login/login"));
const CreateAccount = lazy(
  () => import("../pages/auth/createAccount/CreateAccount")
);
const ForgetPassword = lazy(
  () => import("../pages/auth/ForgetPassword/ForgetPassword")
);
const SavedPost = lazy(
  () => import("../components/navbar/savedPost/SavedPost")
);

/*
 * Route path: URLs
 */
export const paths = {
  home: "/home",
  login: "/auth/login",
  CreateAccount: "/auth/signup",
  ForgetPassword: "/auth/ForgetPassword",
  SavedPost: "/savedPost",
};

/*
 * Routes: path & lazy loaded component
 */
export const routes: any[] = [
  {
    path: paths.home,
    component: Home,
  },
  {
    path: paths.login,
    component: Login,
  },
  {
    path: paths.CreateAccount,
    component: CreateAccount,
  },

  {
    path: paths.ForgetPassword,
    component: ForgetPassword,
  },

  {
    path: paths.SavedPost,
    component: SavedPost,
  },
];
