export const {
    EMAIL1, EMAIL2, PASSWORD
} = process.env


export type CredentialsConfig = {
    email1: string,
    email2: string,
    password: string
}

const credentialsConfig: CredentialsConfig = {
    email1: process.env.EMAIL1 ?? 'jh-interview-user@revation.com',
    email2: process.env.EMAIL2 ?? 'jh-interview-user2@revation.com',
    password: process.env.PASSWORD as string
}


export default credentialsConfig