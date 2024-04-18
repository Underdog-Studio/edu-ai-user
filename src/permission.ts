
import router from '@/router'
import type { useLoadingBar } from 'naive-ui'
import { RouteNamedMap } from 'vue-router/auto-routes';

export const loadingBarRef: { value?: ReturnType<typeof useLoadingBar> } = {};

// 白名单
const whitelist: (keyof RouteNamedMap)[] = ['/login', '/', '/register', '/pwdForget'];

router.beforeEach(async (to) => {
    const authStore = useAuthStore();
    const userStore = useUserStore();

    loadingBarRef.value?.start();

    if (authStore.token) {
        if (to.name === '/login') {
            return { name: '/' };
        }

        await userStore.getInfo();
        return true;

    } else {
        if (whitelist.includes(to.name)) {
            return true;
        }

        return { name: '/login' };
    }
})

router.afterEach(() => {
    loadingBarRef.value?.finish();
})