import { ImSpinner9 } from 'react-icons/im';

const Button = props => {
    return (
        <button type={props.type} className="text-gray1 px-5 pl-2 py-2 font-bold rounded-3xl shadow-button text-sm hover:shadow-button-hover cursor-pointer flex items-center justify-between gap-5 dark:shadow-button-dark dark:text-white" onClick={props.onClick}>
            {props.icon ? <div className={`flex items-center rounded-full p-2 shadow-button-icon dark:shadow-button-icon-dark ${props.loading ? 'animate-spin cursor-not-allowed' : ''}`}>
                {props.loading ? <ImSpinner9 /> : <props.icon />}
            </div> : null}
            <div>
                {props.children}
            </div>
        </button>
    )
}

export default Button;