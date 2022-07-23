import { useEffect, useRef, useState } from "react";
import { time_remaining } from "../../Utils/helper";

const Timer = props => {
    const [remaining, setRemaining] = useState({ 'days': 0, 'hours': '0', 'minutes': '0', 'seconds': '0' });
    const timerRef = useRef();
    useEffect(() => {
        const date = new Date(props.time).toISOString();
        const remaining = time_remaining(date);
        setRemaining(remaining);
        if (remaining.total) {
            setTimer();
        }
        else {
            props.done();
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    }, []);

    const setTimer = () => {
        timerRef.current = setInterval(() => {
            const date = new Date(props.time).toISOString();
            const remaining = time_remaining(date);
            setRemaining(remaining);
            if (remaining.total <= 0) {
                clearInterval(timerRef.current);
                props.done();
            }
        }, 1000)
    }
    return (
        <div className="flex gap-3 items-center justify-center">
            <span className="shadow-button dark:shadow-button-dark px-2 py-2 rounded-lg text-sm">{remaining.days}d</span> :
            <span className="shadow-button dark:shadow-button-dark px-2 py-2 rounded-lg text-sm">{remaining.hours}h</span> :
            <span className="shadow-button dark:shadow-button-dark px-2 py-2 rounded-lg text-sm">{remaining.minutes} m</span> :
            <span className="shadow-button dark:shadow-button-dark px-2 py-2 rounded-lg text-sm">{remaining.seconds} s</span>
        </div >
    )
}



export default Timer;