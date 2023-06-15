import { v4 as uuidv4 } from 'uuid';
//函数功能：要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
    //先从本地存储获取uuid(看一下本地存储中是否有uuid)
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if (!uuid_token) {
        //则生成游客临时身份
        uuid_token = uuidv4();
        //同时本地存储存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    //切记有返回值，如果没有返回值，则会返回undefined
    return uuid_token;
}