import {PrismaClient} from "@prisma/client"
import express from "express"
import {PrismaClientOption} from "../../../main"

interface IdQuery {
    id: string
}

interface IdsQuery {
    // 传入一个 id 时为 string, 传入多个 id 时为 string[]
    ids: string | string[]
}

async function DeleteProduct(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.product.delete({
        where: {
            id: query.id,
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

async function DeleteProducts(req: express.Request<any, any, any, IdsQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    // query.ids 为字符串时转换为单元素数组, 为数组时无改变
    query.ids = [].concat(query.ids)

    await prisma.product.deleteMany({
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
    DeleteProduct,
    DeleteProducts
}