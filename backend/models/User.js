function createUserDocument({ name, email, passwordHash }) {
    return {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        passwordHash,
        createdAt: new Date()
    };
}

module.exports = { createUserDocument };