export namespace client {
	
	export class IResponse {
	    body?: string;
	    message?: string;
	    error?: any;
	
	    static createFrom(source: any = {}) {
	        return new IResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.body = source["body"];
	        this.message = source["message"];
	        this.error = source["error"];
	    }
	}

}

export namespace enums {
	
	export enum ELabel {
	    Medium = "Medium",
	    High = "High",
	    Danger = "Danger",
	}

}

