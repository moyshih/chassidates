export interface ChassidDate {
  id: string;
  title: string;
  hebrewTitle: string;
  hebrewDate: string;
  description: string;
  category: "chassidic";
}

export const CHASSIDIC_DATES: ChassidDate[] = [
  {
    id: "baal-shem-tov-yahrzeit",
    title: "Yahrzeit of the Baal Shem Tov",
    hebrewTitle: "יום הילולא הבעל שם טוב",
    hebrewDate: "ו' סיון",
    description: "Founder of the Chassidic movement",
    category: "chassidic"
  },
  {
    id: "maggid-yahrzeit",
    title: "Yahrzeit of the Maggid of Mezritch",
    hebrewTitle: "יום הילולא המגיד ממזריטש",
    hebrewDate: "י״ט כסלו",
    description: "Student of the Baal Shem Tov and leader of Chassidism",
    category: "chassidic"
  },
  {
    id: "alter-rebbe-yahrzeit",
    title: "Yahrzeit of the Alter Rebbe",
    hebrewTitle: "יום הילולא האדמור הזקן",
    hebrewDate: "כ״ד טבת",
    description: "Founder of Chabad Chassidism, Rabbi Shneur Zalman of Liadi",
    category: "chassidic"
  },
  {
    id: "mitteler-rebbe-yahrzeit",
    title: "Yahrzeit of the Mitteler Rebbe",
    hebrewTitle: "יום הילולא האדמור האמצעי",
    hebrewDate: "ט׳ כסלו",
    description: "Rabbi Dovber Schneuri, second Chabad Rebbe",
    category: "chassidic"
  },
  {
    id: "tzemach-tzedek-yahrzeit",
    title: "Yahrzeit of the Tzemach Tzedek",
    hebrewTitle: "יום הילולא הצמח צדק",
    hebrewDate: "י״ג ניסן",
    description: "Rabbi Menachem Mendel Schneersohn, third Chabad Rebbe",
    category: "chassidic"
  },
  {
    id: "rebbe-maharash-yahrzeit",
    title: "Yahrzeit of the Rebbe Maharash",
    hebrewTitle: "יום הילולא הרבי מהר״ש",
    hebrewDate: "י״ג תשרי",
    description: "Rabbi Shmuel Schneersohn, fourth Chabad Rebbe",
    category: "chassidic"
  },
  {
    id: "rebbe-rashab-yahrzeit",
    title: "Yahrzeit of the Rebbe Rashab",
    hebrewTitle: "יום הילולא הרבי רש״ב",
    hebrewDate: "ב׳ ניסן",
    description: "Rabbi Sholom DovBer Schneersohn, fifth Chabad Rebbe",
    category: "chassidic"
  },
  {
    id: "frierdiker-rebbe-yahrzeit",
    title: "Yahrzeit of the Frierdiker Rebbe",
    hebrewTitle: "יום הילולא הרבי הריי״צ",
    hebrewDate: "י׳ שבט",
    description: "Rabbi Yosef Yitzchak Schneersohn, sixth Chabad Rebbe",
    category: "chassidic"
  },
  {
    id: "rebbe-birthday",
    title: "Birthday of the Rebbe",
    hebrewTitle: "יום הולדת הרבי",
    hebrewDate: "י״א ניסן",
    description: "Rabbi Menachem Mendel Schneerson, seventh Chabad Rebbe",
    category: "chassidic"
  },
  {
    id: "yud-tes-kislev",
    title: "Yud Tes Kislev - Rosh Hashanah of Chassidism",
    hebrewTitle: "יו״ד טבת - ראש השנה של חסידות",
    hebrewDate: "י״ט כסלו",
    description: "Liberation of the Alter Rebbe from prison",
    category: "chassidic"
  },
  {
    id: "lag-baomer",
    title: "Lag BaOmer",
    hebrewTitle: "ל״ג בעומר",
    hebrewDate: "י״ח אייר",
    description: "Yahrzeit of Rabbi Shimon bar Yochai",
    category: "chassidic"
  },
  {
    id: "gimmel-tammuz",
    title: "Gimmel Tammuz",
    hebrewTitle: "ג׳ תמוז",
    hebrewDate: "ג׳ תמוז",
    description: "Yahrzeit of the Rebbe, Rabbi Menachem Mendel Schneerson",
    category: "chassidic"
  }
];