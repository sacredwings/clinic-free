import * as soap from 'soap';

/**
 * Отправляет SOAP запрос к указанному методу.
 * @param wsdlUrl URL WSDL файла.
 * @param methodName Имя метода, который нужно вызвать.
 * @param args Объект, содержащий аргументы для передачи методу.
 * @returns Promise, который разрешается с SOAP ответом. Тип ответа
 *          зависит от вызванного метода и структуры SOAP ответа.
 */

export async function callSoapMethod<T>(wsdlUrl: string, methodName: string, args: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        soap.createClient(wsdlUrl, (err, client) => {
            if (err) {
                return reject(err);
            }

            client[methodName](args, (err:any, result:any) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}

