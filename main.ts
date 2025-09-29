import express from "express"
import cors from "cors"
import * as account from "./internal/router/account"
import * as type from "./internal/router/type"
import * as transaction from "./internal/router/transaction"
import * as product from "./internal/router/product"
import {PrismaMariaDb} from "@prisma/adapter-mariadb"
import {InvalidArgumentError, program} from "commander"

const adapter = new PrismaMariaDb("mysql://root:root@localhost:3306/moneybook")
const PrismaDBAdapter = {adapter}

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
    // 处理命令行参数
    program
        .requiredOption("-d, --database <string>", "database source url")
        .option("-a --address [string]", "ip address", "127.0.0.1")
        .option("-p, --port [number]", "port", parsePort, 8000)
        .action(() => {
            PrismaDBAdapter.adapter = new PrismaMariaDb(program.opts().database)
        })
    program.parse()

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
    PrismaDBAdapter
}