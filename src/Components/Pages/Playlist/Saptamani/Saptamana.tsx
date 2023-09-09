import { useState } from "react";

function Saptamana(){

    const [array,serArray] = useState([]);

    return( <div>
            <div className = 'workoutserie flex flex-col bg-slate-300 min-w-[400px] max-w-[400px] w-full border-slate-500 border-2 rounded-3xl m-2'>
                <div className='title-bar flex flex-row border-b-2 border-slate-500 justify-center place-items-center'>
                    Saptamana
                </div>
                <div className='content-bar flex flex-col h-full p-2 space-y-1 justify-start'>
        
                    {/* file zone */}
                        {array.map((child)=>
                            <button className='flex w-fuil h-fit bg-slate-400 border-2 border-slate-500 text-center text-blue-800 font-bold rounded justify-center'>
                                <div className='flex flex-row mr-auto'>
                                    {/* {child.name} */}Zi
                                </div>
                            </button>
                        )}
                        
                </div>
            </div>
        </div>
        
        )
}

export default Saptamana;