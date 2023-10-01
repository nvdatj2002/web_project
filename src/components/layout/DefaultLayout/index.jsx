import Header from "./Header";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from '../../../Store/store'
function DefaultLayout({ children }) {
    return (
        <Provider store={store}>
            <>
                <Header />
                {children}
                <Footer />
            </>
        </Provider>
    );
}

export default DefaultLayout;