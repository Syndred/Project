import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/Main";
import Login from "@/views/Login/";
import Enter from "@/views/Home/Enter";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/enter",
    name: "enter",
    component: Enter,
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
