import React,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";


const ShowBook = () => {
    
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    useEffect(()=>{

        setLoading(true)

        axios
        .get(`http://localhost:5566/books/${id}`)
        .then((response) => {
            setBooks(response.data)
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error)
            setLoading(false)
        })
    },[])
    
    return(
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3x1 my4">Show Book details</h1>
            {loading?(<Spinner/>):(<div className="flex flex-col border-sky-400 border-2 rounded-x1 w-fit p-4">
                <div className="my-4">
                    <span className="text-x1 mr-4 text-grey-500">ID</span>
                    <span>{books._id}</span>
                </div>
                <div className="my-4">
                    <span className="text-x1 mr-4 text-grey-500">Title</span>
                    <span>{books.Title}</span>
                </div>
                <div className="my-4">
                    <span className="text-x1 mr-4 text-grey-500">Author</span>
                    <span>{books.Author}</span>
                </div>
                <div className="my-4">
                    <span className="text-x1 mr-4 text-grey-500">Yearofpublish</span>
                    <span>{books.Yearofpublish}</span>
                </div>
                <div className="my-4">
                    <span className="text-x1 mr-4 text-grey-500">Create Time</span>
                    <span>{new Date(books.createdAt).toString()}</span>
                </div>
                <div className="my-4">
                    <span className="text-x1 mr-4 text-grey-500">Updated Time</span>
                    <span>{new Date(books.updatedAt).toString()}</span>
                </div>
            </div>)}

        </div>
    )
    
}

export default ShowBook
