
const SkeletalBody = props => {
    return (
        <div className="px-4 py-3 h-1/3 flex flex-col justify-between z-20 dark:bg-gray rounded-b-lg">
            <div className="flex flex-col gap-2">
                <div className="bg-gray3 w-3/4 h-4 animate-pulse rounded-sm"></div>
                <div className="bg-grey1 w-2/4 h-4 animate-pulse rounded-sm"></div>
            </div>
            <div className="flex items-end justify-between h-2/3">
                <div className="flex w-full justify-between ">
                    <div className="bg-grey1 w-3/4 h-6 animate-pulse rounded-sm"></div>
                    <div className="flex gap-1">
                        <div className="bg-grey1 w-5 h-5 rounded-full animate-pulse"></div>
                        <div className="bg-grey1 w-3 h-5 rounded-md animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletalBody;