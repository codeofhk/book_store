import { Book } from "../models/Bookmodel.js";
import { Router } from "express";

const router = Router()

router.post('/', async (Request, Response) => {
    try {
        if (!Request.body.Title ||
            !Request.body.Author ||
            !Request.body.Yearofpublish) {
            return Response.status(400).send({
                message: 'send complete data'
            });
        }
        const newBook = {
            Title: Request.body.Title,
            Author: Request.body.Author,
            Yearofpublish: Request.body.Yearofpublish

        };

        console.log(newBook);

        const book = await Book.create(newBook);

        return Response.status(201).send(book)
    }
    catch (error) {
        console.log(error.message)
        return Response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({})

        return response.status(200).json({
            book: books
        })
    }
    catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message });
    }
})

//finding by the id

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id);

        return response.status(200).json(books)
    }
    catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message });
    }
})

//update using id

router.put('/:id', async (request, response) => {
    try {

        if (!request.body.Title ||
            !request.body.Author ||
            !request.body.Yearofpublish) {
            return response.status(500).json({ message: 'send the complete detail' })
        }

        const { id } = request.params;

        const book = await Book.findByIdAndUpdate(id, request.body);

        if (!book) {
            return response.status(500).send({ message: 'book not found' })
        }

        return response.status(200).json(book)
    }
    catch (error) {
        console.log(error.message)
        return response.status(500).json({ error: error.message })
    }
})

router.delete('/:id', async (request, response) => {
    try {

        const {id} = request.params;
        
        const book = await Book.findByIdAndDelete(id);

        if (!book) {
            return response.status(500).send({ message: 'book not found' })
        }

        return response.status(200).send({message : 'book deleted successfully'})
    }
    catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message });
    }
})

export default router;