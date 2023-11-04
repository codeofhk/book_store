import React,{useEffect, useState} from "react";
import Spinner from "../Components/Spinner";
import axios from "axios";
import BackButton from "../Components/BackButton";
import { useParams,useNavigate } from "react-router-dom";


const DeleteBook = () => {

    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();
    const {id} = useParams();
    const [title,setTitle] = useState('')

    useEffect(()=>{
        axios
        .get(`http://localhost:5566/books/${id}`)
        .then((response)=>{ setTitle(response.data.Title)})

    },[])

    const handleDeleteBook = () => {

        setLoading(true);

        axios
        .delete(`http://localhost:5566/books/${id}`)
        .then(() => {
            navigate('/')
            setLoading(false)
        }
        )
        .catch((error) => {
            setLoading(false);
            alert('error happend , check console');
            console.log(error)
        });
    };

    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3x1 my-4">Delete Book</h1>
            {loading ? (<Spinner/>):''}
            <div className="flex flex-col item-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <h3 className="text-2xl">Do you want to delete the book </h3>
                <h3>{title}</h3>

                <button className="p-4 bg-red-600 m-8 w-full" onClick={handleDeleteBook}>YES, Delete it</button>
            </div>
        </div>
    )
    
}

export default DeleteBook
