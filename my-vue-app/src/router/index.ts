import { createRouter, createWebHistory } from "vue-router";
import Sales from "../views/Sales.vue";
import Orders from "../views/Orders.vue";
import Stocks from "../views/Stocks.vue";
import Incomes from "../views/Incomes.vue";

const routes = [
  {
    path: "/",
    redirect: "/sales",
  },
  {
    path: "/sales",
    name: "Sales",
    component: Sales,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: Stocks,
  },
  {
    path: "/incomes",
    name: "Incomes",
    component: Incomes,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
