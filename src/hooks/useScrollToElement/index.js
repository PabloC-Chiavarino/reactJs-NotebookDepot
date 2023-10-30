import { useEffect } from "react";

const useScrollToElement = () => {
    useEffect( () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    })
}

export default useScrollToElement
