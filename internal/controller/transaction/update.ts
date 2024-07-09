import express from "express"
import {PrismaClient, Transaction} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

async function UpdateTransaction(req: express.Request<any, any, Transaction, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            productId: body.productId,
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
    UpdateTransaction
}