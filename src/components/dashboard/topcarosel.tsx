'use client'
import Slider from "react-slick";
import BalanceCards from "./balanceCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Topcarosel({ accounts, currency }: any) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

   const accountObject = JSON.parse(accounts)

    
    return (
        <div className="w-full">
            <Slider {...settings}>
                {accountObject.map((res: any, index: number) => {
                    return <BalanceCards key={index} props={res} currency={currency} />
                })}
            </Slider>
        </div>
    )
}