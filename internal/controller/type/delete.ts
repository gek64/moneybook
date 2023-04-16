import {PrismaClient} from "@prisma/client"
import express from "express"

interface DeleteTypeQuery {
    id?: string
    name?: string
}

interface DeleteManyTypeQuery {
    ids: string[]
}

async function DeleteType(req: express.Request<any, any, any, DeleteTypeQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.type.deleteMany({
        where: {
            OR: [
                {
                    id: query.id
                },
                {
                    name: query.name
                }
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

async function DeleteManyType(req: express.Request<any, any, any, DeleteManyTypeQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.type.deleteMany({
        where:
            {
                id: {
                    in: query.ids
                }
            }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    DeleteType,
    DeleteManyType
}