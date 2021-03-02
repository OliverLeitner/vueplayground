export class DNCWebApiService {
    _param: string = "";

    constructor(
        public host: string = "",
        public port: number = 0,
        public parameter: string = ""
    ) {
        this.param = parameter;
    }

    public set param(val: string) {
        this._param = val;
    }

    public get param(): string {
        return this._param;
    }

    public DncData() {
        return fetch(`${this.host}:${this.port}/api/GetAllItems?type=${this.param}`)
            .then((res) => res.json())
            .then((json) => {
                return json;
            });
    }
}