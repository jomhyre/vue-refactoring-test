export const signup =  (email, password) => simulateNetwork(async () => {
    const database = loadDatabase()

    if (!email || !password || password.length < 6) {
        throw new Error("invalid credentials")
    }

    if (database.emailToUserId[email]) {
        throw new Error("email is taken")
    }

    const userId = generateRandomId(12)
    database.emailToUserId[email] = userId
    database.userIdToPassword[userId] = password
    saveDatabase(database)

    return {
        userId,
        email,
        status: null
    }
});

export const login = (email, password) => simulateNetwork(async () => {
    const database = loadDatabase()

    if (!email || !password) {
        throw new Error("invalid credentials");
    }

    const userId = database.emailToUserId[email];

    if (!userId) {
        throw new Error("invalid credentials")
    }

    const savedPassword = database.userIdToPassword[userId]

    if (savedPassword !== password) {
        throw new Error("invalid credentials")
    }

    return {
        userId,
        email,
        status: database.userIdToStatus[userId]
    }
});

export const updateUserStatus = (userId, status) => simulateNetwork(async () => {
    const database = loadDatabase()

    if (!userId.trim()) {
        throw new Error("no such user")
    }

    status = status?.trim()
    if (status) {
        database.userIdToStatus[userId] = status
        saveDatabase(database)
        return {userId, status}
    } else {
        throw new Error("status cannot be empty");
    }
});

function simulateNetwork(cb, delay = 500) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                resolve(await cb())
            } catch (error) {
                reject(error);
            }
        }, delay)
    })
}

function generateRandomId(length) {
    // Character set excluding similar looking characters:
    // Excludes: 0, O, I, l, and 1.
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}


function saveDatabase(database) {
    localStorage.setItem('database', JSON.stringify(database))
}

function loadDatabase() {
    const stored = localStorage.getItem('database')

    if (stored) {
        return JSON.parse(stored)
    }
    else {
        return {
            userIdToStatus: {},
            emailToUserId:{},
            userIdToPassword: {}
        }
    }
}