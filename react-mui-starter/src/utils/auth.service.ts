import React from "react";
import { BehaviorSubject } from "rxjs";
import { get, post, put } from "./http/httpMethods";
import Cookie from "js-cookie";
import history from "../routes/history";
import { paths } from "../routes/routes.config";
import { showErrorToast } from "./toastUtil";
import { defaultUsers } from "../@types/user";
import axios from "axios";

let currentUserFromStorage: any;

/*
 * Get current user from local storage
 */
try {
  currentUserFromStorage = localStorage.getItem("currentUser");
  currentUserFromStorage = JSON.parse(currentUserFromStorage);
  //   if (currentUserFromStorage) {
  //     loadCurrentUser();
  //   }
} catch (e) {
  showErrorToast("Could not find user in local storage");
  logout();
}

const currentUserSubject = new BehaviorSubject(
  currentUserFromStorage || undefined
);
const currentOrganizationSubject = new BehaviorSubject(
  (currentUserFromStorage &&
    currentUserFromStorage._org &&
    currentUserFromStorage._org[0]) ||
    undefined
);

/*
 * Export as a Type
 */
export const authenticationService = {
  logout,
  authToken,
  register,
  verifyCredentials,
  loadCurrentUser,
  requestPasswordReset,
  setPassword,
  isUserAndTokenAvailable,
  verifyOTP,
  handleLogin,
  localLogout,
  resendOTP,
  unsubscribeAll,
  handleSignup,
  handleForget,
  savedPost,
  home,
  editProfileData,
  addPost,
  updateImage,
  likePost,
  addComment,
  savePost,

  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  currentOrganization: currentOrganizationSubject.asObservable(),
  get currentOrganizationValue() {
    return currentOrganizationSubject.value;
  },
};
const user = JSON.parse(localStorage.getItem("currentUser"));
const token = JSON.parse(localStorage.getItem("token"));
// console.log(user);
// console.log(token);

/*
 * Verify OTP method
 */
function verifyCredentials(payload: any) {
  console.log(payload);

  // return new Promise((resolve, reject) => {
  //   handleLogin({ token: "AABBCC", user: defaultUsers[0] });
  //   resolve(true);
  // });
  // return post("http://192.168.0.104:8080/auth/login", payload)
  return post("http://localhost:8080/auth/login", payload)
    .then((response: any) => {
      console.log(response);

      handleLogin(response);

      // handleLogin({ token: response.token, user: response.user });
      return response;
    })
    .catch((error: any) => {
      console.log(error);

      showErrorToast(
        error.message || "Error occurred while validating credentials!"
      );
      // handleLogin({ token: response.token, user: response.user });
      // handleLogin({ token: "AABBCC", user: defaultUsers[0] });
      return error;
    });
}

/*
 * Verify OTP method
 */
function requestPasswordReset(payload: any) {
  return post("/api/user/password/reset", payload).then((response: any) => {
    return response;
  });
}

/*
 * Unsubscribe all subjects to avoid memory leak
 */
function unsubscribeAll() {
  currentUserSubject.unsubscribe();
  currentOrganizationSubject.unsubscribe();
}

/*
 * Logout method
 */
function logout() {
  return get(`/api/auth/logout`)
    .then((response) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
      // window.location.reload()
      return response;
    })
    .catch((error) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
    });
}

/*
 * Local logout, don't send API call
 */
function localLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
  Cookie.remove("_token", { path: "/" });

  currentUserSubject.next({});

  history.push("/auth/login");
  window.location.reload();
}

/*
 * Get auth token from cookie
 */
function authToken() {
  return Cookie.get("_token");
}

/*
 * Register user method
 */
function register(payload: any) {
  return post("/api/user/sign-up", payload).then((response: any) => {
    // handleLogin(response)
    return response;
  });
}

/*
 * Set new password
 */
function setPassword(payload: any, token: string) {
  return put("/api/user/password", payload, {
    headers: { Authorization: `${token}` },
  }).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function verifyOTP(payload: any) {
  return post("/api/auth/second-factor", payload).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function resendOTP() {
  return get("/api/auth/regenerate-second-factor").then((response: any) => {
    handleLogin(response);
    return response;
  });
}

/*
 * Verify invitation
 */
function isUserAndTokenAvailable() {
  return authToken() && JSON.parse(localStorage.getItem("currentUser") as any);
}

/*
 * Fetch current user
 */
function loadCurrentUser() {
  get(`http://localhost:8080/users/6299987a0dec390e1b6e7b87`).then(
    (response: any) => {
      localStorage.setItem("currentUser", JSON.stringify(response));
      currentUserSubject.next(response);
      currentOrganizationSubject.next(response._org[0]);
    }
  );
}

/*
 * Register user method
 */
function handleLogin(response: any) {
  console.log("1", response);

  // store user details and jwt token in local storage to keep user logged in between page refreshes
  Cookie.set("_token", response.token, { path: "/" });

  localStorage.setItem("currentUser", JSON.stringify(response.user));
  localStorage.setItem("token", JSON.stringify(response.token));

  currentUserSubject.next(response.user);

  // currentOrganizationSubject.next(response.user._org[0]);

  if (response.user && !response.user._pre) {
    history.push(paths.home);
    window.location.reload();
  }
}

function handleSignup() {
  // store user details and jwt token in local storage to keep user logged in between page refreshes

  history.push(paths.CreateAccount);
  window.location.reload();
}

function handleForget() {
  history.push(paths.ForgetPassword);
  window.location.reload();
}

function savedPost() {
  history.push(paths.SavedPost);
  window.location.reload();
}

function home() {
  history.push(paths.home);
  window.location.reload();
}

//edit profile
function editProfileData(payload: any) {
  // console.log("payload", payload);

  axios(`http://localhost:8080/users/${user._id}`, {
    method: "patch",
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log(response);
      //  return response;
    })
    .catch((error: any) => {
      console.log(error);

      //  showErrorToast(
      //    error.message || "Error occurred while validating credentials!"
      //  );

      //  return error;
    });
}

//add post
function addPost(payload: any) {
  console.log(payload);

  axios(`http://localhost:8080/feeds`, {
    method: "post",
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}

//update profileImage
function updateImage(payload: any) {
  console.log(payload);
  axios(`http://localhost:8080/users/profile-picture/${user._id} `, {
    method: "patch",
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}

//likePost
function likePost(id: any) {
  console.log(id);

  axios(`http://localhost:8080/feeds/like/${id}`, {
    method: "patch",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}

//add comment to post

function addComment(payload: any, id: any) {
  console.log(payload);
  console.log(id);

  axios(`http://localhost:8080/feeds/comment/${id}`, {
    method: "patch",
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}

//Save indivisualPost
function savePost(id: any) {
  console.log(id);

  axios(`http://localhost:8080/feeds/savefeed/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response: any) => {
      console.log(response);
    })
    .catch((error: any) => {
      console.log(error);
    });
}
