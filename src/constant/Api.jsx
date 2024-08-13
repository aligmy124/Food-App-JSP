export const BASE_URL="https://upskilling-egypt.com:3006/api/v1";
export const BASE_IMG_URL="https://upskilling-egypt.com:3006"
//Auth
export const BASE_USERS=`${BASE_URL}/Users`;
export const USERS_URL={
    login:`${BASE_USERS}/Login`,
    register:`${BASE_USERS}/Register`,
    forgetpass:`${BASE_USERS}/Reset/Request`,
    resetpass:`${BASE_USERS}/Reset`,
    getUsers:`${BASE_USERS}`,
    delete:(id)=>`${BASE_USERS}/${id}`,
}
//category
export const BASE_CATEGORY=`${BASE_URL}/Category`;
export const CATEGORY_URL={
    getList:`${BASE_CATEGORY}`,
    delete:(id)=>`${BASE_CATEGORY}/${id}`,
    update:(id)=>`${BASE_CATEGORY}/${id}`,
    create:`${BASE_CATEGORY}`,
}
//Recipe
export const BASE_RECIPES=`${BASE_URL}/Recipe`;
export const RECIPES_URL={
    getList:`${BASE_RECIPES}`,
    delete:(id)=>`${BASE_RECIPES}/${id}`,
    update:(id)=>`${BASE_RECIPES}/${id}`,
    create:`${BASE_RECIPES}`
}
//Tag
export const GETALLTAG=`${BASE_URL}/tag`
// Users
// export const BASE_USERS=`${BASE_URL}/Recipe`;
// export const USERS_URL={
//     getList:`${BASE_USERS}`,
//     delete:(id)=>`${BASE_USERS}/${id}`,
//     update:(id)=>`${BASE_USERS}/${id}`,
// }