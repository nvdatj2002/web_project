import Home from "../page/Home";
import Product from '../page/Products'
import Dashboard from "../page_manager/Dashboard";
import ManagerProduct from "../page_manager/manage_products";
import ProductCreate from "../page_manager/manage_products/ProductCreate";
import ProductDetail from "../page_manager/manage_products/ProductDetail";
import ManagerCategory from "../page_manager/manager_category";
import ProductDetailUser from "../page/ProductDetail";
import Cart from "../page/Cart";
import Login from "../page/Login";
import Register from "../page/register";
import InfoUser from "../page/InfoUser";
import Purchase from "../page/InfoUser/purchase";
// cho phép truy cập khi chưa đăng nhập
const publicRoutes = [
    {
        path: '/', component: Home,
    },
    {
        path: '/shop', component: Product,
    },
    {
        path: '/shop/product-detail/:id', component: ProductDetailUser,
    },
    {
        path: '/cart', component: Cart,
    },
    {
        path: '/login', component: Login,
    },
    {
        path: '/register', component: Register,
    },
    {
        path: '/info-user', component: InfoUser,
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
    },
    {
        path: '/manager/products/detail/:id', component: ProductDetail,
    },
    {
        path: '/manager/categories', component: ManagerCategory,
    },
]

export { publicRoutes, privateRoutes };