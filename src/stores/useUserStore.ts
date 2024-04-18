import * as userApi from '@/apis/user'

export default defineStore('user', () => {
    const info = ref<userApi.UserInfo>();

    async function getInfo() {
        const { data } = await userApi.getInfo();
        info.value = data;
    }

    return {
        info,
        getInfo
    }
})