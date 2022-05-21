// 存储数据
export function localSet (key) {
    /** JSON.stringify 将js值转换为json字符串 */
    window.localStorage.setItem(key, JSON.stringify(value))
}

// 读取数据
export function localGet (key) {
    const value = window.localStorage.getItem(key)
    try {
        /** JSON.parse 将数据转换为js对象 */
        return JSON.parse(window.localStorage.getItem(key))
    } catch (error) {
        return value
    }
}

// 清除数据
export function localRemove (key) {
    window.localStorage.removeItem(key)
}

