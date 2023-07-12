import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Home";
import Rmsg from "@/views/Home/Rmsg";
import Enter from "@/views/Home/Enter";
import Pmatch from "@/views/Home/Pmatch";
const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/rmsg",
    name: "rmsg",
    component: Rmsg,
  },
  {
    path: "/enter",
    name: "enter",
    component: Enter,
  },
  {
    path: "/pmatch",
    name: "pmatch",
    component: Pmatch,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
