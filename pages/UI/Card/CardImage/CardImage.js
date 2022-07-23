import { useEffect, useState } from "react";
import getAssetThumbnail from "../../../Utils/getAssetThumbnail";
import Image from "../../Image/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import { isArray } from "../../../Utils/helper";
import { RiStackLine } from 'react-icons/ri';

const CardImage = props => {
    const [images, setImages] = useState([]);
    const [bundle, setBundle] = useState([]);

    useEffect(() => {
        let images = [];
        if (props.assets && isArray(props.assets)) {
            props.assets.map(asset => {
                const thumbnail = getAssetThumbnail(asset.metadata?.image);
                images.push({
                    image: thumbnail,
                });
            })
        }
        setImages(images);
    }, [props.assets]);

    useEffect(() => {
        if (images.length > 1) {
            const slides = images.map((asset, i) =>
                <SwiperSlide className="pr-4 pl-2" key={i}>
                    <Image src={asset.image} alt="assetImage" className={`w-full h-full object-contain cursor-grab`} />
                </SwiperSlide>)
            setBundle(slides);
        }
    }, [images]);

    const initImage = images[0] ?? {};

    return (
        <div className={`w-full h-2/3 relative rounded-b-lg overflow-hidden z-10 p-2 bg-primary shadow-inner dark:bg-gray-dark`}>

            {images.length > 1 ?
                <>
                    <div className="absolute w-7 h-7 shadow-md rounded-md right-2 dark:bg-gray  flex items-center justify-center z-20" title="Bundled Listing">
                        <RiStackLine />
                    </div>
                    <div className="flex w-full h-full">
                        <div className="w-full md:h-full items-center justify-center h-[400px] relative ">
                            <Swiper pagination={true} modules={[Pagination]} className="w-full h-full">
                                {bundle}
                            </Swiper>
                        </div>
                    </div>
                </>
                :
                <Image src={initImage.image} alt="assetImage" className="w-full object-cover rounded-md h-full" />}
            {/* <div className="z-50 absolute top-2 right-2 px-2.5 py-2.5 rounded-2xl flex items-center justify-center overflow-hidden" onClick={(e) => props.toggleContextMenu(e)}>
                <div className="absolute w-full h-full bg-gray -z-10 opacity-50"></div>
            </div> */}
        </div>
    )
}

export default CardImage;
