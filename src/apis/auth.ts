import { request } from '@/utils/request'

export interface AuthLoginForm {
    username: string;
    password: string;
    grantType: string;
}

export interface AuthLoginRes {
    access_token: string;
}

export interface AuthRegisterForm {
    realName: string;
    jobNum: string;
}

export interface AuthRegisterRes {
    authStatus: boolean;
    resetPwdToken: string;
}

export interface AuthPwdSetForm {
    password: string;
    email?: string;
}

export interface AuthCode {
    uuid: string;
    img: string;
}

export interface AuthVerifyCodeForm {
    code: string;
    email: string;
    emailCode: string;
    uuid: string;
}

export interface AuthVerifyCodeRes {
    authStatus: boolean;
    resetPwdToken: string;
}

// 登录
export function login(form: AuthLoginForm) {
    return request<AuthLoginRes>({
        url: '/auth/login',
        method: 'POST',
        data: form
    })
}

// 注册
export function register(form: AuthRegisterForm) {
    return request<AuthRegisterRes>({
        url: '/auth/user_auth',
        method: 'POST',
        data: form
    })
}

// 设置密码
export function setPwd(token: string, form: AuthPwdSetForm) {
    return request<AuthLoginRes>({
        url: `/auth/reset_password/${token}`,
        method: 'PUT',
        data: form
    })
}

// 发送邮箱验证码
export function sendEmailCode(email: string) {
    return request<void>({
        url: '/resource/email/code',
        method: 'GET',
        params: {
            email
        }
    })
}

// 生成验证码
export function genCode() {
    return request<AuthCode>({
        url: '/auth/code',
        method: 'GET'
    })
}

// 验证验证码
export function verifyCode(form: AuthVerifyCodeForm) {
    return request<AuthVerifyCodeRes>({
        url: '/auth/verify_email',
        method: 'POST',
        data: form
    })
}
