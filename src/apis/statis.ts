import { request } from '@/utils/request'
import type { ReqPage, ResPage } from '@/utils/request'

export interface OverallData {
    availableCount: number;
    dislikeCount: number;
    likeCount: number;
    totalQuestionCount: number;
    usageCount: number;
}

export interface AskTrendDayData {
    date: string;
    questionCount: number;
}

export interface AskTrendYearData {
    month: string;
    questionCount: number;
}

export interface RecordListParams extends ReqPage {
    robotId: string;
    searchType: string;
}

export interface RecordItem {
    answer: string;
    question: string;
}

export function getOverallData(robotId: string) {
    return request<OverallData>({
        url: '/user/analysis/overall_overview',
        method: 'GET',
        params: {
            robotId
        }
    })
}

export function getAskTrendDaysData(robotId: string) {
    return request<AskTrendDayData[]>({
        url: '/user/analysis/14_day_question_trend',
        method: 'GET',
        params: {
            robotId
        }
    })
}

export function getAskTrendYearData(robotId: string) {
    return request<AskTrendYearData[]>({
        url: '/user/analysis/1_year_question_trend',
        method: 'GET',
        params: {
            robotId
        }
    })
}

export function getRecordList(params: RecordListParams) {
    return request<ResPage<RecordItem>>({
        url: '/user/analysis/latest_records',
        method: 'GET',
        params
    })
}