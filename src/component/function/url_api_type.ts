// @ts-nocheck
//----------------------------------------------------------------------------------------------------------------------
//АВТОРИЗАЦИЯ
import {ServerProfExaminationEgisz} from "@/component/function/url_api";

export interface interfaceAuthLogin {
    login: string
    password: number
}
//----------------------------------------------------------------------------------------------------------------------
//АККАУНТ
export interface interfaceAccountSelectClinic {
    clinic_id: string
}
//--------------------------------------------------------------
//USER
export interface interfaceUserEdit {
    id: string

    first_name: string
    last_name: string
    second_name: string

    gender: 0 | 1
    date_birth: Date

    phone: number
}
//--------------------------------------------------------------
//CLINIC
export interface interfaceClinicAdd {
    title: string
    description: string

    inn: number
    kpp: number
    ogrn: number
}
export interface interfaceClinicEdit {
    id: string

    title: string
    description: string

    inn: number
    kpp: number
    ogrn: number
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
    clinic_id: string

    title: string

    inn: number
    kpp: number
    ogrn: number
}
export interface interfaceOrgEdit {
    clinic_id: string

    id: string

    title: string

    inn: number
    kpp: number
    ogrn: number
}
export interface interfaceOrgGet {
    q: string

    offset: number
    count: number

    order: string
    order_by: string
}
export interface interfaceOrgGetById {
    ids: string[]
}

//---------------------------------------------------------------------------------
//CONTRACT
export interface interfaceContractAdd {
    clinic_id,

    org_id: string
    contract_type_ids: string[]

    title: string
    description: string

    date_start: string
    date_end: string

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
    clinic_id: string

    id: string

    contract_type_ids: string[]

    title: string
    description: string

    date_start: string
    date_end: string

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
    clinic_id: string

    q: string,
    org_id: string

    offset: number
    count: number
}
export interface interfaceContractGetById {
    clinic_id: string

    ids: string[]
}
//---------------------------------------------------------------------------------
//Permission
export interface interfacePermissionGet {
    offset: number
    count: number
}
export interface interfacePermissionGetById {
    ids: string[]
}
//---------------------------------------------------------------------------------
//ROLE
export interface interfaceRoleAdd {
    clinic_id: string

    title: string
    description: string

    permission_ids: string[] | null
}
export interface interfaceRoleEdit {
    clinic_id: string

    id: string

    title: string
    description: string

    permission_ids: string[] | null
}
export interface interfaceRoleGet {
    clinic_id: string

    offset: number
    count: number
}
export interface interfaceRoleGetById {
    clinic_id: string

    ids: string[]
}
export interface interfaceRoleDelete {
    clinic_id: string

    id: string
}
//---------------------------------------------------------------------------------
//Employee
export interface interfaceEmployeeAdd {
    clinic_id: string

    title: string
    description: string

    user_id: string

    role_ids: string[] | null
    specialty_ids: string[] | null

    date_start: string
    date_end: string
}
export interface interfaceEmployeeEdit {
    clinic_id: string

    id: string

    title: string
    description: string

    user_id: string

    role_ids: string[] | null
    specialty_ids: string[] | null

    date_start: string
    date_end: string
}
export interface interfaceEmployeeGet {
    clinic_id: string

    offset: number
    count: number
}
export interface interfaceEmployeeGetById {
    clinic_id: string

    ids: string[]
}
export interface interfaceEmployeeDelete {
    clinic_id: string

    id: string
}
//---------------------------------------------------------------------------------
//DOCTOR
export interface interfaceDoctorAdd {
    user_id: string
    specialty_ids: string[] | null
}
export interface interfaceDoctorEdit {
    id: string

    specialty_ids: string[] | null
}
export interface interfaceDoctorGet {
    offset: number
    count: number
}
export interface interfaceDoctorGetById {
    ids: string[]
}
export interface interfaceEmployeeDelete {
    id: string
}
//----------------------------------------------------------------------------------------------------------------------
//ProfExamination
export interface interfaceProfExaminationAdd {
    clinic_id: string

    contract_id: string | null
    patient_user_id: string | null

    hf_code: string[] | null

    first_name: string,
    last_name: string,
    second_name: string | null,

    gender: 0 | 1,
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
export interface interfaceProfExaminationEdit {
    clinic_id: string,

    id: string

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
export interface interfaceProfExaminationEditFinale {
    clinic_id: string,

    id: string

    health_group: string,
    contraindications: string[],
    re_hf: number,
}
export interface interfaceProfExaminationEditVisit {
    clinic_id: string,

    patient_user_id: string

    specialist_id: string | null
    research_id: string | null

    status: string
    note: string
    result: string
}
export interface interfaceProfExaminationGet {
    clinic_id: string

    q: string
    contract_id: string

    offset: number
    count: number

    order: -1 | 1
    order_by: string
}
export interface interfaceProfExaminationGetById {
    clinic_id: string,

    ids: string[]
}
export interface interfaceProfExaminationEgisz {
    clinic_id: string

    id: string
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
