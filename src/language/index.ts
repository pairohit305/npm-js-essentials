import languageJSON from "./language.json";

/**
 * Get the all country code list based on Google translation which it supports
 */
export function getLanguageList() {
  return languageJSON as { [key in Language]: string };
}

export function getLanguageEntries(): [Language, string][] {
  return [
    ["tg", "Тоҷик"],
    ["is", "Íslenskur"],
    ["bs", "Bosanski"],
    ["en", "English"],
    ["gd", "Gàidhlig na h-Alba"],
    ["ga", "Gaeilge"],
    ["ig", "Iya"],
    ["de", "Deutsche"],
    ["sl", "Slovenščina"],
    ["cy", "Cymraeg"],
    ["lo", "ໄທລິດ"],
    ["eo", "Esperanto"],
    ["cs", "čeština"],
    ["bn", "বাংলা"],
    ["ru", "русский"],
    ["ro", "Română"],
    ["sr", "Српски"],
    ["gu", "ગુજરાતી"],
    ["mn", "Монгол"],
    ["km", "ខ្មែរ"],
    ["zh-TW", "中國傳統的）"],
    ["fi", "Suomalainen"],
    ["lt", "Lietuviai"],
    ["zh-CN", "简体中文）"],
    ["kn", "ಕನ್ನಡಕ"],
    ["ps", "پښتو"],
    ["ca", "Català"],
    ["kk", "Қазақ"],
    ["uz", "O'zbek tili"],
    ["mt", "Maltiż"],
    ["el", "Ελληνικά"],
    ["ka", "ქართული"],
    ["ja", "日本語"],
    ["ky", "Кыргызча"],
    ["iw", "עִברִית"],
    ["hmn", "Hmoob"],
    ["la", "Latine"],
    ["sq", "Shqiptar"],
    ["yi", "יידיש"],
    ["hu", "Magyar"],
    ["ms", "Bahasa Melayu"],
    ["sk", "Slovenský"],
    ["fr", "français"],
    ["id", "bahasa Indonesia"],
    ["yo", "Yoruba"],
    ["ha", "Hausa"],
    ["hy", "հայերեն"],
    ["lb", "Lëtzebuergesch"],
    ["be", "Беларускі"],
    ["sd", "سنڌي"],
    ["mg", "Malagasy"],
    ["he", "עִברִית"],
    ["st", "Sesotho"],
    ["haw", "Ōlelo Hawaiʻi"],
    ["fa", "فارسی"],
    ["mi", "Maori"],
    ["hr", "Hrvatski"],
    ["gl", "Galego"],
    ["eu", "Euskara"],
    ["pa", "ਪੰਜਾਬੀ"],
    ["vi", "Tiếng Việt"],
    ["uk", "Український"],
    ["zu", "IsiZulu"],
    ["it", "Italiana"],
    ["xh", "isiXhosa"],
    ["ht", "Kreyòl ayisyen"],
    ["su", "Sundanese"],
    ["az", "Azərbaycanlı"],
    ["nl", "Nederlands"],
    ["auto", "Automatic"],
    ["fy", "Frysk"],
    ["ceb", "Salida"],
    ["bg", "български"],
    ["pt", "Português"],
    ["da", "dansk"],
    ["sn", "Shona"],
    ["pl", "Polskie"],
    ["mr", "मराठी"],
    ["ny", "Chichewa"],
    ["co", "Corsu"],
    ["ur", "اردو"],
    ["si", "සිංහල"],
    ["sv", "svenska"],
    ["mk", "Македонец"],
    ["ar", "عربي"],
    ["af", "Aan Afrikaans"],
    ["te", "తెలుగు"],
    ["ku", "Kurdî (Kurmancî)"],
    ["tr", "Türk"],
    ["ne", "नेपाली"],
    ["tl", "Filipino"],
    ["ml", "മലയാളം"],
    ["my", "မြန်မာ (မြန်မာ)"],
    ["jw", "Jawa"],
    ["th", "ไทย"],
    ["ko", "한국어"],
    ["am", "አማርኛ"],
    ["no", "norsk"],
    ["et", "Eesti keel"],
    ["lv", "Latviešu valoda"],
    ["sw", "Kiswahili"],
    ["hi", "हिन्दी"],
    ["sm", "Gagana Samoa"],
    ["ta", "தமிழ்"],
    ["so", "Soomaali"],
    ["es", "Española"],
  ];
}

type Language =
  | "zh-CN"
  | "zh-TW"
  | "af"
  | "am"
  | "ar"
  | "auto"
  | "az"
  | "be"
  | "bg"
  | "bn"
  | "bs"
  | "ca"
  | "ceb"
  | "co"
  | "cs"
  | "cy"
  | "da"
  | "de"
  | "el"
  | "en"
  | "eo"
  | "es"
  | "et"
  | "eu"
  | "fa"
  | "fi"
  | "fr"
  | "fy"
  | "ga"
  | "gd"
  | "gl"
  | "gu"
  | "ha"
  | "haw"
  | "he"
  | "hi"
  | "hmn"
  | "hr"
  | "ht"
  | "hu"
  | "hy"
  | "id"
  | "ig"
  | "is"
  | "it"
  | "iw"
  | "ja"
  | "jw"
  | "ka"
  | "kk"
  | "km"
  | "kn"
  | "ko"
  | "ku"
  | "ky"
  | "la"
  | "lb"
  | "lo"
  | "lt"
  | "lv"
  | "mg"
  | "mi"
  | "mk"
  | "ml"
  | "mn"
  | "mr"
  | "ms"
  | "mt"
  | "my"
  | "ne"
  | "nl"
  | "no"
  | "ny"
  | "pa"
  | "pl"
  | "ps"
  | "pt"
  | "ro"
  | "ru"
  | "sd"
  | "si"
  | "sk"
  | "sl"
  | "sm"
  | "sn"
  | "so"
  | "sq"
  | "sr"
  | "st"
  | "su"
  | "sv"
  | "sw"
  | "ta"
  | "te"
  | "tg"
  | "th"
  | "tl"
  | "tr"
  | "uk"
  | "ur"
  | "uz"
  | "vi"
  | "xh"
  | "yi"
  | "yo"
  | "zu";

export function getLanguageFullname(language: Language) {
  return languageJSON[language];
}
