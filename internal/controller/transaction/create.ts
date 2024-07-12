import express from "express"
import {PrismaClient, Transaction} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

interface TransactionWithProductIds extends Transaction {
    productIds?: string[]
}

async function CreateTransaction(req: express.Request<any, any, TransactionWithProductIds, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.create({
        data: {
            title: body.title,
            typeId: body.typeId,
            accountId: body.accountId,
            amount: body.amount,
            datetime: body.datetime,
            status: body.status,
            // 多对多关联表, 创建关联信息
            ProductOnTransaction: {
                create: body.productIds?.map(id => {
                    return {productId: id}
                })
            }
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    CreateTransaction
}