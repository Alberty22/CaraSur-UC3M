function setCookie(name, value, days) {
    let expires = ""
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function saveUserCookies({ name, email, role,  rememberMe }) {
    let days = rememberMe ? 30 : 1;
    setCookie("name", name, days);
    setCookie("email", email, days);
    setCookie("role", role, days);
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function clearUserCookies() {
    deleteCookie("name");
    deleteCookie("email");
    deleteCookie("role");
}

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}


export function checkCookies() {
    const name = getCookie("name");
    const email = getCookie("email");
    return name && email;
}

export function checkRole() {
    const role = getCookie("role");
    
    return role === 'admin' ? true : false;
}

export async function updateCookie(name, value) {
    let cookieValue = getCookie(name);
    if (!cookieValue) {
        return;
    }

    let cookieParts = cookieValue.split(';');
    let currentExpires = "";

    for (let part of cookieParts) {
        if (part.trim().startsWith("expires=")) {
            currentExpires = part.trim();
            break;
        }
    }
    
    document.cookie = name + "=" + value + ";" + currentExpires + "; path=/";
}