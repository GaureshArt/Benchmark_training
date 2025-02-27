import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useCartStore } from "@/store/useCartStore"
import {  useState } from "react"

type DialogDemoPropType = {
quantity:number;
prodId:number;
setQuantity: React.Dispatch<React.SetStateAction<number>>

}
export function DialogDemo( {quantity,setQuantity,prodId}:DialogDemoPropType) {
    const [open, setOpen] = useState(false);
    
    const updateCartProduct = useCartStore((state)=>state.updateCartProduct);
    const handleQuantityChange = (e:React.MouseEvent<HTMLButtonElement>)=>{
        
        const targetOp = e.target as HTMLElement
        if(targetOp.innerHTML==='-' && quantity>1){
            setQuantity((prev)=>prev-1);
        }
        if(targetOp.innerHTML==='+'){
            setQuantity((prev)=>prev+1);
        }
    }
    const handleSubmitChanges = ()=>{
        updateCartProduct({productId:prodId,quantity:quantity});
        setOpen(false);
    }
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Quantity</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Quantity</DialogTitle>
            <DialogDescription>
            Use given button to change quantity value.
            </DialogDescription>
          </DialogHeader>
          <div className=" gap-8 py-4 flex justify-center items-center">
            <Button onClick={handleQuantityChange} >-</Button>
            <span className="text-3xl font-serif">{quantity}</span>
            <Button onClick={handleQuantityChange}>+</Button>

          </div>
          <DialogFooter>
            <Button onClick={handleSubmitChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }