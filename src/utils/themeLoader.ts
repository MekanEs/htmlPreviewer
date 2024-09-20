// import { editor } from 'monaco-editor';

export const themeLoader= (themeKey:string)=>{

    return new Promise((res)=>{
import(`../themes/${themeKey}.json`).then((data)=>{
    res(data)
})
    }) 
}
