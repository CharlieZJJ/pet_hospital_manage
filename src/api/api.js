import {post, get} from '../util/service.js'

export const login = data => {
    return post({
        url: '/login',
        data
    })
}