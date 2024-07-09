import {PrismaClient} from "@prisma/client"
import express from "express"
import {PrismaClientOption} from "../../../main"


interface IdQuery {
    id: string
}

interface PaginationQuery {
    skip: string
    take: string
}

interface FuzzyQuery {
    key: string
}

interface PaginationFuzzyQuery extends PaginationQuery, FuzzyQuery {

}

// 按交易编号查询
async function ReadTransaction(req: express.Request<any, any, any, IdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.findFirst({
        where: {
            id: Number(query.id),
        },
        include: {
            // 查询关系表中的部分字段
            // type: {
            //     select: {
            //         name: true
            //     }
            // }

            // 查询关系表中的所有字段
            product: true,
            type: true,
            account: true
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 查询所有交易
async function ReadTransactions(req: express.Request<any, any, any, any>, res: express.Response, next: express.NextFunction) {
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.findMany({
        include: {
            product: true,
            type: true,
            account: true
        }
    })
        .then(function (resp) {
            res.status(200).json(resp)
        }).catch(function (err) {
            res.status(403).type("text/plain").send(err.toString())
        })
}

// 分页查询所有交易
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadTransactionsWithPagination(req: express.Request<any, any, any, PaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        include: {
            product: true,
            type: true,
            account: true
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadTransactionsWithFuzzy(req: express.Request<any, any, any, FuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    // 多表关联查询 https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
    // 查询结果包含拼接的关联表
    await prisma.transaction.findMany({
        where: {
            OR: [
                {
                    product: {
                        name: {
                            contains: query.key
                        }
                    }
                },
                {
                    product: {
                        code: {
                            contains: query.key
                        }
                    }
                },
                {
                    type: {
                        name: {
                            contains: query.key
                        }
                    }
                },
                {
                    account: {
                        name: {
                            contains: query.key
                        }
                    }
                },
                {
                    title: {
                        contains: query.key
                    }
                },
                {
                    status: {
                        contains: query.key
                    }
                }
            ]
        },
        include: {
            product: true,
            type: true,
            account: true
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 模糊分页查询
async function ReadTransactionsWithPaginationAndFuzzy(req: express.Request<any, any, any, PaginationFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient(PrismaClientOption)

    await prisma.transaction.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            OR: [
                {
                    product: {
                        name: {
                            contains: query.key
                        }
                    }
                },
                {
                    product: {
                        code: {
                            contains: query.key
                        }
                    }
                },
                {
                    type: {
                        name: {
                            contains: query.key
                        }
                    },
                },
                {
                    account: {
                        name: {
                            contains: query.key
                        }
                    }
                },
                {
                    title: {
                        contains: query.key
                    }
                },
                {
                    status: {
                        contains: query.key
                    }
                },
            ]
        },
        include: {
            product: true,
            type: true,
            account: true
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    ReadTransaction,
    ReadTransactions,
    ReadTransactionsWithPagination,
    ReadTransactionsWithFuzzy,
    ReadTransactionsWithPaginationAndFuzzy,
}