<template>
    <div class="flex-(~ col 1) bg-white relative">
        <!-- 头部信息 -->
        <div class="sticky top-0 bg-white">
            <div class="h-60">
                <!-- 头像 -->
                <div class="h-full flex items-center justify-center gap-10 mx-10">
                    <div class="w-40 h-40 rd-full b-(2 solid gray) overflow-hidden">
                        <img :src="robotInfo?.crobots.avatar" alt="avatar" class="w-full h-full object-cover" />
                    </div>
                    <div>{{ robotInfo?.crobots.name }}</div>
                </div>
            </div>
        </div>

        <div
            class="flex-(~ 1 col) overflow-hidden mx-0 md:mx-20 mb-0 md:mb-20 bg-gradient-to-t from-#edeffa to-#f5f8fe">
            <!-- 聊天信息列表 -->
            <div class="flex-1 overflow-hidden px-20 md:px-60 py-20">
                <div class="overflow-y-auto max-h-full" ref="scrollElRef">
                    <ChatMsgBubble v-for="item of historyList " :from="item.role" :show-tools="item.role == 'robot'"
                        :state="item.state" :content="item.content"
                        @update-state="state => updateLikeState(item.id, state)" />
                    <ChatMsgBubble v-for=" item of chatList " :from="item.role" :content="item.content" />
                    <ChatMsgBubble from="robot" v-if="typing">
                        <span v-html="robotTypeText"></span>
                        <span class="px-2 bg-gray ml-4"></span>
                    </ChatMsgBubble>
                </div>
            </div>

            <!-- 底部 -->
            <div class="sticky bottom-0 py-30">
                <div class="px-20 md:px-60">
                    <!-- 聊天框 -->
                    <div
                        class="flex items-center gap-2 px-12 py-10 rd-8 bg-white shadow shadow-#2a78ff shadow-op-10 shadow-lg">
                        <input type="text" class="b-none outline-none bg-none text-16 flex-1 bg-white disabled:bg-white"
                            ref="messageInputRef" v-model="userInputMessage" placeholder="请输入你的问题" />
                        <button
                            class="w-30 cursor-pointer b-none outline-none bg-none shadow-none flex bg-#2a77fe w-40 justify-center items-center h-30 rd-full"
                            @click="chat">
                            <div class="i-carbon:send-alt-filled text-white text-20"></div>
                        </button>
                    </div>
                </div>
                <!-- 版权信息 -->
                <div class="flex items-center justify-center mt-20">
                    <img src="@/assets/bty-logo.png" class="h-16 md:h-24" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as robotApi from '@/apis/robot'
import { NdJson } from "json-nd"
import { ofetch } from "ofetch"

function useRobotInfo() {
    const route = useRoute();
    const robotId = route.query.robotId as string;

    const model = ref<robotApi.RobotInfo>();
    useRequest(
        () => robotApi.getInfo(robotId),
        {
            onSuccess({ data }) {
                model.value = data;
            }
        }
    );

    return [
        model
    ] as const;
}

function useHistoryChat() {
    const route = useRoute();
    const robotId = route.query.robotId as string;

    const list = ref<any[]>([]);
    const { run } = useRequest(
        () => robotApi.getChatHistoryList(robotId),
        {
            onSuccess({ data }) {
                list.value = data.map(item => {
                    return [
                        { role: 'user', content: item.question, id: item.id },
                        { role: 'robot', content: item.answer, state: item.state, id: item.id }
                    ]
                }).flat(1) ?? [];
            }
        }
    );

    return [
        list,
        run
    ] as const;
}

function useLikeState(cb?: () => void) {
    const { run } = useRequest(
        (id: string, state: string) => robotApi.updateChatLikeSate(id, state),
        {
            manual: true,
            onSuccess() {
                cb?.();
            }
        }
    );

    return [
        run
    ] as const;
}

function useChat(cb?: () => void) {
    const route = useRoute();
    const robotId = route.query.robotId as string;

    const list = ref<any[]>([]);
    const inputMessage = ref('');
    const typing = ref(false);
    const robotTypeText = ref('');
    const message = useMessage();
    const authStore = useAuthStore();

    const { run: saveChat } = useRequest(
        (inputMsg: string, answer: string) => robotApi.saveChat({ robotId, question: inputMsg, answer }),
        {
            manual: true,
            onSuccess() {
                list.value = [];
                cb?.();
            }
        }
    )

    const sendChatTalkStream = async (inputMessage: string) => {
        const url = '/api/knowledge/bank/talk';
        const resp = await ofetch(url, {
            method: 'post',
            headers: {
                'Authorization': 'Bearer ' + authStore.token,
                'Accept': 'text/event-stream; charset=utf-8'
            },
            onRequest(ctx) {
                ctx.options.body = {
                    query: inputMessage,
                    robotId: robotId
                }
            },
            responseType: 'stream'
        })

        const reader = resp.pipeThrough(
            new TextDecoderStream()
        ).getReader()

        return reader
    }

    const handleSend = async () => {
        if (!userInputMessage.value) {
            return
        }

        typing.value = true
        robotTypeText.value = ''

        const inputMessage = userInputMessage.value
        userInputMessage.value = ''

        chatList.value.push({
            role: 'user',
            content: inputMessage
        })

        const reader = await sendChatTalkStream(inputMessage)

        let streamCount = 0

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                if (streamCount == 0) {
                    message.error('聊天时发生错误，请联系管理员')
                    console.error(`流返回0长度`)
                    return
                }
                break
            }

            streamCount++

            if (value.includes("\"docs\":")) {
                console.log("文档不完整的情况")
                break
            }

            try {
                const json = NdJson.parse<{
                    code?: string
                    answer?: string
                    msg?: string
                    docs?: string
                }>(value.replace(/\n+/g, '\n')).reduce((prev, next) => {
                    if (prev.code || prev.docs) {
                        return prev
                    }
                    if (prev.answer) {
                        prev.answer += next.answer
                    }
                    console.log('reduce answer:', prev)
                    return prev
                })
                if (json.code) {
                    message.error(json.msg ?? '聊天时发生错误，请联系管理员')
                    console.error(`${json.code}:${json.msg}`)
                    typing.value = false
                    // await updateAllList()
                    return
                }

                if (json.docs) {
                    break
                }
                if (json.answer) {
                    robotTypeText.value += String(json.answer).replace(/\n/g, '<br/>')
                    console.log('update answer:', robotTypeText.value)
                }
            } catch (e) {
                console.error(e)
                console.log('valid json:', value)
                break
            }
        }

        typing.value = false

        const answer = robotTypeText.value

        chatList.value.push({
            role: 'robot',
            content: answer,
            state: '0'
        })

        robotTypeText.value = ''

        saveChat(inputMessage, answer);
    }

    return [
        list,
        inputMessage,
        typing,
        robotTypeText,
        handleSend
    ] as const;
}

const [
    robotInfo
] = useRobotInfo();

const [
    historyList,
    getHistoryList
] = useHistoryChat();

const [
    updateLikeState
] = useLikeState(getHistoryList);

const [
    chatList,
    userInputMessage,
    typing,
    robotTypeText,
    chat
] = useChat(getHistoryList);
</script>

<style scoped></style>