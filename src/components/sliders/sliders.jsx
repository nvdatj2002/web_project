
function SamplePrevArrow(props) {
    const { className, style, onClick,cn } = props;
    return (
      <div
        className={className + cn}
        style={{ ...style, display: "block",  }}
        onClick={onClick}
      />
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick,cn } = props;
  
    return (
      <div
        className={className + cn}
        style={{ ...style, display: "block", }}
        onClick={onClick}
      />
    );
  }
// silder
export const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow cn={" snext"}/>,
    prevArrow: <SamplePrevArrow cn={" sprev"}/>,
};

////////////////////////////////
function PrevArrow(props) {
    const { className, style, onClick,cn } = props;
    return (
      <div
        className={className + cn}
        style={{ ...style, display: "block",  }}
        onClick={onClick}
      />
    );
  }
  function NextArrow(props) {
    const { className, style, onClick,cn } = props;
 
    return (
      <div
        className={className + cn}
        style={{ ...style, display: "block", }}
        onClick={onClick}
      />
    );
  }
export const silderProductDeal = {
    infinite: true,
    interval: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoPlaySpeed: 3000,
    autoPlayTimeout: 3000,
    autoplayHoverPause: true,
    nextArrow: <NextArrow cn={" pnext"}/>,
    prevArrow: <PrevArrow cn={" pprev"}/>,
};