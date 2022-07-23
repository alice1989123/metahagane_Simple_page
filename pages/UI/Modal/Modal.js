import Overlay from "../Overlay/Overlay";
import { IoClose } from 'react-icons/io5';

const Modal = props => {
    return (
        <div className="fixed flex items-center justify-center w-screen h-screen left-0 top-0 z-[100]">
            <Overlay onClick={props.close} />
            <div className="w-[95%] md:w-[600px] min-h-[475px] bg-primary dark:bg-gray z-[100] shadow-lg rounded-md px-5 py-7 relative">
                {props.children}
                {props.close ? <div className="w-9 h-9 rounded-full dark:text-white bg-primary dark:bg-gray dark:shadow-button-dark shadow-button hover:shadow-button-hover absolute right-3 top-3 cursor-pointer flex items-center justify-center" onClick={props.close}>
                    <IoClose />
                </div> : null}
            </div>
        </div>
    )
}

export default Modal;