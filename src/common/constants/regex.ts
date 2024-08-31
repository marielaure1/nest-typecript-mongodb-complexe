const regex = {
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, // Au moins une lettre minuscule, une majuscule, un chiffre, et au moins 6 caractères
	phone: /^\+?(\d{1,3})?[-.\s]?\d{9,12}$/, // Gère les numéros de téléphone avec un préfixe international optionnel
	email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Validation des emails avec un domaine valide
};

export default regex;
