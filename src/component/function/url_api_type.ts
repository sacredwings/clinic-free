export interface interfaceVideoGet {
    offset: number
    count: number
    user_id?: string
    group_id?: string
    album_id?: string
    q?: string
}
export interface interfaceAlbumGet {
    module: 'video' | 'article' | 'topic'
    offset: number
    count: number
    user_id?: string
    group_id?: string
    album_id?: string
    q?: string
}

export interface interfaceArticleGet {
    offset: number
    count: number
    user_id?: string
    group_id?: string
    album_id?: string
    q?: string
}

export interface interfaceTopicGet {
    offset: number
    count: number
    user_id?: string
    group_id?: string
    album_id?: string
    q?: string
}
