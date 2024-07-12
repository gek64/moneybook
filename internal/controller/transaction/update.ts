import express from "express"
import {PrismaClient, Transaction} from "@prisma/client"
import {PrismaClientOption} from "../../../main"

interface TransactionWithProductIds extends Transaction {
    productIds?: string[]
}

async function UpdateTransaction(req: express.Request<any, any, TransactionWithProductIds, any>, res: express.Response, next: express.NextFunction) {
    const body = req.body
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            typeId: body.typeId,
            accountId: body.accountId,
            amount: body.amount,
            datetime: body.datetime,
            status: body.status,
            // 多对多关联表, 先删除已有的关联信息 + 后创建新的关联信息
            ProductOnTransaction: {
                deleteMany: {
                    transactionId: body.id
                },
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
    UpdateTransaction
}