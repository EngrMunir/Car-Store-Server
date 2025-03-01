import { Router } from "express";
import { UserRoutes } from "../../modules/User/user.route";
import { CarRoutes } from "../../modules/car/car.route";
import { OrderRoutes } from "../../modules/order/order.route";
import { RevenueRoutes } from "../../modules/revenue/revenue.routes";
import { CartRoutes } from "../../modules/Cart/Cart.route";

const router = Router();

const moduleRoutes =[
    {
        path: '/auth',
        route:UserRoutes
    },
    {
        path:'/cars',
        route:CarRoutes,
    },
    {
        path:'/orders',
        route: OrderRoutes
    },
    {
        path:'/orders/revenue',
        route:RevenueRoutes
    },
    {
        path:'/cart',
        route:CartRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;