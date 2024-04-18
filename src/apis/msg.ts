import { request } from '@/utils/request'
import type { ReqPage, ResPage } from '@/utils/request'

export interface MsgItem {
    id: string;
    robotId: string;
    chatId: string;
    content: string;
    createTime: string;
}

// 消息列表
export function getList(params: ReqPage) {
    return request<ResPage<MsgItem>>({
        url: '/user/robot/message/list',
        method: 'GET',
        params
    })
}
