import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import eng from "./i18n/eng.json";
import est from "./i18n/est.json";

const resources = {
	eng: eng,
	est: est,
};

i18n.use(initReactI18next).init({
	resources,
	lng: localStorage.getItem("language") || "est",

	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
