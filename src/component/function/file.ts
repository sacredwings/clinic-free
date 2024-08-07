// @ts-nocheck
import {forEachBail} from "enhanced-resolve";

export function FileType (file) {
    let type = null

    if  ((file.type === 'video/mp4')) {
        type = 'video'
    }

    if  (
        (file.type === 'image/gif') ||
        (file.type === 'image/png') ||
        (file.type === 'image/jpeg')
    ) {
        type = 'img'
    }

    if  (
        (file.type === 'application/msword') ||
        (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
        (file.type === 'application/vnd.ms-excel') ||
        (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
        (file.type === 'application/pdf') ||
        (file.type === 'text/plain')
    ) {
        type = 'doc'
    }


    return type
}

export function FileDistribution (arFiles) {
    let defaultValue = {
        video_ids: [],
        img_ids: [],
        doc_ids: [],

        _video_ids: [],
        _img_ids: [],
        _doc_ids: [],
    }

    arFiles.forEach((item, i)=>{
        if  ((item.type === 'video/mp4')) {
            defaultValue.video_ids.push(item._id)
            defaultValue._video_ids.push(item)
        }

        if  (
            (item.type === 'image/gif') ||
            (item.type === 'image/png') ||
            (item.type === 'image/jpeg')
        ) {
            defaultValue.img_ids.push(item._id)
            defaultValue._img_ids.push(item)
        }

        if  (
            (item.type === 'application/msword') ||
            (item.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
            (item.type === 'application/vnd.ms-excel') ||
            (item.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
            (item.type === 'application/pdf') ||
            (item.type === 'text/plain')
        ) {
            defaultValue.doc_ids.push(item._id)
            defaultValue._doc_ids.push(item)
        }
    })

    return defaultValue
}