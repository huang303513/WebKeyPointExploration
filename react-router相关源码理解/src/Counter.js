import react,{useState, useEffect} from 'react';

function useCounter() {
   const [count ,setCount] = useState(0); 

   function setCountCB(count) {
     setCount(count + 1);
   }

   useEffect(() => {
    const id = setInterval(() => {
        setCount(setCountCB);
    },1000);
    return () => clearInterval(id);
   },[]);

   return count;
}

export default useCounter;