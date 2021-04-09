import { Order } from "./order";
import { Product } from "./product";

export class OrderLine {
    id: string;
    quantity: number = 0;
    order: Order;
    product: Product;
}
