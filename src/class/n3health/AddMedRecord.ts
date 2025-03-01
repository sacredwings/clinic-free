import { callSoapMethod } from './soapClient'; // Отрегулируйте путь, если необходимо

// **Крайне важно: определите типы, представляющие структуру SOAP сервиса ЗДЕСЬ.**
//  Эти типы *должны* соответствовать структуре, определенной в WSDL.
//  Именно здесь обеспечивается типовая безопасность.

interface HumanName {
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
}

interface IdentityDocument {
    DocN: string;
    IdDocumentType: string;
    ProviderName: string;
}

interface Person {
    HumanName: HumanName;
    IdPersonMis: string;
    Documents: { IdentityDocument: IdentityDocument[] };
}

interface Doctor {
    Person: Person;
    IdSpeciality: string;
    IdPosition: string;
}

interface MedDocumentDtoPersonalSign {
    Sign: string;
    Doctor: Doctor;
}

interface MedDocumentDtoDocumentAttachment {
    Data: string;
    OrganizationSign: string;
    PersonalSigns: { MedDocumentDtoPersonalSign: MedDocumentDtoPersonalSign[] } | null; //Marked as optional
    MimeType: string;
}

interface MedDocument {
    Attachments: { MedDocumentDtoDocumentAttachment: MedDocumentDtoDocumentAttachment[] } | null; //Marked as optional
    EventDateTime: string; // ISO 8601 format
    IdCase: any; // Can be null
    IdClassMedDocument: string;
    IdDepart: any; // Can be null
    IdMedDocumentType: string;
    IdTfomsDepart: any; // Can be null
    Number: string;
}

export interface AddMedRecordArgs {
    guid: string;
    idLpu: string;
    idPatientMis: string;
    medRecord: MedDocument;
}

export interface AddMedRecordResponse {
    AddMedRecordResult: any; // Replace 'any' with the actual response type from the WSDL
}

export async function AddMedRecord({
    wsdlUrl = 'http://b2b-demo.n3health.ru/emk/PixService.svc?wsdl',
    methodName = 'AddMedRecord',
    args
}: { wsdlUrl?: string, methodName?: string, args: AddMedRecordArgs }) {
    try {
        const result = await callSoapMethod<AddMedRecordResponse>(wsdlUrl, methodName, args);
        console.log('SOAP Response:', result);
    } catch (error) {
        console.error('SOAP Error:', error);
    }
}
//-------------------------------------------------------------
/*
import { callSoapMethod } from './soap-client';

// **Define the types for AddMedRecord request and response here**

interface HumanName {
    GivenName: string;
    MiddleName: string;
    FamilyName: string;
}

interface IdentityDocument {
    DocN: string;
    IdDocumentType: string;
    ProviderName: string;
}

interface Person {
    HumanName: HumanName;
    IdPersonMis: string;
    Documents: { IdentityDocument: IdentityDocument[] };
}

interface Doctor {
    Person: Person;
    IdSpeciality: string;
    IdPosition: string;
}

interface MedDocumentDtoPersonalSign {
    Sign: string;
    Doctor: Doctor;
}

interface MedDocumentDtoDocumentAttachment {
    Data: string;
    OrganizationSign: string;
    PersonalSigns: { MedDocumentDtoPersonalSign: MedDocumentDtoPersonalSign[] } | null; //Marked as optional
    MimeType: string;
}

interface MedDocument {
    Attachments: { MedDocumentDtoDocumentAttachment: MedDocumentDtoDocumentAttachment[] } | null; //Marked as optional
    EventDateTime: string; // ISO 8601 format
    IdCase: any; // Can be null
    IdClassMedDocument: string;
    IdDepart: any; // Can be null
    IdMedDocumentType: string;
    IdTfomsDepart: any; // Can be null
    Number: string;
}

interface AddMedRecordArgs {
    guid: string;
    idLpu: string;
    idPatientMis: string;
    medRecord: MedDocument;
}

interface AddMedRecordResponse {
    AddMedRecordResult: any; // Replace 'any' with the actual response type from the WSDL
}

async function main() {
    const wsdlUrl = 'http://b2b-demo.n3health.ru/emk/PixService.svc?wsdl'; // Replace with your WSDL URL
    const methodName = 'AddMedRecord';

    const args: AddMedRecordArgs = {
        guid: '',
        idLpu: '',
        idPatientMis: '',
        medRecord: {
            Attachments: {
                MedDocumentDtoDocumentAttachment: [
                    {
                        Data: 'подписываемый_документ_в_формате_base64binary',
                        OrganizationSign: 'откреплённая_подпись_организации_в_формате_base64binary',
                        PersonalSigns: {
                            MedDocumentDtoPersonalSign: [
                                {
                                    Sign: 'откреплённая_подпись_врача_в_формате_base64binary',
                                    Doctor: {
                                        Person: {
                                            HumanName: {
                                                GivenName: 'Имя',
                                                MiddleName: 'Отчество',
                                                FamilyName: 'Фамилия',
                                            },
                                            IdPersonMis: 'идентификатор_врача_в_МИС',
                                            Documents: {
                                                IdentityDocument: [
                                                    {
                                                        DocN: 'СНИЛС_без_тире_и_пробелов',
                                                        IdDocumentType: '223',
                                                        ProviderName: 'ПФР',
                                                    },
                                                ],
                                            },
                                        },
                                        IdSpeciality: 'код_специальности_по_справочнику_1.2.643.5.1.13.13.11.1066',
                                        IdPosition: 'код_должности_по_справочнику_1.2.643.5.1.13.13.11.1002',
                                    },
                                },
                            ],
                        },
                        MimeType: 'text/xml',
                    },
                ],
            },
            EventDateTime: '2016-10-24T16:51:08.7241379+03:00',
            IdCase: null,
            IdClassMedDocument: '1.2.643.5.1.13.2.1.1.679',
            IdDepart: null,
            IdMedDocumentType: '1.2.643.5.1.13.2.1.1.1',
            IdTfomsDepart: null,
            Number: 'номер_медицинской_записи',
        },
    };

    try {
        const result = await callSoapMethod<AddMedRecordResponse>(wsdlUrl, methodName, args);
        console.log('SOAP Response:', result);
    } catch (error) {
        console.error('SOAP Error:', error);
    }
}

main();
*/