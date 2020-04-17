import {useState,useEffect} from 'react';
export default function Pager({maxPerPage,totalRecords,setPage,currentPage}){
    const [pagination,setPagination] = useState({
        total:totalRecords,
        max:maxPerPage || 10,
        current:currentPage || 1,
        pages:[]
    });
    useEffect(()=>{
        if(Number(totalRecords)){
            let total_pages = Math.ceil(totalRecords/ maxPerPage);
            let pages = [];
            for(let i=0;i<total_pages;i++){ pages.push(i+1)};
            setPagination({...pagination,...{pages,total:totalRecords,current:currentPage}});
        }else{
            setPagination({...pagination,...{pages:[]}});

        }
   
    },[totalRecords,currentPage])
    return (<React.Fragment>

                {
                    pagination.pages.length ?
                    <div className="pager">{
                            pagination.pages.map((num)=>{
                                return <button style={{color:pagination.current === num ? 'red' : 'black'}}
                                onClick={()=>{
                                    setPage(num);
                                }} key={num}
                                >{num}</button>
                            })
                        }
                    </div>
                    : null
                }
    </React.Fragment>)
}