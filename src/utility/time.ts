// @ts-nocheck
export function DateFormat (date) {
    //нет даты
    if (!date) return ''

    let nowDate = new Date()
    let nowDateJson = {
        date: nowDate.getDate(),
        month: nowDate.getMonth() +1,
        year: nowDate.getFullYear(),

        hour: nowDate.getHours(),
        minutes: nowDate.getMinutes()
    }

    let newDate = new Date(date)

    let newDateJson = {
        date: newDate.getDate(),
        month: newDate.getMonth() +1,
        year: newDate.getFullYear(),

        hour: newDate.getHours(),
        minute: newDate.getMinutes()
    }

    let monthTxt = 'Января'
    if (newDateJson.month === 2) monthTxt = 'Февраля'
    if (newDateJson.month === 3) monthTxt = 'Марта'
    if (newDateJson.month === 4) monthTxt = 'Апреля'
    if (newDateJson.month === 5) monthTxt = 'Мая'
    if (newDateJson.month === 6) monthTxt = 'Июня'
    if (newDateJson.month === 7) monthTxt = 'Июля'
    if (newDateJson.month === 8) monthTxt = 'Августа'
    if (newDateJson.month === 9) monthTxt = 'Сентября'
    if (newDateJson.month === 10) monthTxt = 'Октября'
    if (newDateJson.month === 11) monthTxt = 'Ноября'
    if (newDateJson.month === 12) monthTxt = 'Декабря'

    //редактор часа
    let hourTxt = `${newDateJson.hour}`
    if (newDateJson.hour < 10)
        hourTxt = `0${newDateJson.hour}`

    //редактор часа
    let minutesTxt = `${newDateJson.minute}`
    if (newDateJson.minute < 10)
        minutesTxt = `0${newDateJson.minute}`

    //год не совпадает
    if (nowDateJson.year !== newDateJson.year)
        return `${newDateJson.date} ${monthTxt} ${newDateJson.year}`

    if (nowDateJson.date === newDateJson.date)
        return `Сегодня ${hourTxt}:${minutesTxt}`

    if (nowDateJson.date-1 === newDateJson.date)
        return `Вчера ${hourTxt}:${minutesTxt}`

    return `${newDateJson.date} ${monthTxt} ${hourTxt}:${minutesTxt}`
}