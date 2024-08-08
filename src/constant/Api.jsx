export const BASE_URL="https://upskilling-egypt.com:3006/api/v1";
//Auth
export const BASE_USERS=`${BASE_URL}/Users`;
export const USERS_URL={
    login:`${BASE_USERS}/Login`,
    register:`${BASE_USERS}/Register`,
    forgetpass:`${BASE_USERS}/Reset/Request`,
    resetpass:`${BASE_USERS}/Reset`,
}
//category
export const BASE_CATEGORY=`${BASE_URL}/Category`;
export const CATEGORY_URL={
    getList:`${BASE_CATEGORY}`,
    delete:(id)=>`${BASE_CATEGORY}/${id}`,
}