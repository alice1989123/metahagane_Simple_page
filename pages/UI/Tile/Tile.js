import TileBody from "./TileBody/TileBody";
import SkeletalBody from "./TileBody/SkeletalBody";
import SekeletalImage from "./TileImage/SkeletalImage";
import TileImage from "./TileImage/TileImage";

const Tile = props => {
    return (
        <div className={`flex relative md:max-w-[350px] w-96 h-48 xl:max-w-[425px] rounded-lg shadow-button dark:shadow-button-dark cursor-pointer overflow-hidden`} id={props.elemId} onClick={props.onClick}>
            {props.loading ?
                <>
                    <SekeletalImage />
                    <SkeletalBody />
                </> :
                <>
                    <TileImage {...props} />
                    <TileBody {...props} />
                </>
            }
        </div>
    )
}

export default Tile;