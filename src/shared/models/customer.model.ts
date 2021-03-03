export class Customer {
    constructor(
        public addressLine1: string = "",
        public addressLine2: string = "",
        public city: string = "",
        public contactFirstName: string = "",
        public contactLastName: string = "",
        public country: string = "",
        public creditLimit: number = 0,
        public customerName: string = "",
        public customerNumber: number = 0,
        public orders: any[] = [],
        public payments: any[] = [],
        public phone: string = "",
        public postalCode: string = "",
        public salesRepEmployeeNumber: number = 0,
        public salesRepEmployeeNumberNavigation: any = null,
        public state: string = null
    ) {

    }
}