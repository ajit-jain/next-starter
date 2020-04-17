import React,{useState} from 'react';
export default function Search({searchText,setSearch}){
    const [inputData,setInputData] = useState(searchText)
    return (
            <div className="input-container">
                <input value={inputData} onChange={(e)=>{
                    setInputData(e.target.value);
                }} onKeyDown={(e)=>{
                    if (e.key === 'Enter') {
                        setSearch(inputData);
                    }
                }}/>
                <button onClick={()=>{
                    setSearch(inputData);
                }}>Search</button>
            </div>
    )
}