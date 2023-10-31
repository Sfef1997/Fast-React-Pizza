// import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
// import { createOrder } from "../../services/apiRestaurant";
// import Button from "../../ui/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
// import EmptyCart from "../cart/EmptyCart";
// import store from "../../store";
// import { formatCurrency } from "../../utility/helpers";
// import { fetchAddress } from "../user/userSlice";
// import { useState } from "react";
// // https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str,
//   );

// function CreateOrder() {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const isSubmitting = navigation.state === "submitting";
//   const [withPriority, setWithPriority] = useState(false);

//   const formErrors = useActionData();

//   const cart = useSelector(getCart);
//   const totalCartPrice = useSelector(getTotalCartPrice);

//   // if (withPriority) {
//   //   priortyPrice = totalCartPrice * 0.2;
//   // } else {
//   //   priortyPrice = 0; // or any default value you want if withPriority is false
//   // }
//   const priortyPrice = withPriority ? totalCartPrice * 0.2 : 0;
//   const totalPrice = totalCartPrice + priortyPrice;

//   if (!cart.length) return <EmptyCart />;

//   const {
//     username,
//     status: addresseStatus,
//     position,
//     address,
//     error: errorAddress,
//   } = useSelector((state) => state.user);
//   const isLoadingAddress = addresseStatus === "loading";

//   return (
//     <div className="px-4 py-6">
//       <h2 className="text-xl semibold mb-8 ">Ready to order? Let's go!</h2>

//       <Form method="POST" action="">
//         <div className="mb-5 flex gap-5 flex-col sm:flex-row sm:items-center">
//           <label className="sm:base-40">First Name</label>
//           <input
//             type="text"
//             name="customer"
//             defaultValue={username}
//             required
//             className="input grow"
//           />
//         </div>

//         <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
//           <label className="sm:base-40">Phone number</label>
//           <div className="grow">
//             <input type="tel" name="phone" required className="input  w-full" />
//             {formErrors?.phone && (
//               <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
//                 {formErrors.phone}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="mb-5 flex gap-12 flex-col sm:flex-row sm:items-center relative">
//           <label className="sm:base-40">Address</label>
//           <div className="grow">
//             <input
//               type="text"
//               name="address"
//               disabled={isLoadingAddress}
//               defaultValue={address}
//               required
//               className="input  w-full"
//             />

//             {addresseStatus === "error" && (
//               <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
//                 {errorAddress} errorasd
//               </p>
//             )}
//           </div>
//           {!position?.latitude && !position?.longitude && (
//             <span
//               className="absolute right-[3px]  z-50 top-[3px]
//              md:right-[5px] sm:top-[5px]"
//             >
//               <Button
//                 type="small"
//                 disabled={isLoadingAddress}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   dispatch(fetchAddress());
//                 }}
//               >
//                 Get Position
//               </Button>
//             </span>
//           )}
//         </div>

//         <div className="mb-12  flex gap-5 items-center">
//           <input
//             className="h-6 w-6  accent-yellow-400  focus:ring focus:ring-yellow-400  focus:ring-offset-2"
//             type="checkbox"
//             name="priority"
//             id="priority"
//             value={withPriority}
//             onChange={(e) => setWithPriority(e.target.checked)}
//           />
//           <label htmlFor="priority" className="font-medium">
//             Want to yo give your order priority?
//           </label>
//         </div>

//         <div>
//           <input type="hidden" name="cart" value={JSON.stringify(cart)} />
//           <Button
//             disabled={isSubmitting || isLoadingAddress}
//             type="primary"
//             className=""
//           >
//             {isSubmitting
//               ? "placing Order"
//               : `Order Now for ${formatCurrency(totalPrice)}`}
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }
// export async function action({ request }) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log(data);

//   const order = {
//     ...data,
//     cart: JSON.parse(data.cart),
//     priority: data.priority === "true",
//   };
//   const errors = {};
//   if (!isValidPhone(order.phone))
//     errors.phone =
//       "Pleace Give Us Your Coorect Phone Number . we night to Need it.";
//   if (Object.keys(errors).length > 0) return errors;
//   //  if Everthing is Okay Create New Order and redirect
//   const newOrder = await createOrder(order);
//   // me made that Because We Can not import Dispactch Function in Regulaer Function its Work only With the Regular Componenets
//   store.dispatch(clearCart());
//   return redirect(`/order/${newOrder.id}`);
//   // return null;
// }
// export default CreateOrder;

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import store from "../../store";
import { formatCurrency } from "../../utility/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position?.latitude && !position?.longitude && (
            <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.longitude && position?.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
