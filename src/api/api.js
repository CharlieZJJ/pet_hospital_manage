import { post, get } from '../util/service.js'

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
export const removeUser = data => {
    return post({
        url: '/userManage/removeUser',
        data
    })
}

export const changePassword = data => {
    return post({
        url: '/userManage/changePassword',
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
export const setUserType = data => {
    return post({
        url: '/userManage/setUserType',
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
        url: '/illManage/getFileList',
        data
    })
}

export const fetchFile = data => {
    return get({
        url: '/illManage/getFile',
        data
    })
}

export const uploadFile = data => {
    return post({
        url: '/illManage/AddFile',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}


export const searchPaper = data =>{
    return post({
        url: '/api/examination/paper/page',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const addPaper = data => {
    return post({
        url: '/api/examination/paper/create',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const removePaper = data => {
    return post({
        url: '/api/examination/paper/batchDelete',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const updatePaper = data => {
    return post({
        url: '/api/examination/paper/update',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const deleteFile = data => {
    return post({
        url: '/illManage/DeleteFile',
        data
    })
}

export const searchQuestion = data => {
    return post({
        url: '/api/examination/question/page',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const addQuestion = data => {
    return post({
        url: '/api/examination/question/create',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const updateQuestion = data => {
    return post({
        url: '/api/examination/question/update',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const removeQuestion = data => {
    return post({
        url: '/api/examination/question/batchDelete',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
