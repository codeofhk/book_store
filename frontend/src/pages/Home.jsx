import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner"
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksTable from "../Components/Home/BooksTable";
import Bookscard from "../Components/Home/Bookscard";


const Home = () => {

    const [books, SetBooks] = useState([]);
    const [loading, SetLoading] = useState(false)
    const [showType, setShowType] = useState('table')

    useEffect(() => {
        SetLoading(true)
        axios
            .get('http://localhost:5566/books')
            .then((response) => {
                SetBooks(response.data['book'])
                SetLoading(false)
            })
            .catch((error) => {
                console.log(error)
                SetLoading(false)
            })
    }, [])
    return (
        <div className="p-4">
            <div className="flex justify-center item-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('table')}>Table</button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setShowType('card')}>Card</button>
            </div>
            <div className="flex justify-between items-center">
                <div className="text-3x1 my-8">
                    <Link to='/books/create'>
                        <MdOutlineAddBox className="text-sky-blue text-4x1" />
                    </Link>
                    <div>
                        {loading ? (<Spinner />) : (showType == 'table' ? (<BooksTable books={books} />) : (<Bookscard books={books} />))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
