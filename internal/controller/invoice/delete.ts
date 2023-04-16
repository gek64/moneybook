import {PrismaClient} from "@prisma/client"
import express from "express"

interface DeleteInvoiceQuery {
    id: string
}

interface DeleteManyInvoiceQuery {
    ids: string[]
}

async function DeleteInvoice(req: express.Request<any, any, any, DeleteInvoiceQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.invoice.delete({
        where: {
            id: query.id
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

async function DeleteManyInvoice(req: express.Request<any, any, any, DeleteManyInvoiceQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.invoice.deleteMany({
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
    DeleteInvoice,
    DeleteManyInvoice
}