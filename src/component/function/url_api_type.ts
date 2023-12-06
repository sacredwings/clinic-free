export interface interfaceUserGetById {
    ids: string[]
}
export interface interfaceUserEdit {
    id: string

    first_name: string
    last_name: string
    second_name: string

    man: '1' | '0'

    date_birth: Date,

    phone: number
}
export interface interfaceUserAccess {
    id: string

    specialist_ids: string[]
    research_ids: string[]
}
export interface interfaceWorkerGetById {
    ids: string[]
}
export interface interfaceSpecialistAdd {
    ids: string[]
}
export interface interfaceSpecialistEdit {
    id: string
    name: string
}
export interface interfaceSpecialistDelete {
    id: string
}
export interface interfaceSpecialistGet {
    offset: number
    count: number
}
export interface interfaceSpecialistUpdateHf {
    module: 'hf' | 'ct'
    hf_id: string
    id: string
}

export interface interfaceResearchEdit {
    id: string
    name: string
}
export interface interfaceResearchDelete {
    id: string
}
export interface interfaceResearchGet {
    offset: number
    count: number
}
export interface interfaceResearchUpdateHf {
    module: 'hf' | 'ct'
    hf_id: string
    id: string
}