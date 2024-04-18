import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'

// 后端返回格式接口
export type Result<T> = {
    statusCode: 200 | 401 | 500;
    message: string;
    data: T
}

// 分页请求
export interface ReqPage {
    pageNum: number;
    pageSize: number;
}

// 分页响应 
export interface ResPage<T> {
    rows: T[];
    total: number;
}

export const service = axios.create({
    baseURL: import.meta.env.VITE_APP_URL_BASE,
    timeout: 15000
})

service.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();

        if (authStore.token) {
            config.headers['Authorization'] = 'Bearer ' + authStore.token;
        }

        return config;
    }
)

export const hintRef: { value?: ReturnType<typeof useHint> } = {};
export const messageRef: { value?: ReturnType<typeof useMessage> } = {};
export async function request<T>(config: AxiosRequestConfig): Promise<Result<T>> {
    try {
        const response = await service.request(config);
        const data = response.data as Result<T>;
        const authStore = useAuthStore();

        if (data.statusCode === 200) return data;

        if (data.statusCode === 401) {
            hintRef.value?.create(authStore.logout, {
                type: 'warning',
                title: '警告',
                content: data.message
            })
        } else {
            messageRef.value?.error(data.message);
        }
        throw new AxiosError(data.message, String(data.statusCode))
    } catch (err) {
        throw err;
    }
}