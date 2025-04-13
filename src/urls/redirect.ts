import { useRouter } from "next/navigation";

const redirect = () =>{
    localStorage.removeItem('access-token');
    window.location.href = "/";
    
}