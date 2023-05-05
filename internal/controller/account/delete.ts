import {PrismaClient} from "@prisma/client"
import express from "express"
import {PrismaClientOption} from "../../../main"

interface DeleteAccountQuery {
    id: string
}

interface DeleteManyAccountQuery {
    ids: string[]
}

async function DeleteAccount(req: express.Request<any, any, any, DeleteAccountQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.account.deleteMany({
        where: {
            OR: [
                {
                    id: query.id
                }
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

async function DeleteManyAccount(req: express.Request<any, any, any, DeleteManyAccountQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.account.deleteMany({
        where: {
            id: {
                in: query.ids
            }
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    DeleteAccount,
    DeleteManyAccount
}