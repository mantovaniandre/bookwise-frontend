export interface CreditCardNumberResponse {
    scheme: string;
    type: string;
    brand: string;
    country: {
        name: string;
        currency: string;
    },
    bank: {
        name:string;
    }
}