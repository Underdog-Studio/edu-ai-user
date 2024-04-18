import { request } from '@/utils/request'

export interface UserInfo {
    className: string;
    email: string;
    jobNum: null;
    phone: string;
    realName: string;
    userId: string;
}

export interface UserInfoUpdateForm {
    email?: string;
    phone?: string;
    password?: string;
}

// 获取用户详情
export function getInfo() {
    return request<UserInfo>({
        url: '/user/info',
        method: 'GET'
    })
}

// 修改用户信息
export function updateInfo(form: UserInfoUpdateForm) {
    return request<void>({
        url: '/user/info',
        method: 'PUT',
        data: form
    })
}