import Image from "next/image";
import CheckoutForm from "./checkout-form";
import CartModal from "@/components/ui/cart-modal";
import LocalizedLink from "@/components/layout/LocalizedLink";
// import { cookies } from "next/headers";

// Mock data for server-side rendering
const getCartItems = () => {
  // In a real app, you would fetch this from a database or API
  // based on the user's session or cart ID stored in cookies
  return [
    {
      id: "1",
      name: "Lab Grown Diamond Solitaire Ring",
      price: 29800,
      originalPrice: 39900,
      image: "https://example.com/image1.jpg",
      quantity: 1,
      metalType: "14K Gold",
      diamondSize: "1.00 CT",
      ringSize: "6",
      isLabGrown: true,
    },
  ];
};

const calculateSubtotal = (items: any[]) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default function CheckoutPage() {
  // Server-side data fetching
  const items = getCartItems();
  const subtotal = calculateSubtotal(items);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <LocalizedLink href="/">
            <Image
              src="/logo.png"
              alt="SHRISHIV"
              width={150}
              height={30}
              className="h-[30px] w-[150px] object-cover"
              priority
            />
          </LocalizedLink>
        </div>

        {/* Client component with all interactive elements */}
        <CheckoutForm initialSubtotal={subtotal} />

        {/* Cart Modal - Client Component */}
        <CartModal />
      </div>
    </div>
  );
}
