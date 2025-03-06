import { Router } from "express";
import { CarRoutes } from "../../modules/car/car.route";
import { CartRoutes } from "../../modules/Cart/Cart.route";
import { UserRoutes } from "../../modules/User/user.route";
import { OrderRoutes } from "../../modules/order/order.route";

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
        path:'/order',
        route: OrderRoutes
    },
    // {
    //     path:'/orders/revenue',
    //     route:RevenueRoutes
    // },
    {
        path:'/cart',
        route:CartRoutes,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;