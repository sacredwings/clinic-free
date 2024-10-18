// @ts-nocheck
//----------------------------------------------------------------------------------------------------------------------
//АВТОРИЗАЦИЯ
export interface interfaceAuthLogin {
    login: string
    password: number
}
//----------------------------------------------------------------------------------------------------------------------
//Аккаунт
export interface interfaceAccountSelectClinic {
    clinic_id: string
}
//--------------------------------------------------------------
//CLINIC
export interface interfaceClinicAdd {
    title: string
    description: string

    inn: number
}
export interface interfaceClinicGet {
    q: string

    offset: number
    count: number
}

export interface interfaceClinicGetById {
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
    clinic_id :string
    q: string,

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

    price_pcr: number
    price_hti: number
    price_brucellosis: number

    price_worker_all: number
    price_worker_man: number
    price_worker_woman: number
}
export interface interfaceContractEdit {
    id: string
    name: string
    date_from: string
    date_to: string

    price_ultrasound: number
    price_mammography: number
    price_xray: number

    price_pcr: number
    price_hti: number
    price_brucellosis: number

    price_worker_all: number
    price_worker_man: number
    price_worker_woman: number
}
export interface interfaceContractGet {
    clinic_id :string
    q: string,
    org_id: string

    offset: number
    count: number
}
export interface interfaceContractGetById {
    ids: string[]
}
//----------------------------------------------------------------------------------------------------------------------
//ProfExamination
export interface interfaceProfExaminationGet {
    clinic_id: string

    q: string
    contract_id: string

    offset: number
    count: number
}
export interface interfaceProfExaminationGetById {
    ids: string[]
}


//----------------------------------------------------------------------------------------------------------------------
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
export interface interfaceUserEditVisit {
    id: string

    specialist_ids: string[]
    research_ids: string[]
}
export interface interfaceUserEditRole {
    id: string

    role_ids: string[]
}
export interface interfaceUserEditAuth {
    id: string

    login: string
    password: string
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
    price: number
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
    price: number
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

    check_ultrasound: boolean,
    check_mammography: boolean,
    check_xray: boolean,

    check_pcr: boolean
    check_hti: boolean
    check_brucellosis: boolean

    phone: string | null,

    subdivision: string,
    profession: string,
}
export interface interfaceWorkerEdit {
    id: string

    contract_type_ids: string[] | null
    hf_code: string[] | null

    check_ultrasound: boolean,
    check_mammography: boolean,
    check_xray: boolean,

    check_pcr: boolean
    check_hti: boolean
    check_brucellosis: boolean

    subdivision: string
    profession: string
}
export interface interfaceWorkerEditVisit {
    worker_id: string
    specialist_id: string | null
    research_id: string | null
    status: string
    note: string
    result: string
}
export interface interfaceWorkerEditFinale {
    id: string

    health_group: string,
    contraindications: string[],
    re_hf: number,
}
export interface interfaceWorkerGet {
    contract_id: string
    offset: number
    count: number
}
export interface interfaceWorkerGetDoctor {
    offset: number
    count: number
}
export interface interfaceWorkerGetById {
    ids: string[]
}

//---------------------------------------------------------------------------------
//VISIT


//---------------------------------------------------------------------------------
//ROLE
export interface interfaceRoleAdd {
    name: string
}
export interface interfaceRoleEdit {
    id: string
    name: string
    access: string[]
}
export interface interfaceRoleGet {
    offset: number
    count: number
}
export interface interfaceRoleGetById {
    ids: string[]
}
export interface interfaceRoleDelete {
    id: string
}
//--------------------------------------------------------------
//GigTest
export interface interfaceGigtestUser {
    worker_id: string
}


//--------------------------------------------------------------
//Doctor
export interface interfaceDoctorAdd {
    user_id: string
    specialist_id: string[]
}
export interface interfaceDoctorGet {
    q: string

    offset: number
    count: number
}
