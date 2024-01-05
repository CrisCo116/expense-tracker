import Bars from "../Data/Graphs/Bar"

export default function Dashboard() {
    return (
        <div className="h-screen w-full flex flex-col md:flex-row justify-center ">
            <div className="h-screen flex flex-col md:flex-row w-full md:w-3/4 border py-[5rem] ">
            <div className="border w-full md:w-3/4 h-screen">
                <div className="w-full md:w-[30rem] h-[5rem] border flex flex-row gap-2 text-5xl justify-center items-center">
                    <p className=""> Welcome back </p> 
                    <span>User</span>
                </div>
            </div>
            <div className="border w-full md:w-1/4 h-screen">
                <div className="py-[5rem]">
                    <Bars/>
                    
                </div>
            </div>
            </div>
        </div>
    )
}