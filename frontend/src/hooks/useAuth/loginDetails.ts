
interface LoginDetails {
    password: string
}

export const LOGIN_DETAILS: {[Key: string]: LoginDetails} = {
   "user1": {
        "password": "myPassword"
    },
    "user2": {
        "password": "yourPassword"
    } 
}
