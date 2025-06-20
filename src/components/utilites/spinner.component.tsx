export const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin">
                <path className="opacity-75" fill="currentColor"/>
            </div>
        </div> 
    )
}