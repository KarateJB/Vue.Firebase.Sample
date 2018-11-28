export class Order {
    constructor(id,customer, items, status) {
        let date = new Date();
        this.id = id;
        this.customer = customer;
        this.date = date.toLocaleDateString().concat(' ', date.toLocaleTimeString());
        this.items = items;
        this.status = status;
    }
}
