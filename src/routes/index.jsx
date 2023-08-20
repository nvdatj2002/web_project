import Home from "../page/Home";
import Product from '../page/Products'
import Dashboard from "../page_manager/Dashboard";
import ManagerProduct from "../page_manager/manage_products";
import ProductCreate from "../page_manager/manage_products/ProductCreate";

// cho phép truy cập khi chưa đăng nhập
const publicRoutes = [
    {
        path: '/', component: Home,
    },
    {
        path: '/shop', component: Product,
    },
    

]
// không cho phép truy cập khi chưa đăng nhập
const privateRoutes = [
    {
        path: '/manager/dashboard', component: Dashboard,
    },
    {
        path: '/manager/products', component: ManagerProduct,
    },
    {
        path: '/manager/products/create', component: ProductCreate,
    }
]

export { publicRoutes, privateRoutes };