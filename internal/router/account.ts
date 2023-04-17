import express from "express"
import {CreateAccount} from "../controller/account/create"
import {UpdateAccount} from "../controller/account/update"
import {DeleteAccount, DeleteManyAccount} from "../controller/account/delete"
import {
    ReadAccountById,
    ReadAccountWithFuzzy,
    ReadAccountWithPagination,
    ReadAccountWithPaginationAndFuzzy,
    ReadAllAccount
} from "../controller/account/read"

const router = express.Router()

// 创建账户
router.post("/account", CreateAccount)

// 修改账户
router.put("/account", UpdateAccount)

// 查询账户
router.get("/account", ReadAccountById)
router.get("/account/all", ReadAllAccount)
router.get("/account/pagination", ReadAccountWithPagination)
router.get("/account/fuzzy", ReadAccountWithFuzzy)
router.get("/account/paginationAndFuzzy", ReadAccountWithPaginationAndFuzzy)

// 删除账户
router.delete("/account", DeleteAccount)
router.delete("/account/many", DeleteManyAccount)

export {
    router
}