export async function loginApi(email, password) {
    // Emulate a network delay and a successful login if both fields are provided.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email && password) {
                resolve({ email });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 500);
    });
}

export async function updateStatusApi(status) {
    // Emulate a network delay and a successful status update.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status && status.trim()) {
                resolve({ status });
            } else {
                reject(new Error("Status cannot be empty"));
            }
        }, 500);
    });
}
