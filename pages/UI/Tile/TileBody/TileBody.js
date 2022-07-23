import { HiOutlineBadgeCheck } from 'react-icons/hi';
const TileBody = props => {
    const policy = props.loanData?.POLICY;
    return (
        <div className="w-2/3 px-4 py-3 h-full flex flex-col justify-around z-10 rounded-t-lg dark:bg-gray dark:text-white bg-primary relative">
            {props.listing ? <div className="absolute flex items-center top-3 right-3 rounded-full p-2 shadow-button hover:shadow-button-hover w-9 justify-center dark:shadow-button-dark">
                <HiOutlineBadgeCheck className="text-xl" />
            </div> : null}
            <div className="flex justify-between">
                <div className="w-5/6">
                    <div className="font-bold text-xs xl:text-sm text-ellipsis overflow-hidden whitespace-nowrap w-4/5">{props.name}</div>
                    {/* <div className="text-[10px] xl:text-xs dark:text-grey1 text-ellipsis overflow-hidden whitespace-nowrap max-w-[80%] hover:text-grey2" onClick={openProject}>{props.project?.toString()}</div> */}
                    {policy ? <div className="font-bold text-xs" title={policy}>{policy?.slice(0, 4) + '...' + policy.slice(policy.length - 6, policy.length)}</div> : null}
                </div>

            </div>
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

export default TileBody;