import express from "express"
import cors from "cors"
import {PrismaMariaDb} from "@prisma/adapter-mariadb"
import * as account from "./internal/router/account"
import * as type from "./internal/router/type"
import * as transaction from "./internal/router/transaction"
import * as product from "./internal/router/product"
import {PrismaClient} from "./prisma/generated/client/client"
import {InvalidArgumentError, program} from "commander"

// js engine
const adapter = new PrismaMariaDb("")
const prismaDBAdapter = {adapter}

// rust engine
// const prismaDBAdapter = {datasources: {db: {url: ""}}}

// command line arguments
program
    .requiredOption("-d, --database <string>", "database source url")
    .option("-a, --address [string]", "ip address", "127.0.0.1")
    .option("-p, --port [number]", "port", parsePort, 8000)
    .action(() => {
        // js engine
        prismaDBAdapter.adapter = new PrismaMariaDb(program.opts().database)

        // rust engine
        // prismaDBAdapter.datasources.db.url = program.opts().database
    })
program.parse()

// prisma client
const prisma = new PrismaClient(prismaDBAdapter)

function parsePort(value: string) {
    const parsedValue = parseInt(value)
    if (isNaN(parsedValue)) {
        throw new InvalidArgumentError("not a number.")
    } else if (parsedValue <= 0 || parsedValue >= 65535) {
        throw new InvalidArgumentError("not a invalid port.")
    }
    return parsedValue
}

function main() {
    // express
    const app = express()

    // 允许跨域访问
    app.use(cors())

    // req.body json 序列化
    app.use(express.json())

    // 路由
    app.use(account.router)
    app.use(type.router)
    app.use(product.router)
    app.use(transaction.router)

    // 应用启动
    app.listen(program.opts().port, program.opts().address)
}

main()

export {
    prisma
}