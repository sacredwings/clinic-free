import {ServerOrgEdit, ServerOrgGet} from "@/component/function/url_api";

export interface interfaceUserGet {
    q: string | null
    offset: number
    count: number
}

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
export interface interfaceUserAdd {
    login: string
    password: string

    first_name: string
    last_name: string
    second_name: string

    man: '1' | '0'

    date_birth: Date

    phone: number,

    specialist_ids: string[]
    research_ids: string[]
}
export interface interfaceWorkerGetById {
    ids: string[]
}
//---------------------------------------------------------------------------------
//Specialist
export interface interfaceSpecialistAdd {
    name: string
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
export interface interfaceSpecialistEditHf {
    module: 'hf' | 'ct'
    hf_id: string
    id: string
}
//---------------------------------------------------------------------------------
//Research
export interface interfaceResearchAdd {
    name: string
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
export interface interfaceResearchEditHf {
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
    org_id: string
    contract_type_ids: string[]

    name: string
    date_from: string
    date_to: string
    price_ultrasound: number
    price_mammography: number
    price_xray: number
    price: number
}
export interface interfaceContractEdit {
    id: string
    name: string
    date_from: string
    date_to: string
    price_ultrasound: number
    price_mammography: number
    price_xray: number
    price: number
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
//CONTRACT-TYPE
export interface interfaceContractTypeAdd {
    name: string
}
export interface interfaceContractTypeEdit {
    id: string
    name: string
}
export interface interfaceContractTypeGet {
    offset: number
    count: number
}
export interface interfaceContractTypeGetById {
    ids: string[]
}
//---------------------------------------------------------------------------------
//WORKER
export interface interfaceWorkerAdd {
    contract_id: string | null
    contract_type_ids: string[] | null
    hf_code: string[] | null

    first_name: string,
    last_name: string,
    second_name: string | null,
    man: string,
    date_birth: Date,

    price_ultrasound: boolean,
    price_mammography: boolean,
    price_xray: boolean,

    phone: string | null,

    subdivision: string,
    profession: string,
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

//---------------------------------------------------------------------------------
//VISIT
export interface interfaceVisitEdit {
    worker_id: string
    specialist_id: string | null
    research_id: string | null
    status: string
    note: string
    result: string
}