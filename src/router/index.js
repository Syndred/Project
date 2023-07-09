import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Home";
import Main from "@/views/Home/Main";
import Enter from "@/views/Home/Enter";
import Pmsg from "@/views/Home/Pmsg";
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/main",
    name: "main",
    component: Main,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
