import * as monaco from 'monaco-editor';
import { themes } from '../themes/themes';
export const themeLoader= (themeKey:string)=>{

    return new Promise((res)=>{
import(`../themes/${themeKey}.json`).then((data)=>{
    res(data)
})
    }) 
}

export const themeSwitcher = (key:string)=>{
    themeLoader(themes[key]).then((data)=>{
  monaco.editor.defineTheme(key,data as monaco.editor.IStandaloneThemeData)
  monaco.editor.setTheme(key)

})}