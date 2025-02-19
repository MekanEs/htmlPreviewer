import { getLanguageService, TextDocument } from "vscode-html-languageservice"
import { editor, monaco } from "../constants"


const htmlId = monaco.languages.html.htmlDefaults.languageId
const languageServer = getLanguageService()
export const htmlValidation = (model: editor.ITextModel)=>{
    const htmlContent = model.getValue();
    const virtualHTMLDocument = TextDocument.create(model.uri.toString(),htmlId,1,htmlContent)
    const html = languageServer.parseHTMLDocument(virtualHTMLDocument)
const diagnostics = html.roots
console.log(diagnostics);

}