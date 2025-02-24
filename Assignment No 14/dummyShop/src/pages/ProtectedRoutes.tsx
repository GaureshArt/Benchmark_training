
import { Outlet, useSearchParams } from 'react-router-dom';
import { NotFound } from '../components/NotFound';
// interface IProtectedRoutesProps{
//     isAuthenticated:boolean;
// }
export const ProtectedRoutes = () => {
    const [searchParams]  = useSearchParams();
    
  return (
        <>
        {
            searchParams.get('role')==='admin'?<Outlet/>:<NotFound/>
        }
        </>
  )
}
