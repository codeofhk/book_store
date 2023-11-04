import React ,{useEffect, useState} from "react";
import axios from "axios";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import { useNavigate,useParams } from "react-router-dom";

const EditBook = () => {

    const [Title,setTitle] = useState('');
    const [Author,setAuthor] = useState('');
    const [Yearofpublish,setYearofpublish] = useState('');
    const [loading,setLoading] = useState(false);
    const {id} = useParams();

    useEffect(()=>{
        setLoading(true)
        
        axios
        .get(`http://localhost:5566/books/${id}`)
        .then((response) => {
            setTitle(response.data.Title);
            setAuthor(response.data.Author);
            setYearofpublish(response.data.Yearofpublish);
            setLoading(false)
        }
        )
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })

    },[])

    const navigate = useNavigate();
    const handleSaveBook = () => {

        const data = {
            Title,
            Author,
            Yearofpublish
        }
        setLoading(true);

        axios
        .put(`http://localhost:5566/books/${id}`,data)
        .then(()=>{
            setLoading(false)
            navigate('/')
        })
        .catch((error) =>{
            setLoading(false)
            alert('error happend , check console')
            console.log(error);
        })
    }
    return (
        <div className="p-4">
            <BackButton/>
            <h1 className="text-3x1 my-4">Create Book</h1>
            {
                loading?(<Spinner/>): ''
            }

            <div className="flex flex-col border-2 bg-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className='text-x1 mr-4 text-gray-500'>Title</label>
                    <input
                        type = 'text'
                        value = {Title}
                        onChange = {(e) => setTitle(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2"
                    />
                </div>
                <div className="my-4">
                    <label className='text-x1 mr-4 text-gray-500'>Author</label>
                    <input
                        type = 'text'
                        value = {Author}
                        onChange = {(e) => setAuthor(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2"
                    />
                </div>
                <div className="my-4">
                    <label className='text-x1 mr-4 text-gray-500'>Year of Publish</label>
                    <input
                        type = 'number'
                        value = {Yearofpublish}
                        onChange = {(e) => setYearofpublish(e.target.value)}
                        className="border-2 border-gray-500 px-4 py-2"
                    />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}> 
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBook

