import * as account from "./internal/router/account"
import * as type from "./internal/router/type"
import * as invoice from "./internal/router/invoice"
import express from "express"

function main() {
    const app = express()

    // 路由
    app.use(express.json(), account.router)
    app.use(express.json(), type.router)
    app.use(express.json(), invoice.router)

    // 应用启动
    app.listen(8000, "127.0.0.1")
}

main()