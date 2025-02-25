
import { useNavigate } from 'react-router-dom'

export const Role = () => {
    const navigate = useNavigate();
  return (
    <>
    <div className='flex  justify-center items-center h-screen'>
        <div className='w-1/3 h-1/3 border rounded-2xl flex justify-center items-center gap-10'>
        <button onClick={()=>navigate('/login?role=admin')} className='w-24 h-10 border p-2 rounded-xl bg-stone-900 text-stone-50 cursor-pointer'>Admin</button>
        <button onClick={()=>navigate('/login?role=user')} className='w-24 h-10 border p-2 rounded-xl bg-stone-900 text-stone-50 cursor-pointer'>User</button>
        </div>
    </div>
    </>
  )
}
