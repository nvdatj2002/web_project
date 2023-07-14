import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import './style.scss'

function DefaultLayout({ children }) {
    return (
        <div className="body">
            <Sidebar />
            <section className="body-right">
                <Header/>
                {children}
                <Footer />
            </section>
        </div>
    )
}

export default DefaultLayout;