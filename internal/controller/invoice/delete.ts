import {PrismaClient} from "@prisma/client"
import express from "express"

interface DeleteInvoiceQuery {
    id?: string
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

export {
    DeleteInvoice
}