import req from "@/utils/request.js"
import { useTokenStore } from '@/stores/token.js';


const ArticleCategoryListService = () => {
    // const tokemStore = useTokenStore();
    // console.log(tokemStore.token);
    //在pinia中定义的响应式数据都不用value
    // return req.get("/category",{headers:{'Authorization':tokemStore.token}})
    return req.get("/category")
}

const articleCategoryAddService = (categoryData) => {
    return req.post('/category', categoryData) //这样传的是json对象
}

const articleCategoryUpdateService = (categoryData) => {
    return req.put('/category', categoryData)
}

const articleCategoryDeleteService = (id) => {
    return req.delete('/category?id='+id)
}

const articleListService = (para)=>{
    return req.get('/article',{params:para})  //get传参
}
export {
    ArticleCategoryListService, articleCategoryAddService, articleCategoryUpdateService
    , articleCategoryDeleteService,articleListService
}