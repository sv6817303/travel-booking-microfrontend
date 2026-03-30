// Mock database
const users = [];

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Simple mock validation
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};

exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password // In a real app, hash this!
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
};
