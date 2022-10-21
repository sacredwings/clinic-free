import {DB} from "social-framework"
import DbConnect from "../../util/DbConnect";

export default async function handler(req, res) {
    let value
    try {
        try {
            await DbConnect()

            let collection = DB.Client.collection('specialist')
            let arSpecialty = [
                ['Дерматовенеролог'],
                ['Офтальмолог'],
                ['Оториноларинголог'],
                ['Хирург'],
                ['Стоматолог'],
                ['Уролог'],
                ['Инфекционист  '],
            ]

            arSpecialty = arSpecialty.map((item, i)=>{
                return {name: item[0]}
            })

            await collection.insert(arSpecialty)


            collection = DB.Client.collection('research')
            let arResearch = [
                ['Спирометрия '],
                ['Пульсоксиметрия '],
                ['Биомикроскопия глаза '],
                ['Периметрия '],
                ['Визометрия '],
                ['ВИЧ'],
                ['Исследование уровня ретикулоцитов в крови '],
                ['Исследование уровня метгемоглобина в крови '],
                ['Исследование уровня тромбоцитов в крови '],
                ['Исследование уровня карбоксигемоглобина в крови '],
                ['Исследование уровня дельта аминолевулиновой кислоты в моче '],//10
                ['Исследование уровня копропорфирина в моче '],
                ['Исследование аккомодации '],
                ['Исследование цветоощущения '],
                ['Исследование функции вестибулярного аппарата '],
                ['Рентгенография длинных трубчатых костей (фтор и его соединения) '],//15
                ['Офтальмоскопия глазного дна'],
                ['УЗИ органов брюшной полости '],//17
                ['УЗИ органов малого таза '],
                ['УЗИ щитовидной железы '],
                ['Сифилис'],//20
                ['Реакция агглютинации Хеддельсона крови при контакте с возбудителями бруцеллеза '],
                ['Определение уровня щелочной фосфатазы'],
                ['Определение билирубина'],//23
                ['Аспартатаминотрансферазы (ACT)'],
                ['Аланинаминотрансферазы (АЛТ)'],//25
                ['Рефрактометрия (или скиаскопия)'],
                ['Паллестезиметрия '],//27
                ['Тональная пороговая аудиометрия'],
                ['Определение бинокулярного зрения'],
                ['Непрямая ларингоскопия'],//30
                ['Эзофагогастродуоденоскопия'],
                ['Электроэнцефалография'],
                ['Тонометрия'],
                ['Определение группы крови и резус-фактора'],
                ['Вирусные гепатиты В и С'],//35
                ['HBsAg'],
                ['a-HBCOR'],
                ['IgM'],//38
                ['A-HCV-IgG'],
                ['Анти-HBc-Ig '],//40
                ['Анти-HCV- Ig'],

            ]

            arResearch = arResearch.map((item, i)=>{
                return {name: item[0]}
            })

            await collection.insert(arResearch)

            console.log(arResearch)

            let arHarmfulFactor = [
                ['1.1',  [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[6]._id,
                    arResearch[7]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Азота неорганические соединения (в том числе азота оксиды0, азота диоксид0)'],
                ['1.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Азотсодержащие органические соединения (в том числе амины, амиды, анилиды, гидразин и его производные, нитросоединения и прочие производные: ЬГМ-диметилацетамидр’ МЫ-диметилформамидр, капролактам^ (гексагидро-2Н-азепин-2-он)'],
                ['1.3', [
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id
                ],'Альдегиды алифатические (предельные и непредельные) и ароматические (формальдегид^0, ацетальдегид, проп- 2-ен-1-аль (акролеин), бензальдегид, бензол-1,2-дикарбальдегид (фталевый альдегид)'],
                ['1.4', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Альдегиды и кетоны галогенопроизводные (хлорбензальдегид (4- хлорбензальдегид), фторацетон, хлорацетофенон)'],
                ['1.5', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Алюминий и его соединения, в том числе:'],
                ['1.5.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Алюмоплатиновые катализаторыА'],
                ['1.6', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Бериллий и его соединенияАКР'],
                ['1.7', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Бор и его соединения, в том числе:'],
                ['1.7.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Борная кислота, бор нитрид®, бор трифторид0, тетраБор карбид®, тетраБор трисилицид®'],
                ['1.7.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Бороводороды0', 0],
                ['1.8', [], [], 'Галогены, в том числе:'],
                ['1.8.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Хлор0:', 0],
                ['1.8.1.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Хлора неорганические соединения (гидрохлорид0, кислоты, оксиды)'],
                ['1.8.1.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Хлорсодержащие органические соединения'],
                ['1.8.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'БромАО', 0],
                ['1.8.2.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Брома неорганические соединения (бромАО)'],
                ['1.8.2.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Бромсодержащие органические соединения (в том числе бромбензол, бромгексан, бромметан)'],
                ['1.8.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Йод', 0],
                ['1.8.3.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Йода неорганические соединения (йод, оксиды, кислоты и прочие)'],
                ['1.8.3.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Йодсодержащие органические соединения (в том числе йодбензол, йодметилбензол)'],
                ['1.8.4', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[15]._id
                ],[
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Фтор0', 0],
                ['1.8.4.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[15]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Фтора неорганические соединения (в том числе фтор0, гидрофторидРО, аммоний фторидр, соединения металлов с фтором: барий дифторидр, калий фторидр, литий фторидр, натрий фторидр, криолит1’, олово фторидр)'],
                ['1.8.4.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[15]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Фторорганические соединения и фторхлорорганические соединения (в том числе дихлорфторметан, дихлорфторметилбензол, фторхлорэтан)'],
                ['1.9', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Карбонилдихлорид (фосген)0'],
                ['1.10', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[6]._id,
                    arResearch[7]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Гидразин и его производные: фенилгидразин гидрохлорид, борингидразин, диметилгидразин (гептил)к'],
                ['1.11', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Дибензодиоксины полихлорированные (ПХДД), дибензофураны полихлорированные, 2,3,4,7,8- пентахлордибензофуран, бифенилы полибромированные и полихлорированныек, 2,3,7,8- тетрахлордибензо-пара-диоксинк, 3,3’4,4’,5-пентахлорбифенил (ПХБ- 126)к, диметилкарбамоилхлоридк'],
                ['1.12', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[3]._id
                ], 'Кадмий и его соединения^ кадмий ртуть теллур (твердый раствор)к, октадеканоат кадмияк'],
                ['1.13', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Карбонилы металлов, в том числе железо пентакарбонил, кобальт гидридотетракарбонилАО'],
                ['1.14', [
                    arResearch[6]._id,
                    arResearch[8]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кетоны, в том числе:'],
                ['1.14.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кетоны алифатические, ароматические 1-фенилэтанон (ацетофенон), пентан-2- он (метилэтилкетон)'],
                ['1.14.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ],[
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Пропан-2-онр (ацетон)'],
                ['1.15', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кислоты органические: метановая (муравьиная), этановая (уксусная), бутановая (масляная), пропионовая, 1- метилбутановая (изовалериановая), этадионовая кислота дигидрат (щавелевая), 4-метилпентановая (изокапроновая), проп-2-еновая (акриловая), бензойная и прочие; синтетические жирные кислоты; в том числе:'],
                ['1.15.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Бензол-1,3-дикарбоноваяА (изофталевая) и бензол-1,4-дикарбоноваяА (терефталевая) кислоты'],
                ['1.16', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кремния органические соединенияА (силаны), в том числе трихлор(хлорметил) силан, фенилтрихлорсилан, трихлорсилан'],
                ['1.17', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[6]._id,
                    arSpecialty[2]._id
                ], [], 'Марганец1* и его соединения, в том числе марганец карбонат гидрат^1’, марганец нитрат гексагидрат*р, марганец сульфат пентагидрат*, марганец трикарбонилциклопентадиен1*'],
                ['1.18', [], [],'Медь, золото, серебро и их соединения, в том числе:'],
                ['1.18.1', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Медь и ее соединения'],
                ['1.18.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Золото* и его соединения'],
                ['1.18.3', [], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ], 'Серебро1* и его соединения'],
                ['1.19', [], [], 'Металлы щелочные, щелочно¬земельные, редкоземельные и их соединения, в том числе:'],
                ['1.19.1', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Натрий, калий, литий, рубидий, цезий, цезиевая соль хлорированного бис дикарбонил кобальта и прочие; кальций, магний, стронций, барий, магнид меди®, магний додекаборид; лантан, иттрий, скандий, церий и их соединения'],
                ['1.19.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кобальт^, молибден, вольфрам®, тантал®, ниобий® и их соединения'],
                ['1.19.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Ванадий, европий, иттрий, оксид фосфат (люминофор Л-43 (ванадат иттрия фосфат)'],
                ['1.20', [
                    arResearch[6]._id
                ], [
                    arSpecialty[4]._id
                ], 'Ртутьр и ее соединения: ртутьр; металлоорганические соединения (ртуть неорганические соединения и прочие); органические соединения ртути'],
                ['1.21', [
                    arResearch[0]._id,
                    arResearch[6]._id,
                    arResearch[7]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Мышьяк и его неорганическиекр и органические соединения'],
                ['1.22', [
                    arResearch[0]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Никель и его соединенияАК, гептаникель гексасульфидАК, никель тетракарбонилАКО, никель хром гексагидрофосфатАК, никеля солиАК'],
                ['1.23', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[2]._id
                ], 'Озон0', 0],
                ['1.24', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Оксиды органические и перекиси: эпоксиэтан10* (этилена оксид), 1,2- эпоксипропанк (пропилена оксид), (хлорметил) оксиранАК (эпихлоргидрин)'],
                ['1.25', [
                    arResearch[0]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Олово и его соединения', 0],
                ['1.26', [], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ],'Платиновые металлы и их соединения: рутений, родий, палладийА, диАммоний дихлорпалладийА, осмий, иридий, платина, диАммоний гексахлорплатинатА'],
                ['1.27', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id,
                    arResearch[10]._id,
                    arResearch[11]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Свинец, в том числе:'],
                ['1.27.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id,
                    arResearch[10]._id,
                    arResearch[11]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Свинец и его неорганические соединенияРК'],
                ['1.27.2', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id,
                    arResearch[10]._id,
                    arResearch[11]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Свинца органические соединения: тетраэтилсвинец0,1,4- дигидрооксибензол свинец аддукт'],
                ['1.28', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Селен, теллур и их соединения'],
                ['1.29', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Серы соединения, в том числе:'],
                ['1.29.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Серы оксиды, кислоты'],
                ['1.29.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Дигидросульфид (сероводород)0, дигидросульфид0 (сероводород) смесь с углеводородами С1.5'],
                ['1.29.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Углерод дисульфидр (сероуглерод)'],
                ['1.29.4', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Серусодержащие органические соединения: тиолы (меркаптаны), тиоамиды: метантиол (метилмеркаптан), этантиол (этилмеркаптан)'],
                ['1.29.5', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ТетраметилтиопероксидикарбондиамидА (тиурам Д)'],
                ['1.30', [
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[1]._id
                ], 'Спирты, в том числе:'],
                ['1.30.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id
                ], [
                    arSpecialty[1]._id
                ], 'Алифатические одно- и многоатомные, ароматические спирты и их производные: этанол, бутан-1-ол, бутан- 2-ол, бутанол, метанол, пропан-1-ол, пропан-2-ол, 2-(Проп-2-енокси) этанол, 2-этоксиэтанолр, бензилкарбинолр, этан- 1,2-диол (этиленгликоль), пропан-2- диол (пропиленгликоль)'],
                ['1.31', [
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Сурьмар и ее соединения'],
                ['1.32', [], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id
                ] , 'Таллий, индий, галлий и их соединения'],
                ['1.33', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[2]._id
                ], 'Титанф, цирконий, гафний, германий и их соединения'],
                ['1.34', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[2]._id
                ], 'Углеводородов алифатических галогенопроизводные, в том числе:'],
                ['1.34.1', [
                    arResearch[6]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ],'Дихлорметанр (хлористый метилен), 1,2- дихлорэтан, тетрахлорметан (четыреххлористый углерод)1”, трихлорметан (хлороформ), хлорметанр (хлористый метил), бромэтан, трихлорэтан, трихлорэтен, 1 и 2- хлорбута-1,3-диен (хлоропрен)1”, тетрафторэтен (перфторизобутилен), 2- бром-1,1,1 -трифтор-2 хлорэтан (фторотан)р и другие'],
                ['1.34.2', [], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ] ,'Хлорэтенкр (винилхлорид)'],
                ['1.35', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Углеводороды гетероциклические: фуранА, фуран-2-альдегидА (фурфураль), пиридин и его соединения, пиперидины, тетрагидро-1,4-оксазин (морфолин) и другие'],
                ['1.36', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[17]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Углеводороды алифатические предельные, непредельные, циклические, в том числе:'],
                ['1.36.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[17]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Метан, этан, пропан, парафины, этилен, пропилен, ацетилен, циклогексан'],
                ['1.36.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[17]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Бута-1,3-диенкр (1,3-бутадиен, дивинил)'],
                ['1.36.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[17]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'1,7,7триметилбицикло [2,2,1 ]гептан-2-он (камфара)'],
                ['1.37', [], [], 'Углеводороды ароматические:'],
                ['1.37.1', [
                    arResearch[6]._id,
                    arResearch[7]._id
                ], [
                    arSpecialty[1]._id,
                ], 'Бензол10” и его производные: (толуолр (метилбензол), ксилолр (диметилбензол), стирол (этенилбензол) и прочие), гидроксибензолр (фенол) и его производные, крезол в том числе:'],
                ['1.37.1.1', [
                    arResearch[7]._id,
                    arResearch[18]._id
                ], [
                    arSpecialty[1]._id,
                ], 'Амино- и нитросоединения ароматических углеводородов и их производные: аминобензол (анилин), м-, п-толуидин, N-метиламинобензол (метил-аланин), аминонитро-бензолы; нитрохлорбензолы, нитро-, аминофенолы, 2-метил-1,3,5- тринитробензол (тринитротолуол), диамино-бензолыА (фенилен-диамины), 1 -амино-3-хлорбензолол, 1 -амино-4- хлорбензол (хлоранилины), аминодиметилбензол (ксилидин) и другие'],
                ['1.37.1.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Галогенопроизводные ароматические углеводороды: хлорбензол, (хлорметил)бензолА (хлортолуол; бензилхлорид), бромбензолА, трихлорбензол, трифтор-метилбензол, 1- гидрокси-2-хлорбензол, 1-гидрокси-4- хлорбензол, 1-гидрокси-2,4,6 трихлорбензол (хлорфенолы), 4-ди- хлорметилен-1,2,3,5,5- гексахлорциклопент-1-енА и другие'],
                ['1.37.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полициклические ароматические углеводороды и их производные (нафталин, нафтолы, бенз(а)пиренкр, дибенз(а,Ь)антраценк, антрацен, бензантрон, бенз(а)антраценк, фенантрен, 4-гидрокси-3-(Зоксо-1- фенилбу-2Н-1 -бензопиранр)'],
                ['1.38', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[7]._id,
                    arResearch[18]._id
                ],[
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Углеводородов алифатических амино- и нитросоединения и их производные (в том числе метиламин, этилениминАО, 1,6-диаминогексан (гексаметилендиамин)А, циклогексиламин)'],
                ['1.39', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[7]._id
                ], [
                    arSpecialty[1]._id,
                ], 'Углерода оксидро'],
                ['1.40', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ],'Фосфор и его соединения, в том числе:'],
                ['1.40.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ],'Фосфорсодержащие неорганические соединения (в том числе фосфин0, фосфориллорид0, фосфиды металлов, галогениды фосфора, фосфор пентаоксид)'],
                ['1.40.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ],'Фосфорсодержащие органические соединения - трикрезилфосфатр и другие'],
                ['1.41', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ],'Хиноны и их производные (в том числе нафтохиноны, бензохиноны, гидрохиноныА, антрахинон (антрацен- 9,10-дион)'],
                ['1.42', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Хром (VI) триоксидкр, диХромтриоксидА, хром трихлорид гексагидратА, хромовая кислотаАК и ее соли, соединения хрома и сплавы'],
                ['1.43', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Цианистые соединения, в том числе:'],
                ['1.43.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Цианистоводородная кислота0, ее соли, галоген- и другие производные (цианистый калий0, хлорциан0, цианамид и прочие - гидроцианида соли0, бензилцианид0); нитрилы органических кислот: ацетонитрил, бензонитрил и другие'],
                ['1.43.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Акрилонитрил™ (проп-2-енонитрил)'],
                ['1.44', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Цинк и его соединенияА'],
                ['1.45', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Эфиры сложные кислот органических, в том числе:'],
                ['1.45.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Эфиры сложные уксусной кислоты (в том числе этилацетат, бутилацетат, 2- метоксиэтилацетат1’, 2- этоксиэтилацетатр)'],
                ['1.45.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Эфиры сложные акриловой кислоты (в том числе метилакрилат (метилпроп-2- еноат), бутилакрилат(бутилпроп-2- еноат), метилметакрилат)'],
                ['1.45.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Эфиры сложные фталевой и терефталевой кислот: дибутилбензол- 1,2-дикарбонат (дибутилфталат), диметилбензол-1,2-дикарбонат (диметилтерефталат) и другие'],
                ['1.46', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Красители и пигменты органические (в том числе азокрасители, бензидиновые*, фталоцианиновые, хлортиазиновые, антрахиноновые, триарилметановые, тиоин-дигоидные, полиэфирные)'],
                ['1.47', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Пестициды, инсектициды, гербициды, в том числе:'],
                ['1.47.1', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ХлорорганическиеА (в том числе метоксихлор, гепта-хлор, хлоридан, дихлор, гексахлорбензол, гексахлорциклогексан (линдан), дикофол, 1,1,-(2,2,2 трихлорэтилиден) бис (4хлорбензол)р (ДДТ)'],
                ['1.47.2', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Фосфорорганические (в том числе метафос, метилэтил-тиофос, меркаптофос, карбофос, М-81, рогор, дифлос, хлорофос, глифосфат, гордона, валексон, диазинон, диметоат, малатион, паратионметил, хлорфенвинфос)'],
                ['1.47.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Ртутьорганические (в том числе этилмеркурхлорид диметилртуть)'],
                ['1.47.4', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные кислот карбаминовых: (в том числе каторана-вадекс, дихлоральмочевина, метурин, фенуроп, севинА, манебА, дикрезил, ялан, эптам, карбатионА, цинебА, карбофуран, карбосульфан, пиримикарб, тирам, манкоцеб, поликарбацин, десмедифам, фенмедифам)'],
                ['1.47.5', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные кислот алифатических хлорированных (в том числе хлоруксусной, трихлоруксусной)'],
                ['1.47.6', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные кислоты хлорбензойной'],
                ['1.47.7', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные кислоты хлороксиуксусной: 2,4- дихлорфеноксиуксусная кислота (2,4Д), аминная соль 2,4- дихлорфеноксиуксусной кислоты (2,4ДА), 4-хлор-2- метилфеноксиуксусная кислота (МСРА)'],
                ['1.47.8', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кислоты хлорфеноксимасляной производные'],
                ['1.47.9', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Кислот карбоновых анилиды галоидозамещенные'],
                ['1.47.10', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные мочевины и гуанидина'],
                ['1.47.11', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные сим-тразинов: атразин, прометрин, тербутрин'],
                ['1.47.12', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Гетероциклические соединения различных групп: зоокумарин(4- гидрокси-3-(3-оксо-1 -фенилбу-2Н-1 - бензопиран-2-онтил), ратиндан (2- (Дифенилацетил)-1 Н-инден-1,3-(2Н)- дион), морестан, пирамин (5-Амино-2- фенил-4-хлорпридазин 3(2Н)-он), тиазон (3,5-Диметил-2Н-1,3,5-тиадиазин-2- тион)'],
                ['1.47.13', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Хлорацетоанилиды (ацетохлор, алахлор, метазахлор, метолахлор)'],
                ['1.47.14', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Пиретроиды (в том числе бифентрин, перметрин, фенвалерат, лямбдацыгалотрин, цыгалотрин, дельтаметрин)'],
                ['1.47.15', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Производные сульфанил-мочевины (в том числе хлорсульфурон, римсульфурон, хлорсульфоксим, метмульфуронметил, трибунуронметил, тифенсульфурон-метил)'],
                ['1.47.16', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Азолы (в том числе бромуконазол, ципраконазол, пропиконазол, тритиконазол, триадименол, прохлораз, имозалил)'],
                ['1.48', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Синтетические моющие средства на основе анионных поверхностно активных веществ и их соединения (в том числе сульфанол, алкиламиды)А'],
                ['1.49', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Синтетические полимерные материалы: смолы, лаки, клеи, пластмассы, пресспорошки, волокна, в том числе:'],
                ['1.49.1', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полиакрилаты: полиметакрилаты (оргстекло, плексиглаз), полиакрилонитрил, полиакриламид'],
                ['1.49.2', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ПоливинилхлоридАФ (ПВХ, винилпласты, перхлорвиниловая смола), производство и применение'],
                ['1.49.3', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полимер (1метилэтенил) бензола с этенилбензоломр'],
                ['1.49.4', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полиолефины (полиэтилены, полипропиленыА (горячая обработка)'],
                ['1.49.5', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полисилоксаны (производство)'],
                ['1.49.6', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полистиролы (производство)'],
                ['1.49.7', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ПолиуретаныА (пенополиуретан) (производство)'],
                ['1.49.8', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Полиэфиры (лавсан) (производство)'],
                ['1.49.9', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Угле- и органопластики'],
                ['1.49.10', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Углеродные волокнистые материалы на основе гидратцеллюлозных волокон и углеродные волокнистые материалы на основе полиакрилонитрильных волокон'],
                ['1.49.11', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ФенопластыАФ (фенольная смола, бакелитовый лак) (производство)'],
                ['1.49.12', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Фторопласты (политетрафторэтилен®, тефлон) (производство и термическая обработка)'],
                ['1.49.13', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ФуранА, фуран-2-альдегидА, 2,5- фурандионА'],
                ['1.49.14', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Эпоксидные полимерыА (эпоксидные смолы, компаунды, клеи) (производство и применение)'],
                ['1.50', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[17]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Технические смеси углеводородов: нефти, бензины1*, коксы®, керосины, уайт-спирит1*, мазуты, битумы, асфальты, каменноугольные и нефтяные смолык, пекик, возгоны каменноугольных смол и пековк, масла минеральныек, (кроме высокоочищенных белых медицинских, пищевых, косметических и белых технических масел), сланцевые смолыАК и маслаАК, скипидарА, бисхлорметиловый и хлорметиловый (технические) эфиры: хлорметоксиметанк, газы шинного производства^ вулканизационныек'],
                ['1.51', [], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Агрохимикаты, в том числе'],
                ['1.51.1', [
                    arResearch[0]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Фосфорные удобрения (аммофос, нитрофоска)'],
                ['1.51.2', [
                    arResearch[0]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Азотные удобрения (нитрат аммония - аммиачная селитра, нитраты натрия, калия)'],
                ['1.52', [], [], 'Фармакологические средства, в том числе:'],
                ['1.52.1', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'АнтибиотикиА (производство и применение)'],
                ['1.52.2', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Противоопухолевые препаратыАК (производство и применение)'],
                ['1.52.3', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'СульфаниламидыА (производство и применение)'],
                ['1.52.4', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Гормоны (производство и применение)'],
                ['1.52.5', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'ВитаминыА (производство, применение)'],
                ['1.52.6', [
                    arResearch[4]._id
                ], [
                    arSpecialty[1]._id,
                ], 'Наркотики, психотропные препараты (производство)'],
                ['1.52.7', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Фармакологические средства, не вошедшие в подпункты 1.52.1 - 1.52.6 (производство)'],
                ['1.53', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Ядохимикаты, в том числе:'],
                ['1.53.1', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Гербициды'],
                ['1.53.2', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Инсектициды'],
                ['2.1', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Грибы продуцентыА, белково- витаминные концентраты (БВК), кормовые дрожжиА, комбикормаА'],
                ['2.2', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ],'Ферментные препаратыА, биостимуляторы'],
                ['2.3', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[36]._id,
                    arResearch[37]._id,
                    arResearch[38]._id,
                    arResearch[39]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Аллергены для диагностики и леченияА, компоненты и препараты крови, иммунобиологические препаратыА'],
                ['2.4', [], [], 'Патогенные биологические агенты (ПБА) - патогенные для человека микроорганизмы - возбудители инфекционных заболеваний (бактерии, вирусы, хламидии, риккетсии, грибы, гельминты, членистоногие), включая генно-инженерно- модифицированные, яды биологического происхождения (токсины), а также любые объекты и материалы (включая полевой, клинический, секционный), подозрительные на содержание перечисленных агентов:'],
                ['2.4.1', [
                    arResearch[21]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[6]._id
                ], 'Возбудители инфекционных заболеваний патогенные микроорганизмы I группы патогенности и возбудители особо опасных инфекций'],
                ['2.4.2', [
                    arResearch[17]._id,
                    arResearch[22]._id,
                    arResearch[23]._id,
                    arResearch[24]._id,
                    arResearch[25]._id,
                    arResearch[40]._id,
                    arResearch[41]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Возбудители инфекционных заболеваний патогенные микроорганизмы II группы патогенности, в т.ч. вирусы гепатитов Вк и Ск, вирус иммунодефицита 1-го типа (ВИЧ- 1К-СПИД)'],
                ['2.4.3', [], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Возбудители инфекционных заболеваний патогенные микроорганизмы III и IV групп патогенности и возбудители паразитарных заболеваний (гельминты, членистоногие)'],
                ['2.4.4', [
                    arResearch[0]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Биологические токсины (микробного, растительного и животного происхождения)'],
                ['2.4.5', [
                    arResearch[0]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'У словно-патогенные микроорганизмы - возбудители инфекционных заболеваний (в том числе аллергозов)'],
                ['3.1', [], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Аэрозоли преимущественно фиброгенногоф и смешанного типа действия, включая:'],
                ['3.1.1', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Аэрозоли абразивные и абразивсодержащие (электрокорундов, карбида бора, альбора, карбида кремния), в том числе с примесью связующих (фенолформальдегидные смолыАФ, эпоксидные смолыАФ)'],
                ['3.1.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Аэрозоли металлов (железо, алюминий, титан, вольфрам) и их сплавов (кремниемедистый, диАлюминий триоксид в смеси со сплавом никеля до 15%, феррохром: сплав хрома 65% с железом, диАлюминий триоксид с примесью кремний диоксида до 15% и диЖелезо триоксида до 10%), в том числе образовавшиеся в процессе сухой шлифовки (чугун в смеси с элктрокорундом до 30%)ФА, получения металлических порошковФА'],
                ['3.1.3', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Кремний диоксид кристаллический а-кварцк, а-кристобалитк, а- тридимитФА'],
                ['3.1.4', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Кремнийсодержащие аэрозоли: - с содержанием кристаллического диоксида кремнияк - с содержанием аморфного диоксида кремния в виде аэрозоля дезинтеграции и конденсации - кремний карбид, кремний нитрид, волокнистый карбид кремнияФА'],
                ['3.1.5', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Огнеупорные материалы (шамотнографитовые огнеупоры), муллитовые (неволокнистые) огнеупоры, магнезиально-силикатные (форстеритовые) огнеупоры, муллито-кремнеземистые, не содержащие и содержащие до 5% Сг3+'],
                ['3.1.6', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Руды полиметаллические и содержащие цветные и редкие металлы*'],
                ['3.1.7', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[15]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Сварочные аэрозоли, представляющие сложную смесь АПФД (кремний диоксид аморфный в смеси с оксидами марганца в виде аэрозоля конденсации, дижелезо триоксид, титан диоксид, вольфрам, алюминий и его соединения) и химических веществ разной природы: аэрозоли металлов (в том числе марганца1*, цинка*, хрома (VI)K, хрома (Ш) *, бериллияРКА, никеляк, хром трифторида*), газы, обладающие остронаправленным действием на организм0'],
                ['3.1.8', [], [], 'Силикатсодержащие пыли, силикаты, алюмосиликаты, в том числе:'],
                ['3.1.8.1', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Асбесты природные (хризотил к, тремолит к), смешанные асбестопородные пылик, асбестоцемент1*-, асбестобакелитк, асбесто- резинаФК'],
                ['3.1.8.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Глина, в т.ч. высокоглинистая огнеупорная, цемент, оливин, апатит, шамот коалиновыйФА'],
                ['3.1.8.3', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Тальк, талькопородные пыли, цеолиты, бокситы, нефелиновые сиениты, дистенсиллиманиты, слюды (флагопит, мусковит), дуниты, известняки, бариты, инфузорная земля, туфы, пемзы, перлит, искусственные минеральные волокна (стекловолокноФА, стекловатаФА, вата минеральнаяФА и шлаковаяФА), пыль стеклаФА и стеклянных строительных материалов®*'],
                ['3.1.9', [], [], 'Углерода пыли, в том числе:'],
                ['3.1.9.1', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id
                ], 'Алмазы природные®, искусственные®, металлизированные®'],
                ['3.1.9.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Антрацит® и другие ископаемые угли® и углеродные пыли®'],
                ['3.1.9.3', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Коксы - каменноугольныйФК, пековыйФК, нефтянойФК, сланцевыйфк'],
                ['3.1.9.4', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Сажи черные промышленныеФК'],
                ['3.1.10', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Шлаки (шлак угольный молотый, строительные материалы на его основе: шлакоблоки, шлакозит; шлак, образующийся при выплавке низколегированных сталей (неволокнистая пыль)'],
                ['3.2', [
                    arResearch[0]._id,
                    arResearch[1]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Пыли железорудныхФК и полиметаллических концентратовФК, металлургических агломератовФА'],
                ['3.3', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Сера®'],
                ['3.4', [
                    arResearch[0]._id,
                    arResearch[1]._id,
                    arResearch[2]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Пыль животного и растительного происхожденияАФ (с примесью диоксида кремнияАФ, зерноваяАФ, лубянаяАФ, хлопчатобумажнаяАФ, хлопковаяАФ, льнянаяАФ, шерстяная*®, пуховая*®, натурального шелка хлопковая мука (по белку)*, мучная*®, древесная твердых пород деревьевКФА, кожевеннаяк, торфа, хмеля, конопли, кенафа, джута, табака*)'],
                ['4.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[6]._id,
                    arResearch[8]._id,
                    arResearch[16]._id,
                    arResearch[17]._id,
                    arResearch[19]._id,
                    arResearch[26]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Ионизирующие излученияк, радиоактивные веществак'],
                ['4.2', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Неионизирующие излучения, в том числе:'],
                ['4.2.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Электромагнитное излучение оптического диапазона (ультрафиолетовое излучениек, лазерное излучение)'],
                ['4.2.2', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Электромагнитное поле радиочастотного диапазона (10 кГц - 300 ГГц)'],
                ['4.2.3', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Электрическое и магнитное поле промышленной частоты (50 Гц)'],
                ['4.2.4', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Постоянное электрическое и магнитное поле'],
                ['4.2.5', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[16]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                ], 'Электромагнитное поле широкополосного спектра частот (5 Гц - 2 кГц, 2кГц - 400 кГц)'],
                ['4.3', [], [], 'Вибрация:'],
                ['4.3.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[26]._id,
                    arResearch[27]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Локальная вибрация'],
                ['4.3.2', [
                    arResearch[14]._id,
                    arResearch[26]._id,
                    arResearch[27]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Общая вибрация (транспортная, транспортно-технологическая, технологическая)'],
                ['4.4', [
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [], 'Шум'],
                ['4.5', [
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[2]._id
                ], 'Ультразвук воздушный, ультразвук контактный'],
                ['4.6', [
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[2]._id
                ], 'Инфразвук'],
                ['4.7', [
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Параметры охлаждающего микроклимата (температура, влажность, скорость движения воздуха)'],
                ['4.8', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Параметры нагревающего микроклимата (температура, индекс тепловой нагрузки среды, влажность, тепловое излучение)'],
                ['4.9', [
                    arResearch[2]._id,
                    arResearch[4]._id
                ], [
                    arSpecialty[1]._id,
                ], 'Освещенность рабочей поверхности'],
                ['4.10', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Пониженное давление воздушной и (или) газовой сред и пониженное парциальное давление кислорода во вдыхаемом воздухе или искусственной дыхательной газовой смеси в случае, если указанное давление необходимо поддерживать в производственных зданиях, помещениях и (или) сооружениях в соответствии с применяемой технологией работ (за исключением работ, указанных в пунктах 19-21 раздела VI)'],
                ['5.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[26]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[3]._id
                ], 'Тяжесть трудового процесса Подъем, перемещение, удержание груза вручную Стереотипные рабочие движения. Рабочее положение тела работника (длительное нахождение работника в положении «стоя», «сидя» без перерывов, «лежа», «на коленях», «на корточках», с наклоном или поворотом туловища, с поднятыми выше уровня плеч руками, с неудобным размещением ног, с невозможностью изменения взаимного положения различных частей тела относительно друг друга, длительное перемещение работника в пространстве) Работы, связанные с постоянной ходьбой и работой стоя в течение всего рабочего дня'],
                ['5.2', [], [], 'Напряженность трудового процесса (сенсорные нагрузки), в том числе:'],
                ['5.2.1', [
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[12]._id,
                    arResearch[13]._id,
                    arResearch[26]._id,
                    arResearch[29]._id
                ], [
                    arSpecialty[1]._id,
                ], 'Работы с оптическими приборами (более 50% времени смены)'],
                ['5.2.2', [
                    arResearch[30]._id
                ], [
                    arSpecialty[2]._id
                ], 'Нагрузка на голосовой аппарат (суммарное количество часов, наговариваемое в неделю, более 20)'],
                ['6', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Работы на высоте:'],
                ['6.1', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Работы с высоким риском падения работника с высоты, а также работы на высоте без применения средств подмащивания, выполняемые на высоте 5 м и более; работы, выполняемые на площадках на расстоянии менее 2 м от неогражденных (при отсутствии защитных ограждений) перепадов по высоте более 5 м либо при высоте ограждений, составляющей менее 1,1 м'],
                ['6.2', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Прочие работы, относящиеся в соответствии с законодательством по охране труда к работам на высоте'],
                ['7', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Работа лифтера на лифтах скоростных (от 2,0 до 4,0 м/с) и высокоскоростных (свыше 4,0 м/с) при внутреннем сопровождении лифта'],
                ['8', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Работы в качестве крановщика (машиниста крана, машинист крана автомобильного)'],
                ['9', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Работы, связанные с техническим обслуживанием электроустановок напряжением 50 В и выше переменного тока и 75 В и выше постоянного тока, проведением в них оперативных переключений, выполнением строительных, монтажных, наладочных, ремонтных работ, испытанием и измерением'],
                ['10', [
                    arResearch[2]._id,
                    arResearch[3]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Работы по валке, сплаву, транспортировке, первичной обработке, охране и восстановлению лесов'],
                ['11', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[17]._id,
                    arResearch[28]._id,
                    arResearch[31]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id
                ], 'Работы в особых географических регионах с местами проведения работ, транспортная доступность которых от медицинских учреждений, оказывающих специализированную медицинскую помощь в экстренной форме, превышает 60 минут, а именно:'],
                ['11.1', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[17]._id,
                    arResearch[28]._id,
                    arResearch[31]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id
                ], 'Работы в нефтяной и газовой промышленности, выполняемые в районах Крайнего Севера и приравненных к ним местностях, а также при морском бурении'],
                ['11.2', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[17]._id,
                    arResearch[28]._id,
                    arResearch[31]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id
                ], 'Работы на гидрометеорологических станциях, сооружениях связи'],
                ['11.3', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[17]._id,
                    arResearch[28]._id,
                    arResearch[31]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id
                ], 'Работы, не указанные в подпунктах 11.1, 11.2, выполняемые по срочным трудовым договорам в районах Крайнего Севера и приравненных к ним местностях (в отношении проведения предварительных медицинских осмотров для работников, приезжающих на работу в районы Крайнего Севера и приравненные к ним местности из других местностей)'],
                ['11.4', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[17]._id,
                    arResearch[28]._id,
                    arResearch[31]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id
                ], 'Работы, выполняемые вахтовым методом в необжитых, отдаленных районах и районах с особыми природными условиями (в отношении проведения предварительных медицинских осмотров для работников, выполняющих работу вахтовым методом в указанных районах)'],
                ['12', [
                    arResearch[0]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы, непосредственно связанные с обслуживанием оборудования, работающего под избыточным давлением более 0,07 мегапаскаля (МПа) и подлежащего учету в органах Ростехнадзора:\n' +
                'а)\tпара, газа (в газообразном, сжиженном состоянии);\n' +
                'б)\tводы при температуре более 115 °C;\n' +
                'в)\tиных жидкостей при температуре, превышающей температуру их кипения при избыточном давлении 0,07 МПа\n'],
                ['13', [
                    arResearch[0]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы, непосредственно связанные с применением легковоспламеняющихся и взрывчатых материалов, работы во взрыво- и пожароопасных производствах, работы на коксовой батарее на открытых производственных зонах'],
                ['14', [
                    arResearch[0]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id
                ], 'Работы, выполняемые аварийно-спасательной службой, аварийно- спасательными формированиями, спасателями, а также работы, выполняемые пожарной охраной при тушении пожаров'],
                ['15', [
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Работы, выполняемые непосредственно на механическом оборудовании, имеющем открытые движущиеся (вращающиеся) элементы конструкции, в случае если конструкцией оборудования не предусмотрена защита (ограждение) этих элементов (в том числе токарные, фрезерные и другие станки, штамповочные прессы)'],
                ['16', [
                    arResearch[0]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Подземные работы, включая работы на рудниках'],
                ['17', [
                    arResearch[0]._id,
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы, выполняемые непосредственно с применением средств индивидуальной защиты органов дыхания изолирующих и средств индивидуальной защиты органов дыхания фильтрующих с полной лицевой частью'],
                ['18', [], [], 'Управление наземными транспортными средствами2:'],
                ['18.1', [
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[13]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Категории «А», «В», «ВЕ», трактора и другие самоходные машины, мини-трактора, мотоблоки, автопогрузчики, электрокары, регулировщики и т.п., автомобили всех категорий с ручным управлением для инвалидов, мотоколяски для инвалидов'],
                ['18.2', [
                    arResearch[3]._id,
                    arResearch[4]._id,
                    arResearch[13]._id,
                    arResearch[14]._id,
                    arResearch[28]._id,
                    arResearch[32]._id,
                    arResearch[33]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id
                ], 'Категории «С», «С1», «СЕ», «Db>, «DIE», трамвай, троллейбус'],
                ['19', [], [], 'Водолазные работы:'],
                ['19.1', [
                    arResearch[0]._id,
                    arResearch[14]._id,
                    arResearch[16]._id,
                    arResearch[20]._id,
                    arResearch[31]._id,
                    arResearch[34]._id,
                    arResearch[35]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id,
                    arSpecialty[5]._id
                ], 'Водолазные работы на глубинах до 60 м (в аварийных случаях до 80 м с применением воздуха для дыхания), за исключением водолазных работ, указанных в пункте 19.3'],
                ['19.2', [
                    arResearch[0]._id,
                    arResearch[2]._id,
                    arResearch[22]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id,
                    arSpecialty[5]._id
                ], 'Водолазные работы на глубинах более 60 метров, выполняемые методом кратковременных погружений'],
                ['19.3', [
                    arResearch[31]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id,
                    arSpecialty[5]._id
                ], 'Водолазные работы, выполняемые методом длительного пребывания в условиях повышенного давления водной и газовой сред'],
                ['20', [
                    arResearch[14]._id,
                    arResearch[16]._id,
                    arResearch[28]._id,
                    arResearch[34]._id,
                    arResearch[36]._id,
                    arResearch[37]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id,
                    arSpecialty[5]._id
                ], 'Работы по оказанию медицинской помощи внутри барокамеры при проведении лечебной рекомпресии или гипербарической оксигенации'],
                ['21', [
                    arResearch[0]._id,
                    arResearch[14]._id,
                    arResearch[16]._id,
                    arResearch[20]._id,
                    arResearch[28]._id,
                    arResearch[34]._id,
                    arResearch[35]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id,
                    arSpecialty[4]._id,
                    arSpecialty[5]._id
                ], 'Кессонные работы, работы в барокамерах и других устройствах в условиях повышенного давления воздушной и газовой среды (за исключением работ, указанных в пунктах 19 и 20)'],
                ['22', [
                    arResearch[14]._id,
                    arResearch[28]._id
                ], [
                    arSpecialty[1]._id,
                    arSpecialty[2]._id,
                    arSpecialty[3]._id
                ], 'Работы, при выполнении которых разрешено ношение оружия и его применение (в случаях, когда требования о прохождении медицинских осмотров (освидетельствований) не установлены статьями 12 и 13 Федерального закона от 13 декабря 1996 г. № 150- ФЗ «Об оружии» и (или) профильным (специальным) законом)'],
                ['23', [
                    arResearch[17]._id,
                    arResearch[20]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы, где имеется контакт с пищевыми продуктами в процессе их производства, хранения, транспортировки и реализации (в организациях пищевых и перерабатывающих отраслей промышленности, сельского хозяйства, пунктах, базах, складах хранения и реализации, в транспортных организациях, организациях торговли, общественного питания, на пищеблоках всех учреждений и организаций)'],
                ['24', [
                    arResearch[20]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы на водопроводных сооружениях, имеющие непосредственное отношение к подготовке воды, а также обслуживанию водопроводных сетей'],
                ['25', [
                    arResearch[17]._id,
                    arResearch[20]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы в организациях, деятельность которых связана с воспитанием и обучением детей'],
                ['26', [
                    arResearch[17]._id,
                    arResearch[20]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы в организациях, деятельность которых связана с коммунальным и бытовым обслуживанием населения'],
                ['27', [
                    arResearch[17]._id,
                    arResearch[20]._id
                ], [
                    arSpecialty[0]._id,
                    arSpecialty[2]._id,
                    arSpecialty[4]._id
                ], 'Работы в медицинских организациях'],
            ]

            arHarmfulFactor = arHarmfulFactor.map((item, i)=>{
                return {code: item[0], research_ids: item[1], specialist_ids: item[2], name: item[3]}
            })

            let collectionHarmfulFactor = DB.Client.collection('hf')
            await collectionHarmfulFactor.insert(arHarmfulFactor)

            res.status(200).json({
                code: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RInit'}, ...err})
    }

}