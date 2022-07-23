import getAssetThumbnail from "../../../Utils/getAssetThumbnail";
import Image from "../../Image/Image";
const TileImage = props => {
    return (
        <div className={`w-1/2 h-full relative rounded-b-lg overflow-hidden z-10 p-2 bg-primary shadow-inner dark:bg-gray-dark flex items-center justify-center`}>
            <Image src={getAssetThumbnail(props.images)} className={`w-full object-cover rounded-md h-full `} />
            {/* <div className="z-50 absolute top-2 right-2 px-2.5 py-2.5 rounded-2xl flex items-center justify-center overflow-hidden" onClick={(e) => props.toggleContextMenu(e)}>
                <div className="absolute w-full h-full bg-gray -z-10 opacity-50"></div>
            </div> */}
        </div>
    )
}

export default TileImage;
