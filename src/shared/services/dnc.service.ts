import {Customer} from "@/shared/models/customer.model"

export class DNCWebApiService {

    constructor(
        public host: string = "",
        public port: number = 0,
        public parameter: string = ""
    ) {
    }

    public async DncData(): Promise<Customer[]> {
        return await fetch(`${this.host}:${this.port}/api/GetAllItems?type=${this.parameter}`)
            .then((res) => res.json())
            .then((json) => {
                return <Customer[]>json;
            });
    }
}