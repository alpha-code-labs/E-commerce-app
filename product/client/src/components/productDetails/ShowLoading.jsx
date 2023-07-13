export default function ShowLoading(){
    return(
        <div className="box-border p-6">
            <div className="flex flex-row space-x-4">
                <div className="w-[360px] h-[360px] bg-slate-200"></div>
                <div className="h-[360px] w-full flex flex-col space-y-5 h-full">
                    <div className="flex flex-col space-y-1">
                        <div className="w-[270px] h-[30px] bg-slate-200"></div>
                        <div className="w-[270px] h-[50px] bg-slate-200"></div>
                        <div className="w-[100px] h-[20px] bg-slate-200"></div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="w-[117px] h-7 bg-slate-200"></div>
                        <div className="w-[137px] h-7 bg-slate-200"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}