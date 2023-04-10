import express from "express"
import {CreateType} from "../controller/type/create"
import {UpdateType} from "../controller/type/update"
import {DeleteType} from "../controller/type/delete"
import {
    ReadTypeById,
    ReadTypeWithFuzzy,
    ReadTypeWithPagination,
    ReadTypeWithPaginationAndFuzzy
} from "../controller/type/read"

const router = express.Router()

// 创建类型
router.post("/type", CreateType)

// 修改类型
router.put("/type", UpdateType)

// 查询类型
router.get("/type", ReadTypeById)
router.get("/type/pagination", ReadTypeWithPagination)
router.get("/type/fuzzy", ReadTypeWithFuzzy)
router.get("/type/paginationAndFuzzy", ReadTypeWithPaginationAndFuzzy)

// 删除类型
router.delete("/type", DeleteType)

export {
    router
}