import express from "express"
import {PrismaClient} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

interface PatchInvoicesStatusBody {
    ids: string[],
    status: string
}

async function PatchManyInvoicesStatus(req: express.Request<any, any, PatchInvoicesStatusBody, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.invoice.updateMany({
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
    PatchManyInvoicesStatus
}