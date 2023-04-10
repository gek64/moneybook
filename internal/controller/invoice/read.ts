import {PrismaClient} from "@prisma/client"
import express from "express"


interface ReadInvoiceById {
    id: string
}

interface ReadInvoiceWithPaginationQuery {
    skip: string
    take: string
}

interface ReadInvoiceWithFuzzyQuery {
    key: string
}

interface ReadInvoiceWithPaginationAndFuzzyQuery extends ReadInvoiceWithPaginationQuery, ReadInvoiceWithFuzzyQuery {

}

// 按账单编号查询
async function ReadInvoiceById(req: express.Request<any, any, any, ReadInvoiceById>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.invoice.findMany({
        where: {
            OR: [
                {
                    id: query.id
                }
            ]
        },
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 分页查询所有账单
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadInvoiceWithPagination(req: express.Request<any, any, any, ReadInvoiceWithPaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.invoice.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadInvoiceWithFuzzy(req: express.Request<any, any, any, ReadInvoiceWithFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.invoice.findMany({
        where: {
            OR: [
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
        }
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 模糊分页查询
async function ReadInvoiceWithPaginationAndFuzzy(req: express.Request<any, any, any, ReadInvoiceWithPaginationAndFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.invoice.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            OR: [
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
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

export {
    ReadInvoiceById,
    ReadInvoiceWithPagination,
    ReadInvoiceWithFuzzy,
    ReadInvoiceWithPaginationAndFuzzy,
}