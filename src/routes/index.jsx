import Home from "../page/Home";
import Product from "../page/Products";

// cho phép truy cập khi chưa đăng nhập
const publicRoutes = [
    {
        path: '/', component: Home,
    },
    {
        path: '/Product', component: Product,
    }


]
// không cho phép truy cập khi chưa đăng nhập
const privateRoutes = [

]

export { publicRoutes, privateRoutes };