import { callSoapMethod } from './soapClient'; // Отрегулируйте путь, если необходимо

// **Крайне важно: определите типы, представляющие структуру SOAP сервиса ЗДЕСЬ.**
//  Эти типы *должны* соответствовать структуре, определенной в WSDL.
//  Именно здесь обеспечивается типовая безопасность.

interface AddressDto {
    Appartment: string;
    Building: string;
    City: string;
    IdAddressType: string;
    PostalCode: string;
    Street: string;
    StringAddress: string;
}

interface BirthPlace {
    City: string;
    Country: string;
    Region: string;
}

interface ContactDto {
    ContactValue: string;
    IdContactType: string;
}

interface DocumentDto {
    DocN: string;
    DocS: string;
    IdDocumentType: string;
    ProviderName: string;
    RegionCode: string;
}

interface Patient {
    Addresses: { AddressDto: AddressDto[] };
    BirthDate: string;
    BirthPlace: BirthPlace;
    Contacts: { ContactDto: ContactDto[] };
    Documents: { DocumentDto: DocumentDto[] };
    FamilyName: string;
    GivenName: string;
    IdPatientMIS: string;
    MiddleName: string;
    Sex: string;
}

export interface AddPatientArgs {
    guid: string;
    idLPU: string;
    patient: Patient;
}

export interface AddPatientResponse { // Определите ожидаемый тип ответа!
    AddPatientResult: any; // Замените 'any' на реальную структуру из WSDL
}

export async function AddPatient({
    wsdlUrl = 'http://b2b-demo.n3health.ru/emk/PixService.svc?wsdl',
    methodName = 'AddPatient',
    args
}: { wsdlUrl?: string, methodName?: string, args: AddPatientArgs }) {
    try {
        const result = await callSoapMethod<AddPatientResponse>(wsdlUrl, methodName, args);
        console.log('SOAP Response:', result);
    } catch (error) {
        console.error('SOAP Error:', error);
    }
}
//-------------------------------------------------------------
/*
import { callSoapMethod } from './soap-client'; // Отрегулируйте путь, если необходимо

// **Крайне важно: определите типы, представляющие структуру SOAP сервиса ЗДЕСЬ.**
//  Эти типы *должны* соответствовать структуре, определенной в WSDL.
//  Именно здесь обеспечивается типовая безопасность.

interface AddressDto {
    Appartment: string;
    Building: string;
    City: string;
    IdAddressType: string;
    PostalCode: string;
    Street: string;
    StringAddress: string;
}

interface BirthPlace {
    City: string;
    Country: string;
    Region: string;
}

interface ContactDto {
    ContactValue: string;
    IdContactType: string;
}

interface DocumentDto {
    DocN: string;
    DocS: string;
    IdDocumentType: string;
    ProviderName: string;
    RegionCode: string;
}

interface Patient {
    Addresses: { AddressDto: AddressDto[] };
    BirthDate: string;
    BirthPlace: BirthPlace;
    Contacts: { ContactDto: ContactDto[] };
    Documents: { DocumentDto: DocumentDto[] };
    FamilyName: string;
    GivenName: string;
    IdPatientMIS: string;
    MiddleName: string;
    Sex: string;
}

interface AddPatientArgs {
    guid: string;
    idLPU: string;
    patient: Patient;
}

interface AddPatientResponse { // Определите ожидаемый тип ответа!
    AddPatientResult: any; // Замените 'any' на реальную структуру из WSDL
}


async function main() {
    const wsdlUrl = 'http://b2b-demo.n3health.ru/emk/PixService.svc?wsdl'; // Замените на URL вашего WSDL файла
    const methodName = 'AddPatient'; // Укажите имя метода

    const args: AddPatientArgs = {
        guid: '',
        idLPU: '',
        patient: {
            Addresses: {
                AddressDto: [
                    {
                        Appartment: '1000',
                        Building: '1',
                        City: '7800000000000',
                        IdAddressType: '1',
                        PostalCode: '125478',
                        Street: '78000000000145900',
                        StringAddress: '125478, Санкт-Петербург, улица Федосеенко, 1, кв 1000',
                    },
                ],
            },
            BirthDate: '1987-01-10T10:38:01',
            BirthPlace: {
                City: 'Санкт-Петербург',
                Country: 'Россия',
                Region: 'Санкт-Петербург',
            },
            Contacts: {
                ContactDto: [
                    {
                        ContactValue: '+78792221133',
                        IdContactType: '1',
                    },
                ],
            },
            Documents: {
                DocumentDto: [
                    {
                        DocN: '2145',
                        DocS: '123456',
                        IdDocumentType: '14',
                        ProviderName: 'Паспортный стол',
                        RegionCode: '1',
                    },
                ],
            },
            FamilyName: 'Красивый',
            GivenName: 'Федор',
            IdPatientMIS: 'test_Patient_2025-02-25T15:27:40.143',
            MiddleName: 'Васильевич',
            Sex: '1',
        }
    };

    try {
        // Крайне важно: укажите тип ожидаемого ответа здесь!
        const result = await callSoapMethod<AddPatientResponse>(wsdlUrl, methodName, args);
        console.log('SOAP Ответ:', result);

        // Доступ к свойствам ответа на основе интерфейса AddPatientResponse
        console.log("AddPatientResult:", result.AddPatientResult);

    } catch (error) {
        console.error('SOAP Ошибка:', error);
    }
}

main();
*/
