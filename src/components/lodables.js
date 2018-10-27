import React from "react";
import Loadable from "react-loadable";

export const Login = Loadable({
  loader: () => import("../containers/login/Login"),
  loading: () => <div>Loading....</div>
});

export const Dashboard = Loadable({
  loader: () => import("../containers/dashboard/Dashboard"),
  loading: () => <div>Loading....</div>
});

export const PostList = Loadable({
  loader: () => import("../containers/posts/PostList"),
  loading: () => <div>Loading....</div>
});

export const NewsList = Loadable({
  loader: () => import("../containers/news/NewsList"),
  loading: () => <div>Loading....</div>
});

export const PostEdit = Loadable({
  loader: () => import("../containers/posts/PostEdit"),
  loading: () => <div>Loading....</div>
});

export const PostAddNew = Loadable({
  loader: () => import("../containers/posts/PostAddNew"),
  loading: () => <div>Loading....</div>
});
