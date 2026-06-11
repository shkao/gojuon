/* 五十音資料:46 清音(字源取自《五十音不靠背》)+ 衍生的濁音、半濁音、拗音 */
/* ===================== 資料 ===================== */
const KANA = [
{romaji:"a",mnemonic:"阿(ア)嬤住得真安(あ)心——叫一聲「阿~」就是 a",hiragana:"あ",katakana:"ア",hiraSource:"安",hiraNote:"由「安」的草書轉變而來",kataSource:"阿",kataNote:"「阿」去掉右邊的「可」,阝簡化成兩筆",examples:[{jp:"安心",kana:"あんしん",romaji:"anshin",zh:"安心"},{jp:"安静",kana:"あんせい",romaji:"ansei",zh:"病人靜養休息"},{jp:"安全",kana:"あんぜん",romaji:"anzen",zh:"安全"}]},
{romaji:"i",mnemonic:"伊(イ)人以(い)淚洗面,以=伊=i",hiragana:"い",katakana:"イ",hiraSource:"以",hiraNote:"由「以」的草書轉變而來",kataSource:"伊",kataNote:"「伊」去掉右邊的「尹」,只留亻偏旁",examples:[{jp:"可愛い",kana:"かわいい",romaji:"kawaii",zh:"可愛(卡哇伊)"},{jp:"美味しい",kana:"おいしい",romaji:"oishii",zh:"好吃(喔伊細)"},{jp:"以来",kana:"いらい",romaji:"irai",zh:"以來"}]},
{romaji:"u",mnemonic:"烏(u)漆嘛黑的宇(う/ウ)宙,嘴嘟成 u",hiragana:"う",katakana:"ウ",hiraSource:"宇",hiraNote:"由「宇」的草書轉變而來",kataSource:"宇",kataNote:"取「宇」的寶蓋頭宀的部分",examples:[{jp:"宇宙",kana:"うちゅう",romaji:"uchū",zh:"宇宙(多指外太空)"},{jp:"宇宙人",kana:"うちゅうじん",romaji:"uchūjin",zh:"外星人"},{jp:"うどん",kana:"うどん",romaji:"udon",zh:"烏龍麵"}]},
{romaji:"e",mnemonic:"在江(エ=工)邊曬衣(え),欸(e)!",hiragana:"え",katakana:"エ",hiraSource:"衣",hiraNote:"由「衣」的草書轉變而來",kataSource:"江",kataNote:"取「江」右半部的「工」字",examples:[{jp:"円",kana:"えん",romaji:"en",zh:"日圓"},{jp:"援助",kana:"えんじょ",romaji:"enjo",zh:"援助"},{jp:"江戸",kana:"えど",romaji:"edo",zh:"東京的舊地名"}]},
{romaji:"o",mnemonic:"於(お/オ)是喔(o)~原來如此",hiragana:"お",katakana:"オ",hiraSource:"於",hiraNote:"由「於」的草書轉變而來",kataSource:"於",kataNote:"取「於」左半邊「方」字再簡化",examples:[{jp:"お茶",kana:"おちゃ",romaji:"ocha",zh:"茶"},{jp:"温泉",kana:"おんせん",romaji:"onsen",zh:"溫泉"},{jp:"おばさん",kana:"おばさん",romaji:"obasan",zh:"歐巴桑"}]},
{romaji:"ka",mnemonic:"加(か/カ)油!台語唸 ka-iû,加=ka",hiragana:"か",katakana:"カ",hiraSource:"加",hiraNote:"源自「加」,右邊一點是口演變而來",kataSource:"加",kataNote:"取「加」左半部的「力」字",examples:[{jp:"加法",kana:"かほう",romaji:"kahō",zh:"加法"},{jp:"看板",kana:"かんばん",romaji:"kanban",zh:"廣告招牌(臺語砍棒)"},{jp:"カラオケ",kana:"カラオケ",romaji:"karaoke",zh:"卡拉OK"}]},
{romaji:"ki",mnemonic:"機(幾)車的機,台語唸 ki(き/キ)",hiragana:"き",katakana:"キ",hiraSource:"幾",hiraNote:"源自「幾」字的草書體",kataSource:"幾",kataNote:"源自「幾」字的部分筆劃",examples:[{jp:"気持ち",kana:"きもち",romaji:"kimochi",zh:"感覺(奇摩子)"},{jp:"気分",kana:"きぶん",romaji:"kibun",zh:"心理加生理的感覺"},{jp:"機会",kana:"きかい",romaji:"kikai",zh:"機會"}]},
{romaji:"ku",mnemonic:"等了好久(く/ク)!台語「久」=kú",hiragana:"く",katakana:"ク",hiraSource:"久",hiraNote:"源自「久」字的草書體",kataSource:"久",kataNote:"源自「久」字的前二筆",examples:[{jp:"口",kana:"くち",romaji:"kuchi",zh:"口、嘴"},{jp:"黒",kana:"くろ",romaji:"kuro",zh:"黑"},{jp:"訓読",kana:"くんどく",romaji:"kundoku",zh:"訓讀"}]},
{romaji:"ke",mnemonic:"照計(け)畫K書,介(ケ)紹人長得像K",hiragana:"け",katakana:"ケ",hiraSource:"計",hiraNote:"源自「計」字草書體,言部一筆帶過",kataSource:"介",kataNote:"源自「介」字的簡化,長得像英文K",examples:[{jp:"計画",kana:"けいかく",romaji:"keikaku",zh:"計畫"},{jp:"健康",kana:"けんこう",romaji:"kenkō",zh:"健康"},{jp:"警察",kana:"けいさつ",romaji:"keisatsu",zh:"警察"}]},
{romaji:"ko",mnemonic:"自己(こ/コ)來,叩叩(ko)敲門",hiragana:"こ",katakana:"コ",hiraSource:"己",hiraNote:"源自「己」字草書體,省略中間一筆",kataSource:"己",kataNote:"擷取「己」字上半部,省略第三筆劃",examples:[{jp:"自己紹介",kana:"じこしょうかい",romaji:"jikoshōkai",zh:"自我介紹"},{jp:"子供",kana:"こども",romaji:"kodomo",zh:"小孩"},{jp:"口座",kana:"こうざ",romaji:"kōza",zh:"銀行戶頭"}]},
{romaji:"sa",mnemonic:"左(さ)手灑(sa)鹽,散(サ)落一地",hiragana:"さ",katakana:"サ",hiraSource:"左",hiraNote:"源自「左」字的草書體",kataSource:"散",kataNote:"擷取「散」字左邊的上半部",examples:[{jp:"左翼",kana:"さよく",romaji:"sayoku",zh:"左翼"},{jp:"左遷",kana:"させん",romaji:"sasen",zh:"降職"},{jp:"サンマ",kana:"サンマ",romaji:"sanma",zh:"秋刀魚"}]},
{romaji:"shi",mnemonic:"之(し/シ)字形溜滑梯,噓(shi)~別吵",hiragana:"し",katakana:"シ",hiraSource:"之",hiraNote:"「之」字草書體,三筆劃濃縮為一筆",kataSource:"之",kataNote:"把「之」字三筆劃解構重新組合",examples:[{jp:"親友",kana:"しんゆう",romaji:"shinyū",zh:"感情非常好的朋友"},{jp:"信用",kana:"しんよう",romaji:"shinyō",zh:"信用"},{jp:"時間",kana:"じかん",romaji:"jikan",zh:"時間"}]},
{romaji:"su",mnemonic:"相思(su)的思=寸(す);壽司 sushi 的 su(ス←須)",hiragana:"す",katakana:"ス",hiraSource:"寸",hiraNote:"「寸」字草書體,二三筆連成繞圈",kataSource:"須",kataNote:"擷取「須」字頁字最下面三筆劃",examples:[{jp:"寸法",kana:"すんぽう",romaji:"sunpō",zh:"尺寸"},{jp:"寿司",kana:"すし",romaji:"sushi",zh:"壽司"},{jp:"相撲",kana:"すもう",romaji:"sumō",zh:"相撲"}]},
{romaji:"se",mnemonic:"世(せ/セ)界的世,台語唸 sè,直接就是 se",hiragana:"せ",katakana:"セ",hiraSource:"世",hiraNote:"「世」字草書體,減省筆劃保留外觀",kataSource:"世",kataNote:"把「世」字只留下最後兩筆",examples:[{jp:"世界",kana:"せかい",romaji:"sekai",zh:"世界"},{jp:"世間",kana:"せけん",romaji:"seken",zh:"世間"},{jp:"世紀末",kana:"せいきまつ",romaji:"seikimatsu",zh:"世紀末"}]},
{romaji:"so",mnemonic:"曾(そ/ソ)爺爺好囉嗦(so)",hiragana:"そ",katakana:"ソ",hiraSource:"曾",hiraNote:"「曾」字草書體,減省筆劃保留外觀",kataSource:"曾",kataNote:"「曾」字只書寫最初的兩筆劃",examples:[{jp:"増加",kana:"ぞうか",romaji:"zōka",zh:"增加"},{jp:"卒業",kana:"そつぎょう",romaji:"sotsugyō",zh:"畢業"},{jp:"損失",kana:"そんしつ",romaji:"sonshitsu",zh:"損失"}]},
{romaji:"ta",mnemonic:"太(た)陽底下他(ta)在跑,多(タ)流汗",hiragana:"た",katakana:"タ",hiraSource:"太",hiraNote:"源自「太」字,發音和中文太相同",kataSource:"多",kataNote:"「多」字只留上半部「夕」的部分",examples:[{jp:"畳",kana:"たたみ",romaji:"tatami",zh:"榻榻米"},{jp:"太陽",kana:"たいよう",romaji:"taiyō",zh:"太陽"},{jp:"大使",kana:"たいし",romaji:"taishi",zh:"大使"}]},
{romaji:"chi",mnemonic:"知(ち)道了就去吃(chi),千(チ)碗都吃",hiragana:"ち",katakana:"チ",hiraSource:"知",hiraNote:"源自「知」字,孫過庭書譜有ち型字跡",kataSource:"千",kataNote:"由「千」字演變,保留千的形體",examples:[{jp:"知識",kana:"ちしき",romaji:"chishiki",zh:"知識"},{jp:"知恵",kana:"ちえ",romaji:"chie",zh:"智慧"},{jp:"知名度",kana:"ちめいど",romaji:"chimeido",zh:"知名度"}]},
{romaji:"tsu",mnemonic:"川(つ/ツ)水滋(tsu)滋地流",hiragana:"つ",katakana:"ツ",hiraSource:"川",hiraNote:"源自「川」字,川在日文多訓讀かわ",kataSource:"川",kataNote:"由「川」變化,橫向排列筆劃而成",examples:[{jp:"通信",kana:"つうしん",romaji:"tsūshin",zh:"通信"},{jp:"通話",kana:"つうわ",romaji:"tsūwa",zh:"通話"},{jp:"月",kana:"つき",romaji:"tsuki",zh:"月亮"}]},
{romaji:"te",mnemonic:"天(て/テ)氣熱,提茶(台語 tê)來喝",hiragana:"て",katakana:"テ",hiraSource:"天",hiraNote:"源自「天」字,天的發音和中文相同",kataSource:"天",kataNote:"保留「天」兩橫及一撇的下半部",examples:[{jp:"天婦羅",kana:"てんぷら",romaji:"tenpura",zh:"日式炸蝦炸物"},{jp:"電車",kana:"でんしゃ",romaji:"densha",zh:"電車"},{jp:"手料理",kana:"てりょうり",romaji:"teryōri",zh:"家庭手作料理"}]},
{romaji:"to",mnemonic:"停止(と/ト)!小偷(to)別跑",hiragana:"と",katakana:"ト",hiraSource:"止",hiraNote:"「止」字草書體,四筆劃精簡成兩筆",kataSource:"止",kataNote:"「止」字只書寫最初的兩筆劃",examples:[{jp:"豆腐",kana:"とうふ",romaji:"tōfu",zh:"豆腐"},{jp:"読書",kana:"どくしょ",romaji:"dokusho",zh:"讀書"},{jp:"丼",kana:"どんぶり",romaji:"donburi",zh:"丼飯"}]},
{romaji:"na",mnemonic:"無奈(な/ナ)的奈=na,奈良 Nara",hiragana:"な",katakana:"ナ",hiraSource:"奈",hiraNote:"奈字草書體演變,筆劃減省保留外觀",kataSource:"奈",kataNote:"奈字只書寫最初的兩筆劃就得到ナ",examples:[{jp:"奈良",kana:"なら",romaji:"nara",zh:"奈良"},{jp:"内科",kana:"ないか",romaji:"naika",zh:"內科"},{jp:"納豆",kana:"なっとう",romaji:"nattō",zh:"納豆"}]},
{romaji:"ni",mnemonic:"仁(に/ニ)慈待你(ni)",hiragana:"に",katakana:"ニ",hiraSource:"仁",hiraNote:"仁字草書體,左邊人字偏旁連為一筆",kataSource:"仁",kataNote:"擷取自中文仁字右半部",examples:[{jp:"日本",kana:"にほん",romaji:"nihon",zh:"日本"},{jp:"日本語",kana:"にほんご",romaji:"nihongo",zh:"日語、日文"},{jp:"煮物",kana:"にもの",romaji:"nimono",zh:"用醬汁滷煮的料理"}]},
{romaji:"nu",mnemonic:"奴(ぬ/ヌ)隸的奴=nu",hiragana:"ぬ",katakana:"ヌ",hiraSource:"奴",hiraNote:"奴字草書體,總共只用三筆劃完成",kataSource:"奴",kataNote:"擷取自中文奴字右半部",examples:[{jp:"塗り薬",kana:"ぬりぐすり",romaji:"nurigusuri",zh:"外用藥膏"},{jp:"盗人",kana:"ぬすびと",romaji:"nusubito",zh:"賊、小偷"}]},
{romaji:"ne",mnemonic:"禰(ね/ネ)豆子的禰=ne!",hiragana:"ね",katakana:"ネ",hiraSource:"祢",hiraNote:"祢字草書體,只用二筆劃完成",kataSource:"祢",kataNote:"擷取自中文祢字左半部",examples:[{jp:"寝顔",kana:"ねがお",romaji:"negao",zh:"睡著的臉"},{jp:"猫背",kana:"ねこぜ",romaji:"nekoze",zh:"駝背"},{jp:"値段",kana:"ねだん",romaji:"nedan",zh:"價格"}]},
{romaji:"no",mnemonic:"乃(の/ノ)=の=「的」,台灣招牌天天見",hiragana:"の",katakana:"ノ",hiraSource:"乃",hiraNote:"乃字草書體,總共只用一筆劃完成",kataSource:"乃",kataNote:"擷取自中文乃字的一撇",examples:[{jp:"海苔",kana:"のり",romaji:"nori",zh:"海苔"},{jp:"濃密",kana:"のうみつ",romaji:"nōmitsu",zh:"濃密"}]},
{romaji:"ha",mnemonic:"哈(ha)!笑出波(は)浪,八(ハ)字嘴",hiragana:"は",katakana:"ハ",hiraSource:"波",hiraNote:"波字草書體,三點水只用一筆劃",kataSource:"八",kataNote:"擷取自中文八字,保留完整字型",examples:[{jp:"波瀾",kana:"はらん",romaji:"haran",zh:"波瀾"},{jp:"蛤",kana:"はまぐり",romaji:"hamaguri",zh:"蛤蜊"},{jp:"八方美人",kana:"はっぽうびじん",romaji:"happōbijin",zh:"八面玲瓏,多含貶意"}]},
{romaji:"hi",mnemonic:"比(ひ/ヒ)賽贏了嘻嘻(hi)笑",hiragana:"ひ",katakana:"ヒ",hiraSource:"比",hiraNote:"ひ源自中文比字的草書體",kataSource:"比",kataNote:"擷取自中文比字的右半部",examples:[{jp:"比較",kana:"ひかく",romaji:"hikaku",zh:"比較"},{jp:"表現",kana:"ひょうげん",romaji:"hyōgen",zh:"表現"},{jp:"美少女",kana:"びしょうじょ",romaji:"bishōjo",zh:"美少女"}]},
{romaji:"fu",mnemonic:"不(ふ/フ)行!呼(fu)~先吹口氣",hiragana:"ふ",katakana:"フ",hiraSource:"不",hiraNote:"ふ源自中文不字的草書體",kataSource:"不",kataNote:"擷取不字頭兩筆劃,連接成一筆",examples:[{jp:"不可能",kana:"ふかのう",romaji:"fukanō",zh:"不可能"},{jp:"不在",kana:"ふざい",romaji:"fuzai",zh:"不在"},{jp:"不思議",kana:"ふしぎ",romaji:"fushigi",zh:"不可思議"}]},
{romaji:"he",mnemonic:"部(へ/ヘ)隊爬山嘿(he)咻,假名長得像屋頂",hiragana:"へ",katakana:"ヘ",hiraSource:"部",hiraNote:"へ源自中文部字的偏旁阝",kataSource:"部",kataNote:"ヘ同樣源自部字的偏旁阝",examples:[{jp:"部屋",kana:"へや",romaji:"heya",zh:"房間"},{jp:"弁当",kana:"べんとう",romaji:"bentō",zh:"便當"},{jp:"便利",kana:"べんり",romaji:"benri",zh:"便利"}]},
{romaji:"ho",mnemonic:"保(ほ/ホ)重齁(ho)!",hiragana:"ほ",katakana:"ホ",hiraSource:"保",hiraNote:"人字邊一筆帶過,右邊呆簡化而成",kataSource:"保",kataNote:"ホ來自保字右下部分的木",examples:[{jp:"保護",kana:"ほご",romaji:"hogo",zh:"保護"},{jp:"保育園",kana:"ほいくえん",romaji:"hoikuen",zh:"相當於托兒所"},{jp:"保険",kana:"ほけん",romaji:"hoken",zh:"保險"}]},
{romaji:"ma",mnemonic:"期末(ま/マ)了,媽(ma)在催",hiragana:"ま",katakana:"マ",hiraSource:"末",hiraNote:"ま源於中文末,保留大致的形象",kataSource:"末",kataNote:"取自末字上半部的兩橫筆",examples:[{jp:"漫画",kana:"まんが",romaji:"manga",zh:"漫畫"},{jp:"毎日",kana:"まいにち",romaji:"mainichi",zh:"每天"},{jp:"満席",kana:"まんせき",romaji:"manseki",zh:"滿座"}]},
{romaji:"mi",mnemonic:"美(み)麗的貓咪(mi),三(ミ)聲喵",hiragana:"み",katakana:"ミ",hiraSource:"美",hiraNote:"み來自中文美,加入鼻音成為mi",kataSource:"三",kataNote:"ミ寫法來自中文字三",examples:[{jp:"味噌汁",kana:"みそしる",romaji:"misoshiru",zh:"味噌湯"},{jp:"蜜柑",kana:"みかん",romaji:"mikan",zh:"蜜柑、橘子"}]},
{romaji:"mu",mnemonic:"武(む)士騎牛哞(mu)哞,牟(ム)=牛叫",hiragana:"む",katakana:"ム",hiraSource:"武",hiraNote:"武的吳音讀作む,如武者",kataSource:"牟",kataNote:"來自中文牟字的上半部",examples:[{jp:"武者",kana:"むしゃ",romaji:"musha",zh:"武者"},{jp:"無限",kana:"むげん",romaji:"mugen",zh:"無限"},{jp:"無罪",kana:"むざい",romaji:"muzai",zh:"無罪"}]},
{romaji:"me",mnemonic:"女(め/メ)生叫妹(me)妹",hiragana:"め",katakana:"メ",hiraSource:"女",hiraNote:"め即是中文「女」字的草書體",kataSource:"女",kataNote:"來自「女」第一劃下半部和第二劃",examples:[{jp:"女神",kana:"めがみ",romaji:"megami",zh:"女神"},{jp:"目線",kana:"めせん",romaji:"mesen",zh:"視線"},{jp:"名産",kana:"めいさん",romaji:"meisan",zh:"名產"}]},
{romaji:"mo",mnemonic:"毛(も/モ)台語唸 môo,直接就是 mo",hiragana:"も",katakana:"モ",hiraSource:"毛",hiraNote:"由中文字毛的草書變化而來",kataSource:"毛",kataNote:"由毛變化,只保留後半部",examples:[{jp:"毛布",kana:"もうふ",romaji:"mōfu",zh:"毛毯"},{jp:"猛暑",kana:"もうしょ",romaji:"mōsho",zh:"酷暑"},{jp:"目的",kana:"もくてき",romaji:"mokuteki",zh:"目的"}]},
{romaji:"ya",mnemonic:"也(や/ヤ)好呀(ya)!",hiragana:"や",katakana:"ヤ",hiraSource:"也",hiraNote:"由中文字「也」變化而來",kataSource:"也",kataNote:"也由「也」變化,筆劃剛硬",examples:[{jp:"野菜",kana:"やさい",romaji:"yasai",zh:"蔬菜"},{jp:"約束",kana:"やくそく",romaji:"yakusoku",zh:"約定"},{jp:"焼肉",kana:"やきにく",romaji:"yakiniku",zh:"燒肉"}]},
{romaji:"yu",mnemonic:"由(ゆ/ユ)台語唸 iû,自由的由=yu",hiragana:"ゆ",katakana:"ユ",hiraSource:"由",hiraNote:"來自「由」,讀音近臺語由來",kataSource:"由",kataNote:"也由中文字「由」擷取而來",examples:[{jp:"由来",kana:"ゆらい",romaji:"yurai",zh:"由來"},{jp:"自由",kana:"じゆう",romaji:"jiyū",zh:"自由"},{jp:"湯",kana:"ゆ",romaji:"yu",zh:"熱水、溫泉"}]},
{romaji:"yo",mnemonic:"給与(よ)你,唷(yo)!與(ヨ)你共享",hiragana:"よ",katakana:"ヨ",hiraSource:"与",hiraNote:"來自「与」,与、予、余都唸よ",kataSource:"與",kataNote:"擷取「與」字右上部分而來",examples:[{jp:"給与",kana:"きゅうよ",romaji:"kyūyo",zh:"薪資報酬"},{jp:"余地",kana:"よち",romaji:"yochi",zh:"餘地"},{jp:"ヨーロッパ",kana:"ヨーロッパ",romaji:"yōroppa",zh:"歐洲"}]},
{romaji:"ra",mnemonic:"良(ら/ラ)心好啦(ra)",hiragana:"ら",katakana:"ラ",hiraSource:"良",hiraNote:"來自「良」,同臺語良心的良音",kataSource:"良",kataNote:"由「良」的頭兩筆劃變來",examples:[{jp:"野良猫",kana:"のらねこ",romaji:"noraneko",zh:"野貓、流浪貓"},{jp:"奈良",kana:"なら",romaji:"nara",zh:"奈良"},{jp:"雷雨",kana:"らいう",romaji:"raiu",zh:"雷雨"}]},
{romaji:"ri",mnemonic:"利(り/リ)益的利=ri",hiragana:"り",katakana:"リ",hiraSource:"利",hiraNote:"由中文「利」字演變而來",kataSource:"利",kataNote:"代表「利」右半的「刂」部",examples:[{jp:"利益",kana:"りえき",romaji:"rieki",zh:"利益"},{jp:"勝利",kana:"しょうり",romaji:"shōri",zh:"勝利"},{jp:"便利",kana:"べんり",romaji:"benri",zh:"便利"}]},
{romaji:"ru",mnemonic:"留(る)下來嚕(ru),水流(ル)走了",hiragana:"る",katakana:"ル",hiraSource:"留",hiraNote:"由中文字「留」變化而來",kataSource:"流",kataNote:"由「流」的最後兩筆擷取而來",examples:[{jp:"留守",kana:"るす",romaji:"rusu",zh:"無人在家"},{jp:"留守番",kana:"るすばん",romaji:"rusuban",zh:"看家的人"},{jp:"流浪",kana:"るろう",romaji:"rurou",zh:"流浪"}]},
{romaji:"re",mnemonic:"禮(れ/レ)貌的礼=re",hiragana:"れ",katakana:"レ",hiraSource:"礼",hiraNote:"來自礼字的草書,礼通禮",kataSource:"礼",kataNote:"來自礼的右半部",examples:[{jp:"礼儀",kana:"れいぎ",romaji:"reigi",zh:"禮儀"},{jp:"蓮華",kana:"れんげ",romaji:"renge",zh:"蓮花,也指中式湯匙"},{jp:"歴史",kana:"れきし",romaji:"rekishi",zh:"歷史"}]},
{romaji:"ro",mnemonic:"呂(ろ/ロ)洞賓囉(ro)",hiragana:"ろ",katakana:"ロ",hiraSource:"呂",hiraNote:"來自「呂」,古讀音近ろ",kataSource:"呂",kataNote:"來自「呂」上面的口",examples:[{jp:"朝風呂",kana:"あさぶろ",romaji:"asaburo",zh:"早上洗澡"},{jp:"老人",kana:"ろうじん",romaji:"rōjin",zh:"老人"},{jp:"浪人",kana:"ろうにん",romaji:"rōnin",zh:"浪人"}]},
{romaji:"wa",mnemonic:"哇(wa)!和(わ/ワ)食——「和」日語就唸 wa",hiragana:"わ",katakana:"ワ",hiraSource:"和",hiraNote:"來自和字草書,和日文讀わ",kataSource:"和",kataNote:"來自「和」右半口的第一、二筆",examples:[{jp:"和服",kana:"わふく",romaji:"wafuku",zh:"日本傳統服裝"},{jp:"和食",kana:"わしょく",romaji:"washoku",zh:"和食"},{jp:"和紙",kana:"わし",romaji:"washi",zh:"和紙"}]},
{romaji:"wo",mnemonic:"遠(を)遠喔(wo)一聲;只當受詞記號用",hiragana:"を",katakana:"ヲ",hiraSource:"遠",hiraNote:"來自中文字「遠」的草書",kataSource:"乎",kataNote:"來自「乎」中的頭三劃",examples:[{jp:"地図を見る",kana:"ちずをみる",romaji:"chizu wo miru",zh:"看地圖"},{jp:"電車を降りる",kana:"でんしゃをおりる",romaji:"densha wo oriru",zh:"下電車"},{jp:"橋を渡る",kana:"はしをわたる",romaji:"hashi wo wataru",zh:"過橋"}]},
{romaji:"n",mnemonic:"无(ん)=無話可說,嗯(n)……",hiragana:"ん",katakana:"ン",hiraSource:"无",hiraNote:"來自「无」字,无通無",kataSource:"尔",kataNote:"來自中文尔,通爾",examples:[{jp:"安",kana:"あん",romaji:"an",zh:"安"},{jp:"運",kana:"うん",romaji:"un",zh:"運"},{jp:"縁",kana:"えん",romaji:"en",zh:"緣"}]}
];
const byRomaji = Object.fromEntries(KANA.map(k => [k.romaji, k]));

