import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/";
import Login from "../views/Login/";
import Edit from "../views/Home/Main/Edit";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
