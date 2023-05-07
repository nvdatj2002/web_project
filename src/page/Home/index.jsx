import './style.scss'
import bi from '../../img/Banner/banner-img.png'
function Home() {
    return (
        <main className="main">
            <div className="banner-area">
                <div className='container-banner'>
                    <div className='banner-content'>
                        <h1>Nike New <br></br>Collection!</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                    <div className='banner-img'>
                        <img src={bi} alt='Product banner' />
                    </div>
                </div>
            </div>
            <div className='features-area'>
                <div className='features-area-content'>
                    <div className='features-area-content--item'>
                            
                    </div>
                </div>
            </div>
        </main>
    )

}

export default Home;