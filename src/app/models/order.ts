import { Customer } from "./customer";
import { OrderLine } from "./order-line";

export class Order {
    idOrder: string;
    customer: Customer;
    orderLines: OrderLine[] = new Array();
    total: number;
}
