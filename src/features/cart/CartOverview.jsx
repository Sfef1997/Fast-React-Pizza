import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./CartSlice";
import { formatCurrency } from "../../utility/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div
      className="bg-stone-800 uppercase text-stone-200 
                px-4 py-4 sm:px-6 text-sm md:text-base flex items-center justify-between  "
    >
      <p className="font-semibold text-ston-300 space-x-3 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>$ {formatCurrency(totalCartPrice)} </span>
      </p>
      <Link className="" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
