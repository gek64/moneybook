import express from "express"
import {Account, PrismaClient} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

async function UpdateAccount(req: express.Request<any, any, Account, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.account.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            number: body.number,
            type: body.type,
            funds: body.funds,
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    UpdateAccount
}