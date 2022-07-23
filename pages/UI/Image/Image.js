import { useEffect, useState } from "react";

const Image = props => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    
    return (
        <div className={`w-full h-full flex items-center justify-center ${loading ? 'animate-pulse bg-gray-light dark:bg-gray3' : ''} ${err ? 'grayscale-[1] opacity-40' : ''}`}>
            <img src={!err ? props.src : '/assets/images/logo.svg'} className={`${props.className} ${loading ? '' : ''}`} alt={props.alt} onLoad={() => setLoading(false)} onError={() => setErr(true)} />
        </div>
    )
}

export default Image;