// 濁音/半濁音:由清音加「゛」「゜」衍生
function mk(base, romaji, hira, kata, mark) {
  const b = byRomaji[base];
  return { romaji, hiragana: hira, katakana: kata, base, mark,
    derived: true,
    note: `「${b.hiragana}」加上${mark === "゛" ? "濁點(゛)" : "半濁點(゜)"}就變成「${hira}」,發音由 ${b.romaji} 轉為${mark === "゛" ? "濁音" : "半濁音"} ${romaji}。` };
}
const DAKUON = [
  mk("ka","ga","が","ガ","゛"), mk("ki","gi","ぎ","ギ","゛"), mk("ku","gu","ぐ","グ","゛"), mk("ke","ge","げ","ゲ","゛"), mk("ko","go","ご","ゴ","゛"),
  mk("sa","za","ざ","ザ","゛"), mk("shi","ji","じ","ジ","゛"), mk("su","zu","ず","ズ","゛"), mk("se","ze","ぜ","ゼ","゛"), mk("so","zo","ぞ","ゾ","゛"),
  mk("ta","da","だ","ダ","゛"), mk("chi","ji (di)","ぢ","ヂ","゛"), mk("tsu","zu (du)","づ","ヅ","゛"), mk("te","de","で","デ","゛"), mk("to","do","ど","ド","゛"),
  mk("ha","ba","ば","バ","゛"), mk("hi","bi","び","ビ","゛"), mk("fu","bu","ぶ","ブ","゛"), mk("he","be","べ","ベ","゛"), mk("ho","bo","ぼ","ボ","゛")
];
const HANDAKUON = [
  mk("ha","pa","ぱ","パ","゜"), mk("hi","pi","ぴ","ピ","゜"), mk("fu","pu","ぷ","プ","゜"), mk("he","pe","ぺ","ペ","゜"), mk("ho","po","ぽ","ポ","゜")
];
// 拗音:い段假名 + 小寫や/ゆ/よ
const YOON_BASES = [
  ["ki","ky"], ["shi","sh"], ["chi","ch"], ["ni","ny"], ["hi","hy"], ["mi","my"], ["ri","ry"]
];
const YOON_VOICED = [
  ["gi","gy","ぎ","ギ"], ["ji","j","じ","ジ"], ["bi","by","び","ビ"], ["pi","py","ぴ","ピ"]
];
const SMALL = [["ゃ","ャ","a"], ["ゅ","ュ","u"], ["ょ","ョ","o"]];
const YOON = [];
for (const [base, prefix] of YOON_BASES) {
  const b = byRomaji[base];
  for (const [sh, sk, v] of SMALL) {
    YOON.push({ romaji: prefix + v, hiragana: b.hiragana + sh, katakana: b.katakana + sk,
      base, mark: sh, derived: true,
      note: `「${b.hiragana}」加上小寫的「${sh}」,兩個假名拼成一拍,唸作 ${prefix + v}。` });
  }
}
for (const [vr, prefix, vh, vk] of YOON_VOICED) {
  for (const [sh, sk, v] of SMALL) {
    YOON.push({ romaji: prefix + v, hiragana: vh + sh, katakana: vk + sk,
      base: vr, mark: sh, derived: true,
      note: `濁音/半濁音「${vh}」加上小寫的「${sh}」,唸作 ${prefix + v}。` });
  }
}
const SETS = {
  seion: { name: "清音", list: KANA },
  dakuon: { name: "濁音", list: DAKUON },
  handakuon: { name: "半濁音", list: HANDAKUON },
  yoon: { name: "拗音", list: YOON }
};
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const $ = id => document.getElementById(id);

