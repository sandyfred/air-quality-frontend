export class Subscriber {
    constructor(
        public id: string,
        public username: string,
        public subscriptionPlan: string,
        public subscriptionDate: Date,
        public subscriptionValidity: string
    ) {}
}