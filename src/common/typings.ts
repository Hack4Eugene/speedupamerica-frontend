declare type Submission = {
    latitude: number,
    longitude: number,
    accuracy: number,
    actual_down_speed: number,
    actual_upload_speed: number,
    testing_for: string,
    address: string,
    zip_code: string,
    provider: string,
    connected_with: string,
    monthly_price: string,
    provider_down_speed: number,
    rating: number,
    ping: number,
    hostname: string
};

export {Submission};
