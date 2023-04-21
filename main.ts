import * as account from "./internal/router/account"
import * as type from "./internal/router/type"
import * as invoice from "./internal/router/invoice"
import express from "express"
import cors from "cors"

function main() {
    const app = express()

    // 允许跨域访问
    app.use(cors())
    // req.body json 序列化
    app.use(express.json())

    // 路由
    app.use(account.router)
    app.use(type.router)
    app.use(invoice.router)

    // 应用启动
    app.listen(8000, "0.0.0.0")
}

main()