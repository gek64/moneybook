import express from "express"
import {PrismaClient, Product} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

async function UpdateProduct(req: express.Request<any, any, Product, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.product.update({
        where: {
            id: Number(body.id),
        },
        data: {
            name: body.name,
            code: body.code,
            specifications: body.specifications,
            remark: body.remark
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    UpdateProduct
}