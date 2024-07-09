import * as account from "./internal/router/account"
import * as type from "./internal/router/type"
import * as transaction from "./internal/router/transaction"
import * as product from "./internal/router/product"
import express from "express"
import cors from "cors"
import {InvalidArgumentError, program} from "commander"

const PrismaClientOption = {datasources: {db: {url: ""}}}

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
        .requiredOption("-db, --database <string>", "mysql or mariadb data source")
        .option("-addr --address [string]", "ip address", "localhost")
        .option("-p, --port [number]", "port", parsePort, 8000)
        .action(() => {
            PrismaClientOption.datasources.db.url = program.opts().database
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
    PrismaClientOption
}