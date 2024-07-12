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
            id: query.id,
        },
        include: {
            type: true,
            account: true,
            ProductOnTransaction: {
                select: {
                    product: true
                }
            }
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
            type: true,
            account: true,
            ProductOnTransaction: {
                select: {
                    product: true
                }
            }
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
            type: true,
            account: true,
            ProductOnTransaction: {
                select: {
                    product: true
                }
            }
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
                    title: {
                        contains: query.key
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                name: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                code: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                }
            ]
        },
        include: {
            type: true,
            account: true,
            ProductOnTransaction: {
                select: {
                    product: true
                }
            }
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
                    title: {
                        contains: query.key
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                name: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                },
                {
                    ProductOnTransaction: {
                        some: {
                            product: {
                                code: {
                                    contains: query.key
                                }
                            }
                        }
                    }
                }
            ]
        },
        include: {
            type: true,
            account: true,
            ProductOnTransaction: {
                select: {
                    product: true
                }
            }
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