import CardBody from "./CardBody/CardBody";
import SkeletalBody from "./CardBody/SkeletalBody";
import CardImage from "./CardImage/CardImage";
import SekeletalImage from "./CardImage/SkeletalImage";

const Card = props => {
    const onClick = () => {
        if (!props.pending) {
            props.onClick();
        }
    }
    return (
        <div className={`flex flex-col relative w-[48%] max-w-[200px] min-w-[10rem] md:max-w-[250px] h-80 xl:w-64 xl:h-96 4xl:w-[17rem] 4xl:h-[425px] rounded-lg shadow-button hover:-translate-y-1 dark:shadow-button-dark ${props.pending ? 'cursor-not-allowed' : 'cursor-pointer'} overflow-hidden`} id={props.elemId} onClick={onClick}>
            {props.loading ?
                <>
                    <SkeletalBody />
                    <SekeletalImage />
                </> :
                <>
                    <CardBody {...props} />
                    <CardImage {...props} />
                </>
            }
        </div>
    )
}

export default Card;