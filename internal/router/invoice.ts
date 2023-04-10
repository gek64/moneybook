import express from "express"
import {CreateInvoice} from "../controller/invoice/create"
import {UpdateInvoice} from "../controller/invoice/update"
import {DeleteInvoice} from "../controller/invoice/delete"
import {
    ReadInvoiceById,
    ReadInvoiceWithFuzzy,
    ReadInvoiceWithPagination,
    ReadInvoiceWithPaginationAndFuzzy
} from "../controller/invoice/read"

const router = express.Router()

// 创建账单
router.post("/invoice", CreateInvoice)

// 修改账单
router.put("/invoice", UpdateInvoice)

// 查询账单
router.get("/invoice", ReadInvoiceById)
router.get("/invoice/pagination", ReadInvoiceWithPagination)
router.get("/invoice/fuzzy", ReadInvoiceWithFuzzy)
router.get("/invoice/paginationAndFuzzy", ReadInvoiceWithPaginationAndFuzzy)

// 删除账单
router.delete("/invoice", DeleteInvoice)

export {
    router
}