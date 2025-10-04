import rateLimit from 'express-rate-limit';

// 5 request per 15 min
export const signupLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: {message: "Too many signup attempts from this IP, please try again later."},
})

// 5 login attempts per 10 minutes
export const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 5,
    message: {message: "Too many login attempts from this IP, please try again later."},
});