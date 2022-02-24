class User {
    id?: string
    username: string
    password: string
    is_admin: boolean
    created_at: Date

    private constructor(user: User) {
        return Object.assign(this, {
            username: user.username,
            password: user.password,
            is_admin: user.is_admin,
            created_at: user.created_at,
        })
    }

    static create(userInfo: User) {
        const user = new User(userInfo)

        return user
    }
}

export { User }
