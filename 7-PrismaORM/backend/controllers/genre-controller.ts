import genreService from '../services/genre-service'
import {Request, Response, NextFunction} from 'express'


const getGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await genreService.listGenres()
        res.status(200).send(result);
        next()
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

const getGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)
        const result = await genreService.read(id)
        if(result)
            res.status(200).send(result);
        else
            res.status(404).send({});
        next()
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

const postGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genre = {
            name : req.body.name
        }
        const result = await genreService.create(genre)
        res.status(201).send(result);
        next()
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

const putGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)
        const genre: genre = {
            id: parseInt(req.body.id),
            name : req.body.name
        }
        if (id != genre.id)
            res.status(400).send({message: "'id' of url and request body must be the same"})
        else if (!await genreService.read(id))
            res.status(404).send({message: "register not found"})
        else{
            const result = await genreService.update(genre)
            res.sendStatus(204)
        }
        next()
    } catch (error) {
        res.status(500).json(error)
        next(error)
    }
}

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)
        if (!await genreService.read(id))
            res.status(404).send({message: "register not found"})
        else{
            const result = await genreService.delGenre(id)
            res.status(200).send({
                result: result,
                msg: "Registro excluído com sucesso."
            })
        }
        next()
    } catch (error) {
        res.status(200).send({
            result: false,
            msg: "Erro inesperado de banco de dados."
        })
        next(error)
    }
}

export default {
    getGenres,
    getGenre,
    postGenre,
    putGenre,
    deleteGenre
}