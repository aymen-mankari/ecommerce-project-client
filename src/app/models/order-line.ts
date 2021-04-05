import { Order } from "./order";
import { Product } from "./product";

export class OrderLine {
    id: string;
    quantity: number;
    order: Order;
    product: Product;
}
