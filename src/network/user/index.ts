import request from "@/network/request"

export function toLogin(args: any) {
    return request({
        url: "/user/login",
        method: "post",
        data: {
            ...args
        }
    })
}


export function toRegister(args: any) {
    return request({
        url: "/user/register",
        method: "post",
        data: {
            ...args
        }
    })
}