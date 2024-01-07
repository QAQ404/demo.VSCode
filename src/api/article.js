import req from "@/utils/request.js"

const ArticleCategoryListService = () =>{
    return req.get("/category")
}

export {ArticleCategoryListService}