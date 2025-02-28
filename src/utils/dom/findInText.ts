import { FindPropsObject } from "../types/types";

export const FindInText = (text: string = '', propObj: FindPropsObject) => {
    const { regexp, replace } = propObj;
    const newText = text.replace(/redirect_url=\{\{/gm, '');
    const matches = newText.match(regexp) || [];

    return matches.reduce((acc: Record<string, number>, el: string) => {
        const match = el.replace(replace, '').split('"')[0];
        acc[match] = (acc[match] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
}