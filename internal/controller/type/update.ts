import express from "express"
import {PrismaClient, Type} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

async function UpdateType(req: express.Request<any, any, Type, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.type.update({
        where: {
            id: Number(body.id),
        },
        data: {
            name: body.name,
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    UpdateType
}