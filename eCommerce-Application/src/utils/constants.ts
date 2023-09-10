export const categories = [
    {
        name: 'Космотуры',
        items: ['Релакс', 'Хобби', 'Активный Отдых'],
    },
    {
        name: 'Выбрать номер',
        items: ['Классик', 'Хард'],
    },
    {
        name: 'Сувениры',
        items: ['Стеклянные', 'Роботизированные', 'Прочее'],
    },
];

export const products = [
    {
        name: 'fire_sun_tours',
        title: 'Горящие туры на Солнце',
        details: {
            title: 'Выбрать продолжительность',
            name: ['30 минут', '2 часа', 'Весь день'],
        },
        reviews: [
            {
                autor: 'Икар',
                text: 'Отвратительно. Никому не советую.',
                stars: 1,
                starsEmpty: 4,
            },
            {
                autor: 'Стиви Уандер',
                text: 'Ничего не разглядел, но очень тепло и уютно.',
                stars: 3,
                starsEmpty: 2,
            },
        ],
    },
    {
        name: 'walk_with_stranger',
        title: 'Прогулка на корабле с чужим',
        details: {
            title: 'Выбрать длительность прогулки',
            name: ['30 минут', '2 часа', 'Весь день'],
        },
        reviews: [
            {
                autor: 'Конор',
                text: 'Прошелся - никого не встретил. И хорошо! Тьфу-тьфу.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Рипли',
                text: 'Не бойтесь. Который раз гуляю - и ничего! Отличный тур.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Чужой',
                text: 'I look forward to everyone',
                stars: 1,
                starsEmpty: 4,
            },
        ],
    },
    {
        name: 'mars_agrotours',
        title: 'Агротуры на Марс',
        details: {
            title: 'Выбрать овощную культуру',
            name: ['Помидоры', 'Огурцы', 'Картофель'],
        },
        reviews: [
            {
                autor: 'Игнат',
                text: 'Посадил 5 кустиков, ничего не взошло, как и обещали! Класс, теперь я не самый рукожопный огородник, своим скажу - я старался!',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Мэт Дэймон',
                text: 'Нечем было поливать.',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'ride-meteor',
        title: 'Покататься на метеорите',
        details: {
            title: 'Выбрать длительность полета',
            name: ['30 минут', '2 часа', 'Весь день'],
        },
        reviews: [
            {
                autor: 'Тед',
                text: 'Ну, неплохо, но ожидал большего. На новенькой тесле Илона Маска быстрее разгоняюсь.',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Рептилия',
                text: 'Читаю негативные отзывы и худею с этих людей. Вы хоть переключайте передачи, для кого коробка гиперскорости установлена?!',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'nil_armstrong',
        title: 'Посетить космические места прогулки Нила Армстронга',
        details: {
            title: 'Выбрать места прогулки',
            name: ['Луна', 'Кинопавильон'],
        },
        reviews: [
            {
                autor: 'Лёха',
                text: 'Выбрали кинопавильон. Все выглядит натуралистично, декорации отменные, вкусные напитки, поверхность Луны ни за что не отличить от настоящей! Браво!',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Серега',
                text: 'Вы чего гоните-то! Да летали они! Правда, я вот купил тур и никакого флага там не увидел, но это НИЧЕГО не меняет! За столько лет мог и потрепаться, рассыпавшись в труху.',
                stars: 2,
                starsEmpty: 3,
            },
            {
                autor: 'Михаил',
                text: 'Господа, предлагаю и здесь не развивать срач на эту тему. Мало вам форумов земных для этого было? Лучше бы свеженькую Half-life 3 обсуждали. Не зря 150 лет ждали.',
                stars: 2,
                starsEmpty: 3,
            },
        ],
    },
    {
        name: 'diving_sulfur_waterfall',
        title: 'Дайвинг под серными водопадами',
        details: {
            title: 'Выбрать количество погружений',
            name: ['2', '5', '10'],
        },
        reviews: [
            {
                autor: 'Reviewer 1',
                text: 'Отличный тур! Ставлю максимальный балл.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Елена',
                text: 'Хочу выразить вам огромную благодарность за проведенный тур в серные водопады на новогодние праздники, за интересную программу и потрясающих гидов! Бабуля была в полном восторге, а мы - в еще большем. Наконец-то квартира наша!',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'pandora',
        title: 'Посетить Пандору, выбрать своего аватара',
        details: {
            title: 'Выбрать стихию',
            name: ['Земля', 'Вода', 'Воздух'],
        },
        reviews: [
            {
                autor: 'Светлана',
                text: 'Ужасно! Дали аватар кабана. За что я деньги плачу? Чуть не  зажарили местные дикари.',
                stars: 1,
                starsEmpty: 4,
            },
            {
                autor: 'Григорий',
                text: 'Отлично поохотились. Природа - супер!',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'learn_ufo_language',
        title: 'Курсы изучения инопланетного языка',
        details: {
            title: 'Выбрать курс',
            name: ['Новичок', 'Продвинутый', 'Магистр'],
        },
        reviews: [
            {
                autor: 'Ольга',
                text: 'Недовольна. Вместо разъяснений отправляют самостоятельно читать документацию. Тесты с огромным количеством ошибок, администрация на замечания не реагирует. Но даже так появляются отличники, набравшие по 100 баллов. Они явно заглядывают в будущее больше, чем на 3 секунды!',
                stars: 2,
                starsEmpty: 3,
            },
            {
                autor: 'Полина',
                text: 'Оказалось, не так уж и сложно. Если научилась рецепты врачей читать, то здесь совсем легкотня.',
                stars: 4,
                starsEmpty: 1,
            },
        ],
    },
    {
        name: 'blow_up_asteroid',
        title: 'Спасти планету в стиле Брюса Уиллиса, взорвав астероид',
        details: {
            title: 'Выбрать размер астероида',
            name: ['Большой', 'Средний', 'Маленький'],
        },
        reviews: [
            {
                autor: 'Стэн',
                text: 'ВАУ! КУЧА ЭМОЦИЙ! Бабааах!!! Первый метеорит не очень взорвался, а третий, самый большой, - просто афигенно!',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Иван',
                text: 'некачественный, рассыпался на мелкие кусочки, за это минут две звезды. \n обслуживание хорошее, за это +3',
                stars: 3,
                starsEmpty: 2,
            },
        ],
    },
    {
        name: 'spa_on_Event_Horizon',
        title: 'Спа на горизонте событий',
        details: {
            title: 'Выбрать продолжительность',
            name: ['3 дня', '7 дней', 'Месяц'],
        },
        reviews: [
            {
                autor: 'Кеша',
                text: 'Прелестно. Лучше, чем на Таити.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Марина',
                text: 'Виды, конечно, не очень, но обслуживание - высший класс.',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'public_speaking_courses',
        title: 'Курсы ораторского искусства',
        details: {
            title: 'Выбрать уровень курса',
            name: ['Новичок', 'Джедай', 'Полиглот'],
        },
        reviews: [
            {
                autor: 'Грегори',
                text: 'Прошел курс удачно я. Сометую всем очень.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Иван',
                text: 'Ничего непонятно, но очень интересно.',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Ирина',
                text: 'Сексисты и женоненавистники! Выгнали прямо посередине курса. Ну и что, что прогуливала, и не оплачивала счета! Возмутительно!!',
                stars: 1,
                starsEmpty: 4,
            },
        ],
    },
    {
        name: 'arakis_petting_zoo',
        title: 'Контактный зоопарк планеты Аракис',
        details: {
            title: 'Выбрать продолжительность',
            name: ['30 минут', '2 часа', 'Весь день'],
        },
        reviews: [
            {
                autor: 'Мия',
                text: 'Целый день простояла там, не шелохнувшись. Стоило того!',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Том Круз',
                text: 'С ума сойти! Столько я еще не бегал. Однозначно там буду снимать новую Миссию!',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Галина',
                text: 'Летала с внуками. Полный восторг, такую песочницу мало где можно найти. Да, дороговато, но пенсия позволяет.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Стас',
                text: 'Прилетели и сразу пошли в бар. Набор напитков - моё почтение. Жаль, что так и не удалось поглазеть на зверюшек.',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Екатерина',
                text: 'Есть интересные виды животных, кого-то даже покормить можно. Минус одна звезда за то, что тушу оленя пришлось тащить самому. Детям будет интересно, взрослым, кто был в крупных зоопарках - не знаю :) Но если располагаете временем, то почему бы и не заглянуть.',
                stars: 4,
                starsEmpty: 1,
            },
        ],
    },
    {
        name: 'intergalactic_competition_in_accuracy',
        title: 'Межгалактические состязания в меткости',
        details: {
            title: 'Выбрать количество штурмовиков',
            name: ['1000', '5000', '10000'],
        },
        reviews: [
            {
                autor: 'Сара',
                text: 'Сначала заказал 1000, думал, что не справлюсь. Но какие же они мазилы! Однозначно в следующий раз 10000 возьму.',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Пётр',
                text: 'Лучший отдых в моей жизни! Всё сделано на высший балл.',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'vocal_courses',
        title: 'Курсы вокала от именитых преподавателей планеты Флостон',
        details: {
            title: 'Выбрать уровень',
            name: ['Минимальный', 'Средний', 'Максимальный'],
        },
        reviews: [
            {
                autor: 'Филипп',
                text: 'Бездарности. Ни голоса, ни харизмы. Лучше приходите в мою школу имени меня, вот где настоящий хай-левел.',
                stars: 1,
                starsEmpty: 4,
            },
            {
                autor: 'Инга',
                text: 'Плавалагуна просто лапочка, прекрасный учитель и очень внимательный гуманоид. Диапазон голоса просто космический!',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Светлана',
                text: 'После этих курсов у меня образовались камни в животе. Поэтому минус две звезды.',
                stars: 3,
                starsEmpty: 2,
            },
        ],
    },
    {
        name: 'universe_miners',
        title: 'Вольные старатели Вселенной',
        details: {
            title: 'Выбрать уровень',
            name: ['Минимальный', 'Средний', 'Максимальный'],
        },
        reviews: [
            {
                autor: 'Марк',
                text: 'Странный запрет на щелканье пальцами. А в целом - прекрасное развлечение.',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Хэнк Шрейдер',
                text: 'Друзья, я вас очень прошу. Только не путайте с МИНЕРАЛАМИ! Пожалуйста.',
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'hide_and_seek_with_predator',
        title: 'Игра в "прятки" с хищником',
        details: {
            title: 'Выбрать продолжительность',
            name: ['30 минут', '2 часа', 'Весь день'],
        },
        reviews: [
            {
                autor: 'Влад',
                text: 'Грязь - это реально тема. Не отказывайтесь, протянете дольше.',
                stars: 4,
                starsEmpty: 1,
            },
            {
                autor: 'Ольга',
                text: 'Ничего не понимаю, как он меня постоянно находит?',
                stars: 3,
                starsEmpty: 2,
            },
            {
                autor: 'Арнольд',
                text: 'Привет, дружище! Как дела? Когда снова побегаем?',
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Хищник',
                text: `I'm fine. Maybe Friday?`,
                stars: 5,
                starsEmpty: 0,
            },
            {
                autor: 'Илья',
                text: `Классно придумали! А можно объединить этот тур с Чужим? По-моему, получится еще интереснее.`,
                stars: 5,
                starsEmpty: 0,
            },
        ],
    },
    {
        name: 'galaxy_thunderstorm',
        title: 'Гроза галактики! Полное собрание приключений Звездного Лорда',
        details: {
            title: 'Выбрать книги',
            name: ['К сожалению, ничего не  найдено.'],
        },
        reviews: [
            {
                autor: 'Дракс',
                text: 'А кто это? Чем знаменит?',
                stars: 2,
                starsEmpty: 3,
            },
            {
                autor: 'Ракета',
                text: 'Согласен, бездарь. Еще и жирный.',
                stars: 1,
                starsEmpty: 4,
            },
        ],
    },
    {
        name: 'memories_of_pleasant_walk',
        title: 'Воспоминание о приятной прогулке',
        details: {
            title: 'Выбрать цвет',
            name: ['Желтый', 'Синий'],
        },
    },
    {
        name: 'best_agronomist',
        title: 'Лучший агроном вселенной',
        details: {
            title: 'Выбрать цвет',
            name: ['Желтый', 'Синий'],
        },
    },
    {
        name: 'shai-hulud_worm_egg',
        title: 'Яйцо червя Шаи-Хулуд с планеты Аракис',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'universal_ball',
        title: 'Вселенский шар',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'sulfuric_waters',
        title: 'Серные воды',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'piece_of_exploding_meteorite',
        title: 'Кусок взорвавшегося метеорита',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'life_form_rabbit',
        title: 'Форма жизни - Кролик',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'life_form_cat',
        title: 'Форма жизни - Кот',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'hide-and-seek_winner',
        title: 'Победителю в "прятках"',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'best_miner',
        title: 'Лучшему шахтеру',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'lunar_trail',
        title: 'Лунный след',
        details: {
            title: 'Выбрать количество',
            name: ['1', '2'],
        },
    },
    {
        name: 'hard_white',
        title: 'Хард white',
        details: {
            title: 'Выбрать количество дней',
            name: ['1', '3', '7', '14'],
        },
    },
    {
        name: 'hard_blue',
        title: 'Хард blue',
        details: {
            title: 'Выбрать количество дней',
            name: ['1', '3', '7', '14'],
        },
    },
    {
        name: 'classic_01',
        title: 'Классик 01',
        details: {
            title: 'Выбрать количество дней',
            name: ['1', '3', '7', '14'],
        },
    },
    {
        name: 'classic_02',
        title: 'Классик 02',
        details: {
            title: 'Выбрать количество дней',
            name: ['1', '3', '7', '14'],
        },
    },
    {
        name: 'classic_03',
        title: 'Классик 03',
        details: {
            title: 'Выбрать количество дней',
            name: ['1', '3', '7', '14'],
        },
    },
    {
        name: 'classic_04',
        title: 'Классик 04',
        details: {
            title: 'Выбрать количество дней',
            name: ['1', '3', '7', '14'],
        },
    },
];

export const serverErrorMessage = 'Сервер улетел в космос, попробуйте позже';

export function setErrorBodyDOM(err: Error): void {
    document.body.textContent = err.message;
    document.body.classList.add('error-connection');
}
