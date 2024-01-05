import Bars from "../Data/Graphs/Bar"

export default function Dashboard() {
    return (
        <div className="h-screen w-full flex justify-center ">
            <div className="h-screen flex flex-row w-3/4 border py-[5rem] ">
            <div className="border w-3/4 h-screen">
                <div className="w-[30rem] h-[5rem] border flex flex-row gap-2 text-5xl justify-center items-center">
                    <p className=""> Welcome back </p> 
                    <span>User</span>
                </div>
            </div>
            <div className="border w-1/4 h-screen">
                <div className="py-[5rem]">
                    <Bars/>
                </div>
            </div>
            </div>
           
        </div>
    )
}