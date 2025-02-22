import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
type ParamType = {
    name:string;
    value:string;
}
export const UseSearchParams = ()=>{
    const [searchParams,setSearchParams] = useSearchParams();
    const [paramData,setParamData] = useState<ParamType>({
        name:'',
        value:''
    })
    const [showParams,setShowParams] = useState<boolean>(false);
    const handleParamData = (e:ChangeEvent<HTMLInputElement>)=>{
        setParamData({
            ...paramData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = ()=>{
        setSearchParams({[paramData.name]:paramData.value});
        setShowParams(true);
    }
    return (
        <>
        <div className="flex  flex-col w-1/3 items-center border rounded mt-20 gap-3 font-mono">
            <h1>This is UseSerach params usecase</h1>
            {
                showParams?(
                    <>
                        <h1>Search param name: {paramData.name}</h1>
                        <h1>Search param value: {searchParams.get(paramData.name)}</h1>
                    </>
                ):(
                    <>
                    </>
                )
            }
            <input className="border rounded" type="text"  name="name" id="name" placeholder="Enter query name" value={paramData.name} onChange={handleParamData} />
            <input className="border rounded" type="text" name="value" id="value"  placeholder="Enter query value" value={paramData.value} onChange={handleParamData}/>
            <button className="border w-40 mb-2 cursor-pointer rounded bg-slate-900 text-zinc-100" onClick={handleSubmit} >Set Params</button>
        </div>
        </>
    )
}