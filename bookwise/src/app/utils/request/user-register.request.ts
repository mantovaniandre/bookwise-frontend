export interface UserRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthday: string | null;
    usertype: string;
    gender: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    cardNumber: string;
    typeCard: string;
    flag: string;
    bank: string;
    countryBank: string;
    cardName: string;
    expiration: string;
    cvv: string;
}