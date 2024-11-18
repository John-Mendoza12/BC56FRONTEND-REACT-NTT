import { IAuthBody } from "../interfaces/IAuth";


const auth= async (authBody:IAuthBody)=>{
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
         authBody),
      })
   return response

}
export const authService={
auth
}