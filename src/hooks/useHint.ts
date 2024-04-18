import type { DialogOptions } from 'naive-ui'

interface Options {
    type?: DialogOptions['type'],
    title?: string,
    content?: string,
}

export default function useHint() {
    const dialog = useDialog();

    function create<T>(fn: () => Promise<T> | T, opts?: Options) {
        return new Promise<T>((resilve, reject) => {
            const d = dialog.create({
                positiveText: '确认',
                negativeText: '取消',
                maskClosable: false,
                ...opts,
                onPositiveClick: async () => {
                    try {
                        d.loading = true;
                        d.closable = false;
                        d.negativeText = '';

                        const res = await fn();

                        resilve(res);
                    } catch (err) {
                        d.loading = false;
                        d.closable = true;
                        d.negativeText = '取消';

                        reject(err);

                        return false;
                    }
                },
                onNegativeClick: () => {
                    reject('hint cancel');
                },
                onClose: () => {
                    reject('hint cancel');
                }
            })

        })
    }

    function destroyAll() {
        return dialog.destroyAll();
    }

    return {
        destroyAll,
        create
    }
}