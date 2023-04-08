import {post, get} from '../util/service.js'

export const login = data => {
    return post({
        url: '/login',
        data
    })
}

export const searchUser = data => {
    return get({
        url: '/userManage/searchUser',
        data
    })
}

export const searchIll = data => {
    return get({
        url: '/illManage/illSearch',
        data
    })
}

export const updateUser = data => {
    return post({
        url: '/userManage/changeUsername',
        data
    })
}

export const addIll = data => {
    return post({
        url: '/illManage/illAdd',
        data
    })
}

export const removeIll = data => {
    return post({
        url: '/illManage/illRemove',
        data
    })
}

export const updateIll = data => {
    return post({
        url: '/illManage/illModify',
        data
    })
}

export const getFileIds = data => {
    return get({
        url: '/illManage/getFileIDs',
        data
    })
}

export const fetchFile = data => {
    return get({
        url: '/illManage/getFile',
        data
    })
}