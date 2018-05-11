
function date(val) {
    let time = new Date() - new Date(val).getTime(),
        m = time / 1000 / 60,
        h = m / 60,
        day = h / 24,
        mon = day / 30,
        y = mon / 12;
    if(y<1){
        if (mon < 1) {
            if (day < 1) {
                if (h < 1) {
                    return parseInt(m) + '分钟前';
                    if(m<1){
                        return '刚刚'
                    }
                }
                return parseInt(h) + '小时前';
            }
            return parseInt(day) + '天前';
        }
        return parseInt(mon) + '月前';
    }
    return parseInt(y) + '年前';
}

function toLocaleDate(val) {
    return (new Date(val).toLocaleDateString())
}

export {
    date,
    toLocaleDate
}