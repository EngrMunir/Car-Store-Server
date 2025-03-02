export type TCartItem = {
    carId: string;
    userEmail: string;
    quantity: number;
  };
  
  export type TCart = {
    userEmail: string;
    items: TCartItem[];
  };