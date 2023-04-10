import {PrismaClient} from "@prisma/client"
import express from "express"


interface ReadTypeByIdQuery {
    id: string
}

interface ReadTypeWithPaginationQuery {
    skip: string
    take: string
}

interface ReadTypeWithFuzzyQuery {
    key: string
}

interface ReadTypeWithPaginationAndFuzzyQuery extends ReadTypeWithPaginationQuery, ReadTypeWithFuzzyQuery {

}

// 按类型编号查询
async function ReadTypeById(req: express.Request<any, any, any, ReadTypeByIdQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.type.findMany({
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

// 分页查询所有类型
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
async function ReadTypeWithPagination(req: express.Request<any, any, any, ReadTypeWithPaginationQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.type.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
    }).then(function (resp) {
        res.status(200).json(resp)
    }).catch(function (err) {
        res.status(403).type("text/plain").send(err.toString())
    })
}

// 模糊查询
async function ReadTypeWithFuzzy(req: express.Request<any, any, any, ReadTypeWithFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.type.findMany({
        where: {
            OR: [
                {
                    name: {
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
async function ReadTypeWithPaginationAndFuzzy(req: express.Request<any, any, any, ReadTypeWithPaginationAndFuzzyQuery>, res: express.Response, next: express.NextFunction) {
    const query = req.query
    const prisma = new PrismaClient()

    await prisma.type.findMany({
        skip: Number(query.skip),
        take: Number(query.take),
        where: {
            OR: [
                {
                    name: {
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
    ReadTypeById,
    ReadTypeWithPagination,
    ReadTypeWithFuzzy,
    ReadTypeWithPaginationAndFuzzy,
}