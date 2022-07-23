import { useEffect, useRef } from "react";

const ContextMenu = props => {
    //const offsetLeft = props.card?.offsetLeft + 250 + 200 < window.innerWidth ? 'left-[70%]' : 'left-[30%]';
    const popRef = useRef();
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const handleClickOutside = event => {
        if (popRef.current && !popRef.current.contains(event.target) && props.close) {
            props.close();
        }   
    }

    return (
        <div className={`bg-primary dark:bg-gray-dark w-[200px] absolute z-50 top-[110%] right-0 rounded-md shadow-lg p-4 flex flex-col gap-2 dark:bg-black dark:text-white`} ref={popRef}>
            {props.children}
        </div>
    )
}

export default ContextMenu;