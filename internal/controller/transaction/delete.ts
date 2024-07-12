import {PrismaClient} from "@prisma/client"
import express from "express"
import {PrismaClientOption} from "../../../main"

interface IdQuery {
    id: string
}

interface IdsQuery {
    ids: string[]
}

async function DeleteTransaction(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    // 先删除交易-商品关系表中的关系数据
    await prisma.productOnTransaction.deleteMany({
        where: {
            transactionId: query.id
        }
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })

    // 后删除交易表中的交易数据
    await prisma.transaction.delete({
        where: {
            id: query.id,
            ProductOnTransaction: {
                every: {
                    transactionId: query.id
                }
            }
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

async function DeleteTransactions(req: express.Request<any, any, any, IdsQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    // 先删除交易-商品关系表中的关系数据
    await prisma.productOnTransaction.deleteMany({
        where: {
            transactionId: {
                in: query.ids
            }
        }
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })

    // 后删除交易表中的交易数据
    await prisma.transaction.deleteMany({
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
    DeleteTransaction,
    DeleteTransactions
}