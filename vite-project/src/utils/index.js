// 存储数据
export function localSet (key, value) {
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

// 单张图片上传
export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'

// 多张图片上传
export const uploadImgsServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'

export const pathMap = {
    login: '登录',
    home: '首页',
    introduce: '数据大屏',
    add: '添加商品',
    swiper: '轮播图配置',
    hot: '热销商品配置',
    new: '新品上线配置',
    recommend: '为你推荐配置',
    category: '分类管理',
    level2: '分类二级管理',
    level3: '分类三级管理',
    good: '商品管理',
    guest: '会员管理',
    order: '订单管理',
    order_detail: '订单详情',
    account: '修改账户'
}

