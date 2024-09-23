import { useEffect, useState } from 'react';

export const useDebounce = (value: string, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};

export const debounce = (cb:()=>void,delay:number)=>{
let timer:number

return function (){
  clearTimeout(timer)
   timer = setTimeout(cb,delay)
}
}