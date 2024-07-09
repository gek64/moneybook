import {PrismaClient} from "@prisma/client"
import express from "express"
import {PrismaClientOption} from "../../../main"

interface IdQuery {
    id?: string
    name?: string
}

interface IdsQuery {
    ids: string[]
}

async function DeleteType(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.type.delete({
        where: {
            id: query.id,
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

async function DeleteTypes(req: express.Request<any, any, any, IdsQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

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
    DeleteTypes
}