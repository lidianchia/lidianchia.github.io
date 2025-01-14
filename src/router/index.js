import Vue from "vue";
import VueRouter from "vue-router";
import UploadView from "@/views/UploadView.vue";
import ChatView from "@/views/ChatView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Chat",
    component: ChatView,
  },
  {
    path: "/upload",
    name: "Upload",
    component: UploadView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
