import express from "express"
import {Invoice, PrismaClient} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

async function CreateInvoice(req: express.Request<any, any, Invoice, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.invoice.create({
        data: {
            title: body.title,
            typeId: body.typeId,
            accountId: body.accountId,
            amount: body.amount,
            datetime: body.datetime,
            status: body.status,
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    CreateInvoice
}