import {PrismaClient} from "@prisma/client"
import express from "express"


interface ReadAccountByIdQuery {
    id: string
}

interface ReadAccountWithPaginationQuery {
    skip: string
    take: string
}

interface ReadAccountWithFuzzyQuery {
    key: string
}

interface ReadAccountWithPaginationAndFuzzyQuery extends ReadAccountWithPaginationQuery, ReadAccountWithFuzzyQuery {

}

// 按账户编号查询
async function ReadAccountById(req: express.Request<any, any, any, ReadAccountByIdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.account.findMany({
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

// 分页查询所有账户
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadAccountWithPagination(req: express.Request<any, any, any, ReadAccountWithPaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.account.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadAccountWithFuzzy(req: express.Request<any, any, any, ReadAccountWithFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.account.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: query.key
                    }
                },
                {
                    number: {
                        contains: query.key
                    }
                },
                {
                    type: {
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

// 模糊分页查询
async function ReadAccountWithPaginationAndFuzzy(req: express.Request<any, any, any, ReadAccountWithPaginationAndFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.account.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            OR: [
                {
                    name: {
                        contains: query.key
                    }
                },
                {
                    number: {
                        contains: query.key
                    }
                },
                {
                    type: {
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
    ReadAccountById,
    ReadAccountWithPagination,
    ReadAccountWithFuzzy,
    ReadAccountWithPaginationAndFuzzy,
}