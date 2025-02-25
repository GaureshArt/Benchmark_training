
import { Outlet, useSearchParams } from 'react-router-dom';
import { NotFound } from '../components/NotFound';

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
