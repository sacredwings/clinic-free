export const accessList = [

    {name: 'Договор - Чтение', access: 'contractGet'},
    {name: 'Договор - Запись', access: 'contractEdit'},
    {name: 'Договор - Создание', access: 'contractAdd'},
    {name: 'Договор - Удаление', access: 'contractDelete'},

    {name: 'Типы договоров - Чтение', access: 'contractTypeGet'},
    {name: 'Типы договоров - Запись', access: 'contractTypeEdit'},
    {name: 'Типы договоров - Создание', access: 'contractTypeAdd'},
    {name: 'Типы договоров - Удаление', access: 'contractTypeDelete'},

    {name: 'Вредный фактор - Чтение', access: 'hfGet'},
    {name: 'Вредный фактор - Запись', access: 'hfEdit'},
    {name: 'Вредный фактор - Создание', access: 'hfAdd'},
    {name: 'Вредный фактор - Удаление', access: 'hfDelete'},

    {name: 'Организация - Чтение', access: 'orgGet'},
    {name: 'Организация - Запись', access: 'orgEdit'},
    {name: 'Организация - Создание', access: 'orgAdd'},
    {name: 'Организация - Удаление', access: 'orgDelete'},

    {name: 'Цена - Чтение', access: 'priceGet'},
    {name: 'Цена - Запись', access: 'priceEdit'},
    {name: 'Цена - Создание', access: 'priceAdd'},
    {name: 'Цена - Удаление', access: 'priceDelete'},

    {name: 'Исследование - Чтение', access: 'researchGet'},
    {name: 'Исследование - Запись', access: 'researchEdit'},
    {name: 'Исследование - Создание', access: 'researchAdd'},
    {name: 'Исследование - Удаление', access: 'researchDelete'},

    {name: 'Роль - Чтение', access: 'roleGet'},
    {name: 'Роль - Запись', access: 'roleEdit'},
    {name: 'Роль - Создание', access: 'roleAdd'},
    {name: 'Роль - Удаление', access: 'roleDelete'},

    {name: 'Специалист - Чтение', access: 'specialistGet'},
    {name: 'Специалист - Запись', access: 'specialistEdit'},
    {name: 'Специалист - Создание', access: 'specialistAdd'},
    {name: 'Специалист - Удаление', access: 'specialistDelete'},

    {name: 'Пользователь | Чтение', access: 'userGet'},
    {name: 'Пользователь | Создание', access: 'userAdd'},
    {name: 'Пользователь | Редактирование', access: 'userEdit'},
    {name: 'Пользователь | Редактирование | Авторизация', access: 'userEditAuth'},
    {name: 'Пользователь | Редактирование | Роль', access: 'userEditRole'},
    {name: 'Пользователь | Редактирование | Визит', access: 'userEditVisit'},
    {name: 'Пользователь - Удаление', access: 'userDelete'},

    {name: 'Работник | Чтение', access: 'workerGet'},
    {name: 'Работник | Создание', access: 'workerAdd'},
    {name: 'Работник | Редактирование', access: 'workerEdit'},
    {name: 'Работник | Редактирование | Визит', access: 'workerEditVisit'},
    {name: 'Работник | Удаление', access: 'workerDelete'},
]

export const accessCheck = (element, list) => {
    if (!list) return false
    let newArr = []
    list.forEach((item)=>{
        newArr = [...newArr, ...item.access]
    })

    let result = false
    newArr.forEach((item)=>{
        if (element === item) result = true
    })

    return result
}