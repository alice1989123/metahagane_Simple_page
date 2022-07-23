import { HiOutlineBadgeCheck } from 'react-icons/hi';
import { BsClock } from 'react-icons/bs';

const CardBody = props => {
    const policy = props.loanData?.POLICY;
    const durationDays = props.loanData?.HOURS % 24;
    const durationHours = props.loanData?.HOURS - (durationDays * 24);
    return (
        <div className="px-4 py-3 h-1/3 flex flex-col justify-between z-10 rounded-t-lg dark:bg-gray dark:text-white bg-primary ">
            <div className="flex justify-between">
                <div className="w-5/6">
                    <div className="font-bold text-xs xl:text-sm text-ellipsis overflow-hidden whitespace-nowrap w-4/5">{props.assets.length > 1 ? props.assets[0]?.name + ` & ${props.assets.length - 1} others` : props.assets[0]?.name}</div>
                    {/* {policy ? <div className="font-bold text-xs" title={policy}>{policy?.slice(0, 4) + '...' + policy.slice(policy.length - 6, policy.length)}</div> : null} */}
                </div>
                {props.listing && props.verified ? <div className="flex items-center rounded-full p-2 shadow-button hover:shadow-button-hover w-9 justify-center dark:shadow-button-dark">
                    <HiOutlineBadgeCheck className="text-xl" />
                </div> : null}
            </div>
            {props.pending ? <div className='text-sm border-2 border-dashed px-2 py-2 rounded-md flex items-center gap-2 dark:text-white'>
                <BsClock className='font-bold' />
                <span>Transaction Pending</span>
            </div> : null}
            {props.listing ?
                <div className="flex items-end justify-between">
                    <div className="flex flex-col">
                        <div className="text-xs font-bold dark:text-grey1">Amount</div>
                        <div className="font-bold text-xs xl:text-base">{props.loanData?.AMOUNT / 1e6} ADA</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs font-bold dark:text-grey1">Rate</div>
                        <div className="font-bold text-xs xl:text-base">{props.loanData?.RATE / 10}%</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs font-bold dark:text-grey1">Duration</div>
                        <div className="font-bold text-xs xl:text-base">{props.loanData?.HOURS}h</div>
                    </div>
                </div> : null}
        </div>
    )
}

export default CardBody;