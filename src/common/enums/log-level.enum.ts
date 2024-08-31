/**
 * Niveau de log utilisé dans l'application pour catégoriser les messages.
 *
 * Les niveaux disponibles sont :
 * - `TRACE` : Suivi ultra-détaillé du code.
 * - `DEBUG` : Informations pour le débogage.
 * - `INFO` : Informations générales sur le fonctionnement normal.
 * - `WARN` : Signaux d'alerte précoce.
 * - `ERROR` : Erreurs qui n'arrêtent pas l'application mais nécessitent une attention.
 * - `FATAL` : Erreurs critiques qui stoppent l'application.
 * - `CRITICAL` : Problèmes très graves qui nécessitent une réponse immédiate, mais l'application peut continuer partiellement.
 * - `EMERGENCY` : Situations d'urgence critique nécessitant une action immédiate, souvent liées à des incidents de sécurité.
 */
export enum LogLevelEnum {
	TRACE = "trace",
	DEBUG = "debug",
	INFO = "info",
	WARN = "warn",
	ERROR = "error",
	FATAL = "fatal",
	CRITICAL = "critical",
	EMERGENCY = "emergency",
}
