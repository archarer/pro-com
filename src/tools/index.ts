export const throttle = (fn: Function, interval: number = 300) => {
    let prev = Date.now() - interval;
    return (...args: any[]) => {
        if (Date.now() - prev >= interval) {
            fn.apply(this, args);
            prev = Date.now();
        }
    }
}

export const debounce = (fn: Function, interval: number = 1000) => {
    let timer: any = null;
    return (...args: any[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, interval)
    }
}