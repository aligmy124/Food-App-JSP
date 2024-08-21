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
    verify:`${BASE_USERS}/verify`,
    delete:(id)=>`${BASE_USERS}/${id}`,
    create:`${BASE_USERS}/Create`,
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
    create:`${BASE_RECIPES}`,
    view:(id)=>`${BASE_RECIPES}/${id}`
}
//Tag
export const GETALLTAG=`${BASE_URL}/tag`

//Favourite
export const BASE_FAVOURITE=`${BASE_URL}/userRecipe`
export const FAVOURITE_URL={
    getList:`${BASE_FAVOURITE}`,
    addFavourite:`${BASE_URL}/userRecipe`,
    remove:(id)=>`${BASE_URL}/userRecipe/${id}`
}

/*Update GitHup:
git status
git add .
git commit -m "newnetlify"
git push origin main
*/  