import express from "express"
import {PrismaClient} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

interface IdsStatusBody {
    ids: string[],
    status: string
}

async function PatchTransactionsStatus(req: express.Request<any, any, IdsStatusBody, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

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
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    PatchTransactionsStatus
}