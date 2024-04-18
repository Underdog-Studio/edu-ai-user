import * as authApi from '@/apis/auth'
import { BusinessError } from '@/utils/errors'
import { AuthToken } from '@/enums/auth'

export default defineStore('auth', () => {
    const [token, setToken] = useLocalStorageState<string>(AuthToken.Token);
    const [resetPwdToken, setResetPwdToken] = useSessionStorageState<string>(AuthToken.ResetPwdToken);
    const router = useRouter();

    async function login(form: authApi.AuthLoginForm) {
        const { data } = await authApi.login(form);
        setToken(data.access_token);
        router.replace('/');
    }

    async function register(form: authApi.AuthRegisterForm) {
        const { data } = await authApi.register(form);
        if (!data.authStatus) throw new BusinessError('未查询到该用户！');
        setResetPwdToken(data.resetPwdToken);
    }

    async function setPwd(form: authApi.AuthPwdSetForm) {
        if (!resetPwdToken.value) return;
        const { data } = await authApi.setPwd(resetPwdToken.value, form);
        setToken(data.access_token);
        setResetPwdToken(undefined);
        router.replace('/');
    }

    async function verifyCode(form: authApi.AuthVerifyCodeForm) {
        const { data } = await authApi.verifyCode(form);
        if (!data.authStatus) throw new BusinessError('图片验证码或邮箱验证码有误！');
        setResetPwdToken(data.resetPwdToken);
    }

    function logout() {
        setToken(undefined);
        router.replace('/login');
    }

    return {
        token,
        resetPwdToken,
        login,
        register,
        setPwd,
        verifyCode,
        logout
    }
})