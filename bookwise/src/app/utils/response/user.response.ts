export interface CreateUserResponse {
    message: string;
    status: string;
    content_type: string;
}

export interface ProfileUserResponse {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthday: string | null;
    user_type: string;
    gender: string;
    zip_code: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    card_number: string;
    type_card: string;
    flag: string;
    bank: string;
    country_bank: string;
    card_name: string;
    expiration: string;
    cvv: string;
}

export interface UpdateUserResponse {
    message: string;
    status: string;
    content_type: string;
}