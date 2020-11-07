import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager} from 'react-native';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "username":"Username : ",
      "password":"Password : ",
      "language" : "Application Language : ",
      "theme" : "Application Theme : ",
      "light" : "Light theme",
      "dark" : "Dark theme",
      "en" : "English"
    }
  },
  ar: {
    translation: {
      "Welcome" : "أهلا بك :",
      "Login":"تسجيل الدخول",
      "username":" اسم ا لمستخدم :",
      "password":"كلمه السر :",
      "language" : "اللغة :",
      "theme" : "وضع اللون :",
      "dark" : "داكن",
      "light" : "فاتح",
      "ar" : "العربية"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;