import express from "express"
import {PrismaDBAdapter} from "../../../main"
import {PrismaClient} from "../../../prisma/generated/client/client"

interface IdsStatusBody {
    ids: string[],
    status: string
}

async function PatchTransactionsStatus(req: express.Request<any, any, IdsStatusBody, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaDBAdapter)

    await prisma.transaction.updateMany({
        where: {
            id: {
                in: body.ids
            },
        },
        data: {
            status: body.status,
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(400).type("text/plain").send(err.toString())
    })
}

export {
    PatchTransactionsStatus
}