import Search from './../../components/Movies/search';
import List from './../../components/Movies/list';
import Pager from './../../components/pager';
import fetch from 'node-fetch';
import { useState,useEffect } from 'react';
export default function Movies(){
    const [data,setData] = useState({
        searchText: 'inception',
        movies:[],
        maxPerPage:10,
        totalRecords:0,
        currentPage:1
    });

    async function fetchMovies() {
        const response = await fetch(`${process.env.OMDB_API}?s=${data.searchText}&apikey=${process.env.OMDB_SECRET_KEY}&r=json&page=${data.currentPage}`);
        const movies = (await response.json()) || {};
        if(movies.Response == 'True'){
            setData((prevState) => {
                return {...prevState, ...{movies:movies.Search,totalRecords:Number(movies.totalResults)}};
            });
        } else{
            setData((prevState) => {
                return {...prevState, ...{movies:[],totalRecords:0}};
            });
        }
        
    }

    useEffect(()=>{
        fetchMovies();
    },[data.searchText,data.currentPage]);

    return (<div>
        <style jsx global>{
            `
            .movie-item{
                display: flex;
                padding: 10px;
                width: 80%;
                justify-content: space-around;
            }
            .outer{
                position: relative;
                margin: 0 15%;
                top: 0;
                bottom: 0;
                padding: 25px;
            }
            .outer .item-detail{
                flex: 50%;
                display: flex;
                flex-direction: column;
                border: 1px solid #888888;
                border-radius: 4px;
                box-shadow: 0px 1px #888888;
            }
            .outer .item-detail img{
                border: 0;
                max-width: 100%!important;
                height: auto;
                cursor:pointer;
            }
            .outer .item-detail a{
               color:blue;
               cursor:pointer;
            }
            .outer .item-detail div{
                padding-left:10px;
            }
            .input-container{
                display: flex;
                padding: 10px;
                width: 80%;
            }
            .input-container input{
                width: 70%;
                padding: 10px;
                font-size: 14px;
                outline: none;
            }
            .input-container button{
                flex: 1;
                text-align: center;
                background: transparent;
                cursor: pointer;
                font-size: 14px;
                margin-left: 10px;
            }
            .pager {
                margin: 0 auto;
                margin-top: 20px;
                /* display: flex; */
                display: flex;
                /* padding: 10px 0px; */
                width: 80%;
                flex-wrap: wrap;
            }
            .pager button{
                color: black;
                font-size: 14px;
                padding: 5px 10px;
                margin-left: 10px;
                font-weight: 700;
                cursor:pointer;
                margin-top: 10px;
                background:transparent;
            }
            `
        }
        </style>

        <div className="outer">
            <Search searchText={data.searchText} setSearch={(text)=>{
                setData((prevState) => {
                    return {...prevState, ...{searchText:text}};
                });
            }}/>
            <List movies={data.movies}/>

            <Pager maxPerPage={data.maxPerPage} totalRecords={data.totalRecords} setPage={(num)=>{
                setData((prevState) => {
                    return {...prevState, ...{currentPage:num}};
                });
            }} currentPage={data.currentPage}/>
        </div>
       
    </div>)
}