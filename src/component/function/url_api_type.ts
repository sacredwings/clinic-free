import {ServerOrgEdit, ServerOrgGet} from "@/component/function/url_api";

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
//---------------------------------------------------------------------------------
//HF
export interface interfaceHfAdd {
    name: string
    code: string
}
export interface interfaceHfEdit {
    id: string
    name: string
    code: string
}
export interface interfaceHfGet {
    offset: number
    count: number
}
export interface interfaceHfGetById {
    ids: string[]
}
//---------------------------------------------------------------------------------
//ORG
export interface interfaceOrgAdd {
    name: string
}
export interface interfaceOrgEdit {
    id: string
    name: string
}
export interface interfaceOrgGet {
    offset: number
    count: number
}
export interface interfaceOrgGetById {
    ids: string[]
}
//---------------------------------------------------------------------------------
//CONTRACT
export interface interfaceContractAdd {
    name: string
}
export interface interfaceContractEdit {
    id: string
    name: string
}
export interface interfaceContractGet {
    org_id: string
    offset: number
    count: number
}
export interface interfaceContractGetById {
    ids: string[]
}
//---------------------------------------------------------------------------------
//WORKER
export interface interfaceWorkerAdd {
    name: string
}
export interface interfaceWorkerEdit {
    id: string
    name: string
}
export interface interfaceWorkerGet {
    contract_id: string
    offset: number
    count: number
}
export interface interfaceWorkerGetById {
    ids: string[]
}