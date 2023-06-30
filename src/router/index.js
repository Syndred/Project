import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Home";
import Main from "@/views/Home/Main";
import Edit from "@/views/Home/Edit";
import Enter from "@/views/Home/Enter";
import Pmsg from "@/views/Home/Pmsg";
import Penter from "@/views/Home/Penter";
import Login from "@/views/Login/";
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
  },
  {
    path: "/edit",
    name: "edit",
    component: Edit,
  },
  {
    path: "/enter",
    name: "enter",
    component: Enter,
  },
  {
    path: "/pmsg",
    name: "pmsg",
    component: Pmsg,
  },
  {
    path: "/penter",
    name: "penter",
    component: Penter,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
