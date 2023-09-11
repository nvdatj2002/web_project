import './style.scss'
import bi from '../../img/Banner/banner-img.png'
import f1 from '../../img/features/f-icon1.png'
import f2 from '../../img/features/f-icon2.png'
import f3 from '../../img/features/f-icon3.png'
import f4 from '../../img/features/f-icon4.png'
import c1 from '../../img/category/c1.jpg'
import c2 from '../../img/category/c2.jpg'
import c3 from '../../img/category/c3.jpg'
import c5 from '../../img/category/c5.jpg'
import p from '../../img/product/p2.jpg'

import { settings, silderProductDeal } from '../../components/sliders/sliders'

import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react'
import CallAPI from '../../API/axios'



function Home() {
    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;
    const startTimer = () => {
        const countDownDate = new Date("september 30 2023").getTime();
        interval = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            const days = Math.floor(distance / (24 * 60 * 60 * 1000));
            const hours = Math.floor(distance % (24 * 60 * 60 * 1000) / (1000 * 60 * 60));
            const minutes = Math.floor(distance % (60 * 60 * 1000) / (1000 * 60));
            const seconds = Math.floor(distance % (60 * 1000) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }
        })
    }
    useEffect(() => {
        startTimer();
    }, [])

    const [products, setProducts] = useState([])

    const fecthAPI = async ()  => {
        const response = CallAPI("/api/product/getAll","GET")
        setProducts(response.data)
    }

    return (
        <main className="main">
            {/* start banner area */}
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
            {/* end banner area */}

            {/* start features area */}
            <div className='features-area'>
                <div className='features-area-content'>
                    <div className='features-area-content--item'>
                        <img src={f1}></img>
                        <h2>Free Delivery</h2>
                        <p>Free shipping on order</p>
                    </div>
                    <div className='features-area-content--item'>
                        <img src={f2}></img>
                        <h2>Return policy</h2>
                        <p>Free shipping on order</p>
                    </div>
                    <div className='features-area-content--item'>
                        <img src={f3}></img>
                        <h2>24/7 Support</h2>
                        <p>Free shipping on order</p>
                    </div>
                    <div className='features-area-content--item'>
                        <img src={f4}></img>
                        <h2>Scure Payment</h2>
                        <p>Free shipping on order</p>
                    </div>
                </div>
            </div>
            {/* end features area */}

            {/* start category area */}
            <div className='category-area'>
                <div className='category-area-content'>
                    <div className='category-area-content-grid'>
                        <Link className='category-area-content-column'>
                            <div className='category-area-content-item'>
                                <div className='overlay'></div>
                                <img src={c1}></img>
                                <div className='category-detail'><p>SNAKER FOR SPORT</p></div>
                            </div>
                        </Link>
                        <Link className='category-area-content-column'>
                            <div className='category-area-content-item'>
                                <div className='overlay'></div>
                                <img src={c5}></img>
                                <div className='category-detail'><p>SNAKER FOR SPORT</p></div>
                            </div>
                        </Link>
                        <Link className='category-area-content-column'>
                            <div className='category-area-content-item'>
                                <div className='overlay'></div>
                                <img src={c2}></img>
                                <div className='category-detail'><p>SNAKER FOR SPORT</p></div>
                            </div>
                        </Link>
                        <Link className='category-area-content-column'>

                            <div className='category-area-content-item'>
                                <div className='overlay'></div>
                                <img src={c3}></img>
                                <div className='category-detail'><p>SNAKER FOR SPORT</p></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* end category area */}
           
            {/* start product area */}
            <div className='product-area'>
                <div className='product-area-container'>
                    <Slider {...settings}>
                        <div className='product-area-container--item'>
                            <div className='product-area-header'>
                                <div className='product-area-header-top'>
                                    {/* <div> <img src={prev}></img> </div> */}
                                    <h1>Latest Products</h1>
                                    {/* <div><img src={next}></img></div> */}
                                </div>
                                <div className='product-area-header-detail'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore
                                        magna aliqua.</p>
                                </div>
                            </div>
                            <div className='product-area-content'>
                                <div className='grid-products'>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-area-container--item'>
                            <div className='product-area-header'>
                                <div className='product-area-header-top'>
                                    <h1>Latest Products</h1>
                                </div>
                                <div className='product-area-header-detail'>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                                        dolore
                                        magna aliqua.</p>
                                </div>
                            </div>
                            <div className='product-area-content'>
                                <div className='grid-products'>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-item'>
                                        <img src={p}></img>
                                        <div className='product-details'>
                                            <h3>addidas New Hammer sole
                                                for Sports person</h3>
                                            <p>$150.000</p>
                                            <div className='product-details-botom'>
                                                <button>
                                                    Thêm vào giỏ hàng
                                                </button>
                                                <Link>
                                                    Chi tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
            {/* end product area */}
            {/* start deal hot area*/}
            <div className='deals-hot-area'>
                <div className='deals-hot-container'>
                    <div className='deals-hot-left'>
                        <div className='left-content'>
                            <h1>Exclusive Hot Deal Ends Soon!</h1>
                            <p>Who are in extremely love with eco friendly system.</p>

                            <div className='clock'>
                                <div className='Days clock-item'>
                                    <h1>{timerDays}</h1>
                                    <p>Days</p>
                                </div>
                                <div className='Hours clock-item'>
                                    <h1>{timerHours}</h1>
                                    <p>Hours</p>
                                </div>
                                <div className='Mins clock-item'>
                                    <h1>{timerMinutes}</h1>
                                    <p>Mins</p>
                                </div>
                                <div className='Secs clock-item'>
                                    <h1>{timerSeconds}</h1>
                                    <p>Secs</p>
                                </div>
                            </div>
                            <div className='deal-hot-nav'>
                                <Link className='deal-hot-nav-item' to={"/"} >Xem ngay</Link>
                            </div>
                        </div>

                    </div>
                    <div className='right-content'>
                        <Slider {...silderProductDeal}>
                            <div className='deal-hot-product'>
                                <div className='deal-hot-product-item'>
                                    <img src={p}></img>
                                    <div className='detail-product-deal-hot'>
                                        <p>$150.000</p>
                                        <h1>addidas New Hammer sole
                                            for Sports person</h1>
                                        <Link>Chi tiết</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='deal-hot-product'>
                                <div className='deal-hot-product-item'>
                                    <img src={p}></img>
                                    <div className='detail-product-deal-hot'>
                                        <p>$150.000</p>
                                        <h1>addidas New Hammer sole
                                            for Sports person</h1>
                                        <Link>Chi tiết</Link>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
            {/* end deal hot area */}

            {/* start footer */}
            {/* end footer */}
        </main>
    )

}

export default Home;