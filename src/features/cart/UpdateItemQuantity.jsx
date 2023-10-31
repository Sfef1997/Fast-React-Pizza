import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decraseItemQuantity, increaseItemQuantity } from "./CartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decraseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span> {currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
