
import cookie from "cookie";


export const createCookies = (res, token) => {
    const serializedCookie = cookie.serialize("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
    });
    res.setHeader("Set-Cookie", serializedCookie);
};
