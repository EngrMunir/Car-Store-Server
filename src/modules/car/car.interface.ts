
export type Car = {
    brand: string;
    model: string;
    year: number;
    price: number;
    category:"Sedan" | "SUV"| "Truck" | "Coupe"| "Convertible";
    description:string;
    image:string;
    quantity:number;
    inStock:boolean;
  }