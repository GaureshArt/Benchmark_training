import { Link } from "react-router-dom";
import { Menubar, MenubarMenu, MenubarTrigger } from "../ui/menubar";

export const Navbar = () => {
  return (
    <>
      <div className="w-full m-5  flex justify-center" >
        <Menubar className="text-xl h-10 w-1/3 flex justify-evenly font-serif tracking-wider">
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer" asChild><Link to={'/'}>Home</Link></MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer" asChild><Link to={'/products'}>Products</Link></MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer"><Link to={'/Cart'}>Cart</Link></MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer"><Link to={'/User'}>User</Link></MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
};
