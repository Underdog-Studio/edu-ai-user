import { request, service } from '@/utils/request'
import type { ReqPage, ResPage } from '@/utils/request'

export interface RobotListParams extends ReqPage {
    robotName?: string;
    searchType?: string;
}

export interface RobotItem {
    id: number;
    robotAvatar: string;
    robotManagers: string[];
    robotName: string;
}

export interface RobotInfo {
    crobots: {
        id: string
        avatar: string
        name: string
    }
}

export interface ChatHistoryEnetity {
    id: string
    robotId: string
    uid: string
    question: string
    answer: string
    anonymous: '0' | '1'
    createTime: string
    state?: '0' | '1' | '-1'
}

export interface ChatParams {
    query: string;
    robotId: string;
}

export interface ChatSaveParams {
    robotId: string;
    question: string;
    answer: string;
}

// 机器人列表
export function getList(params: RobotListParams) {
    return request<ResPage<RobotItem>>({
        url: '/user/robot/list',
        method: 'GET',
        params
    })
}

// 机器人详情
export function getInfo(robotId: string) {
    return request<RobotInfo>({
        url: '/robot',
        method: 'GET',
        params: {
            robotId
        }
    })
}

// 历史聊天记录
export function getChatHistoryList(robotId: string) {
    return request<ChatHistoryEnetity[]>({
        url: '/know/history',
        method: 'GET',
        params: {
            robotId
        }
    })
}

// 赞/踩
export function updateChatLikeSate(id: string, state: string) {
    return request({
        url: `/know/robot_like/${id}`,
        method: 'GET',
        params: {
            state
        }
    })
}

// 对话
export function chat(data: ChatParams) {
    return service({
        url: '/knowledge/bank/talk',
        method: 'POST',
        data,
        responseType: 'stream',
        headers: {
            'Accept': 'text/event-stream; charset=utf-8'
        }
    })
}

// 保存对话
export function saveChat(data: ChatSaveParams) {
    return request<any>({
        url: '/knowledge/bank/getChat',
        method: 'POST',
        data
    })
}




