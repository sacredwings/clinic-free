export const accessList = [
    {name: 'РольЧтение', access: 'roleGet'},
    {name: 'РольЗапись', access: 'roleEdit'},
    {name: 'РольСоздание', access: 'roleAdd'},
    {name: 'РольУдаление', access: 'roleDelete'},
    {name: 'ПользовательЧтение', access: 'userGet'},
    {name: 'ПользовательЗапись', access: 'userEdit'},
    {name: 'ПользовательСоздание', access: 'userAdd'},
    {name: 'ПользовательУдаление', access: 'userDelete'}
    /*
    {category: 'Роль', list: [
            {name: 'Чтение', access: 'roleGet'},
            {name: 'Запись', access: 'roleEdit'},
            {name: 'Создание', access: 'roleAdd'},
            {name: 'Удаление', access: 'roleDelete'}
        ]},
    {category: 'Пользователь', list: [
            {name: 'Чтение', access: 'userGet'},
            {name: 'Запись', access: 'userEdit'},
            {name: 'Создание', access: 'userAdd'},
            {name: 'Удаление', access: 'userDelete'}
        ]}*/
]