import languageJSON from "./language.json";

/**
 * Get the all country code list
 */
export function getLanguageList() {
  return languageJSON as { [key in Language]: string };
}
export function getLanguageEntries(): [Language, string][] {
  return [
    ["AB", "аҧсуа"],
    ["AA", "Afaraf"],
    ["AF", "Afrikaans"],
    ["AK", "Akan"],
    ["SQ", "Shqip"],
    ["AM", "አማርኛ"],
    ["AR", "العربية"],
    ["AN", "Aragonés"],
    ["HY", "Հայերեն"],
    ["AS", "অসমীয়া"],
    ["AV", "авар мацӀ, магӀарул мацӀ"],
    ["AE", "avesta"],
    ["AY", "aymar aru"],
    ["AZ", "azərbaycan dili"],
    ["BM", "bamanankan"],
    ["BA", "башҡорт теле"],
    ["EU", "euskara, euskera"],
    ["BE", "Беларуская"],
    ["BN", "বাংলা"],
    ["BH", "भोजपुरी"],
    ["BI", "Bislama"],
    ["BS", "bosanski jezik"],
    ["BR", "brezhoneg"],
    ["BG", "български език"],
    ["MY", "ဗမာစာ"],
    ["CA", "Català"],
    ["CH", "Chamoru"],
    ["CE", "нохчийн мотт"],
    ["NY", "chiCheŵa, chinyanja"],
    ["ZH", "中文 (Zhōngwén), 汉语, 漢語"],
    ["CV", "чӑваш чӗлхи"],
    ["KW", "Kernewek"],
    ["CO", "corsu, lingua corsa"],
    ["CR", "ᓀᐦᐃᔭᐍᐏᐣ"],
    ["HR", "hrvatski"],
    ["CS", "česky, čeština"],
    ["DA", "dansk"],
    ["DV", "ދިވެހި"],
    ["NL", "Nederlands, Vlaams"],
    ["EN", "English"],
    ["EO", "Esperanto"],
    ["ET", "eesti, eesti keel"],
    ["EE", "Eʋegbe"],
    ["FO", "føroyskt"],
    ["FJ", "vosa Vakaviti"],
    ["FI", "suomi, suomen kieli"],
    ["FR", "français, langue française"],
    ["FF", "Fulfulde, Pulaar, Pular"],
    ["GL", "Galego"],
    ["KA", "ქართული"],
    ["DE", "Deutsch"],
    ["EL", "Ελληνικά"],
    ["GN", "Avañeẽ"],
    ["GU", "ગુજરાતી"],
    ["HT", "Kreyòl ayisyen"],
    ["HA", "Hausa, هَوُسَ"],
    ["HE", "עברית"],
    ["IW", "עברית"],
    ["HZ", "Otjiherero"],
    ["HI", "हिन्दी, हिंदी"],
    ["HO", "Hiri Motu"],
    ["HU", "Magyar"],
    ["IA", "Interlingua"],
    ["ID", "Bahasa Indonesia"],
    ["IE", "Originally called Occidental; then Interlingue after WWII"],
    ["GA", "Gaeilge"],
    ["IG", "Asụsụ Igbo"],
    ["IK", "Iñupiaq, Iñupiatun"],
    ["IO", "Ido"],
    ["IS", "Íslenska"],
    ["IT", "Italiano"],
    ["IU", "ᐃᓄᒃᑎᑐᑦ"],
    ["JA", "日本語 (にほんご／にっぽんご)"],
    ["JV", "basa Jawa"],
    ["KL", "kalaallisut, kalaallit oqaasii"],
    ["KN", "ಕನ್ನಡ"],
    ["KR", "Kanuri"],
    ["KS", "कश्मीरी, كشميري‎"],
    ["KK", "Қазақ тілі"],
    ["KM", "ភាសាខ្មែរ"],
    ["KI", "Gĩkũyũ"],
    ["RW", "Ikinyarwanda"],
    ["KY", "кыргыз тили"],
    ["KV", "коми кыв"],
    ["KG", "KiKongo"],
    ["KO", "한국어 (韓國語), 조선말 (朝鮮語)"],
    ["KU", "Kurdî, كوردی‎"],
    ["KJ", "Kuanyama"],
    ["LA", "latine, lingua latina"],
    ["LB", "Lëtzebuergesch"],
    ["LG", "Luganda"],
    ["LI", "Limburgs"],
    ["LN", "Lingála"],
    ["LO", "ພາສາລາວ"],
    ["LT", "lietuvių kalba"],
    ["LU", ""],
    ["LV", "latviešu valoda"],
    ["GV", "Gaelg, Gailck"],
    ["MK", "македонски јазик"],
    ["MG", "Malagasy fiteny"],
    ["MS", "bahasa Melayu, بهاس ملايو‎"],
    ["ML", "മലയാളം"],
    ["MT", "Malti"],
    ["MI", "te reo Māori"],
    ["MR", "मराठी"],
    ["MH", "Kajin M̧ajeļ"],
    ["MN", "монгол"],
    ["NA", "Ekakairũ Naoero"],
    ["NV", "Diné bizaad, Dinékʼehǰí"],
    ["NB", "Norsk bokmål"],
    ["ND", "isiNdebele"],
    ["NE", "नेपाली"],
    ["NG", "Owambo"],
    ["NN", "Norsk nynorsk"],
    ["NO", "Norsk"],
    ["II", "ꆈꌠ꒿ Nuosuhxop"],
    ["NR", "isiNdebele"],
    ["OC", "Occitan"],
    ["OJ", "ᐊᓂᔑᓈᐯᒧᐎᓐ"],
    ["CU", "ѩзыкъ словѣньскъ"],
    ["OM", "Afaan Oromoo"],
    ["OR", "ଓଡ଼ିଆ"],
    ["OS", "ирон æвзаг"],
    ["PA", "ਪੰਜਾਬੀ, پنجابی‎"],
    ["PI", "पाऴि"],
    ["FA", "فارسی"],
    ["PL", "polski"],
    ["PS", "پښتو"],
    ["PT", "Português"],
    ["QU", "Runa Simi, Kichwa"],
    ["RM", "rumantsch grischun"],
    ["RN", "kiRundi"],
    ["RO", "română"],
    ["RU", "русский язык"],
    ["SA", "संस्कृतम्"],
    ["SC", "sardu"],
    ["SD", "सिन्धी, سنڌي، سندھی‎"],
    ["SE", "Davvisámegiella"],
    ["SM", "gagana faa Samoa"],
    ["SG", "yângâ tî sängö"],
    ["SR", "српски језик"],
    ["GD", "Gàidhlig"],
    ["SN", "chiShona"],
    ["SI", "සිංහල"],
    ["SK", "slovenčina"],
    ["SL", "slovenščina"],
    ["SO", "Soomaaliga, af Soomaali"],
    ["ST", "Sesotho"],
    ["ES", "español, castellano"],
    ["SU", "Basa Sunda"],
    ["SW", "Kiswahili"],
    ["SS", "SiSwati"],
    ["SV", "svenska"],
    ["TA", "தமிழ்"],
    ["TE", "తెలుగు"],
    ["TG", "тоҷикӣ, toğikī, تاجیکی‎"],
    ["TH", "ไทย"],
    ["TI", "ትግርኛ"],
    ["BO", "བོད་ཡིག"],
    ["TK", "Türkmen, Түркмен"],
    ["TL", "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"],
    ["TN", "Setswana"],
    ["TO", "faka Tonga"],
    ["TR", "Türkçe"],
    ["TS", "Xitsonga"],
    ["TT", "татарча, tatarça, تاتارچا‎"],
    ["TW", "Twi"],
    ["TY", "Reo Tahiti"],
    ["UG", "Uyƣurqə, ئۇيغۇرچە‎"],
    ["UK", "українська"],
    ["UR", "اردو"],
    ["UZ", "zbek, Ўзбек, أۇزبېك‎"],
    ["VE", "Tshivenḓa"],
    ["VI", "Tiếng Việt"],
    ["VO", "Volapük"],
    ["WA", "Walon"],
    ["CY", "Cymraeg"],
    ["WO", "Wollof"],
    ["FY", "Frysk"],
    ["XH", "isiXhosa"],
    ["YI", "ייִדיש"],
    ["YO", "Yorùbá"],
    ["ZA", "Saɯ cueŋƅ, Saw cuengh"],
  ]
}
type Language =
  | "AB"
  | "AA"
  | "AF"
  | "AK"
  | "SQ"
  | "AM"
  | "AR"
  | "AN"
  | "HY"
  | "AS"
  | "AV"
  | "AE"
  | "AY"
  | "AZ"
  | "BM"
  | "BA"
  | "EU"
  | "BE"
  | "BN"
  | "BH"
  | "BI"
  | "BS"
  | "BR"
  | "BG"
  | "MY"
  | "CA"
  | "CH"
  | "CE"
  | "NY"
  | "ZH"
  | "CV"
  | "KW"
  | "CO"
  | "CR"
  | "HR"
  | "CS"
  | "DA"
  | "DV"
  | "NL"
  | "EN"
  | "EO"
  | "ET"
  | "EE"
  | "FO"
  | "FJ"
  | "FI"
  | "FR"
  | "FF"
  | "GL"
  | "KA"
  | "DE"
  | "EL"
  | "GN"
  | "GU"
  | "HT"
  | "HA"
  | "HE"
  | "IW"
  | "HZ"
  | "HI"
  | "HO"
  | "HU"
  | "IA"
  | "ID"
  | "IE"
  | "GA"
  | "IG"
  | "IK"
  | "IO"
  | "IS"
  | "IT"
  | "IU"
  | "JA"
  | "JV"
  | "KL"
  | "KN"
  | "KR"
  | "KS"
  | "KK"
  | "KM"
  | "KI"
  | "RW"
  | "KY"
  | "KV"
  | "KG"
  | "KO"
  | "KU"
  | "KJ"
  | "LA"
  | "LB"
  | "LG"
  | "LI"
  | "LN"
  | "LO"
  | "LT"
  | "LU"
  | "LV"
  | "GV"
  | "MK"
  | "MG"
  | "MS"
  | "ML"
  | "MT"
  | "MI"
  | "MR"
  | "MH"
  | "MN"
  | "NA"
  | "NV"
  | "NB"
  | "ND"
  | "NE"
  | "NG"
  | "NN"
  | "NO"
  | "II"
  | "NR"
  | "OC"
  | "OJ"
  | "CU"
  | "OM"
  | "OR"
  | "OS"
  | "PA"
  | "PI"
  | "FA"
  | "PL"
  | "PS"
  | "PT"
  | "QU"
  | "RM"
  | "RN"
  | "RO"
  | "RU"
  | "SA"
  | "SC"
  | "SD"
  | "SE"
  | "SM"
  | "SG"
  | "SR"
  | "GD"
  | "SN"
  | "SI"
  | "SK"
  | "SL"
  | "SO"
  | "ST"
  | "ES"
  | "SU"
  | "SW"
  | "SS"
  | "SV"
  | "TA"
  | "TE"
  | "TG"
  | "TH"
  | "TI"
  | "BO"
  | "TK"
  | "TL"
  | "TN"
  | "TO"
  | "TR"
  | "TS"
  | "TT"
  | "TW"
  | "TY"
  | "UG"
  | "UK"
  | "UR"
  | "UZ"
  | "VE"
  | "VI"
  | "VO"
  | "WA"
  | "CY"
  | "WO"
  | "FY"
  | "XH"
  | "YI"
  | "YO"
  | "ZA";
