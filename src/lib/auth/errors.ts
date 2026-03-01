import type { AuthErrors } from '~/lib/auth/types';
import { m } from '~/lib/i18n/messages';

export function getAuthErrorMessage(code: keyof AuthErrors | (string & {})) {
  const AUTH_ERROR_CODES: AuthErrors = {
    USER_NOT_FOUND: m.auth_error_base_user_not_found(),
    FAILED_TO_CREATE_USER: m.auth_error_base_failed_to_create_user(),
    FAILED_TO_CREATE_SESSION: m.auth_error_base_failed_to_create_session(),
    FAILED_TO_UPDATE_USER: m.auth_error_base_failed_to_update_user(),
    FAILED_TO_GET_SESSION: m.auth_error_base_failed_to_get_session(),
    INVALID_PASSWORD: m.auth_error_base_invalid_password(),
    INVALID_EMAIL: m.auth_error_base_invalid_email(),
    INVALID_EMAIL_OR_PASSWORD: m.auth_error_base_invalid_email_or_password(),
    INVALID_USER: m.auth_error_base_invalid_user(),
    SOCIAL_ACCOUNT_ALREADY_LINKED:
      m.auth_error_base_social_account_already_linked(),
    PROVIDER_NOT_FOUND: m.auth_error_base_provider_not_found(),
    INVALID_TOKEN: m.auth_error_base_invalid_token(),
    TOKEN_EXPIRED: m.auth_error_base_token_expired(),
    ID_TOKEN_NOT_SUPPORTED: m.auth_error_base_id_token_not_supported(),
    FAILED_TO_GET_USER_INFO: m.auth_error_base_failed_to_get_user_info(),
    USER_EMAIL_NOT_FOUND: m.auth_error_base_user_email_not_found(),
    EMAIL_NOT_VERIFIED: m.auth_error_base_email_not_verified(),
    PASSWORD_TOO_SHORT: m.auth_error_base_password_too_short(),
    PASSWORD_TOO_LONG: m.auth_error_base_password_too_long(),
    USER_ALREADY_EXISTS: m.auth_error_base_user_already_exists(),
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
      m.auth_error_base_user_already_exists_use_another_email(),
    EMAIL_CAN_NOT_BE_UPDATED: m.auth_error_base_email_can_not_be_updated(),
    CREDENTIAL_ACCOUNT_NOT_FOUND:
      m.auth_error_base_credential_account_not_found(),
    SESSION_EXPIRED: m.auth_error_base_session_expired(),
    FAILED_TO_UNLINK_LAST_ACCOUNT:
      m.auth_error_base_failed_to_unlink_last_account(),
    ACCOUNT_NOT_FOUND: m.auth_error_base_account_not_found(),
    USER_ALREADY_HAS_PASSWORD: m.auth_error_base_user_already_has_password(),
    CROSS_SITE_NAVIGATION_LOGIN_BLOCKED:
      m.auth_error_base_cross_site_navigation_login_blocked(),
    VERIFICATION_EMAIL_NOT_ENABLED:
      m.auth_error_base_verification_email_not_enabled(),
    EMAIL_ALREADY_VERIFIED: m.auth_error_base_email_already_verified(),
    EMAIL_MISMATCH: m.auth_error_base_email_mismatch(),
    SESSION_NOT_FRESH: m.auth_error_base_session_not_fresh(),
    LINKED_ACCOUNT_ALREADY_EXISTS:
      m.auth_error_base_linked_account_already_exists(),
    INVALID_ORIGIN: m.auth_error_base_invalid_origin(),
    INVALID_CALLBACK_URL: m.auth_error_base_invalid_callback_url(),
    INVALID_REDIRECT_URL: m.auth_error_base_invalid_redirect_url(),
    INVALID_ERROR_CALLBACK_URL: m.auth_error_base_invalid_error_callback_url(),
    INVALID_NEW_USER_CALLBACK_URL:
      m.auth_error_base_invalid_new_user_callback_url(),
    MISSING_OR_NULL_ORIGIN: m.auth_error_base_missing_or_null_origin(),
    CALLBACK_URL_REQUIRED: m.auth_error_base_callback_url_required(),
    FAILED_TO_CREATE_VERIFICATION:
      m.auth_error_base_failed_to_create_verification(),
    FIELD_NOT_ALLOWED: m.auth_error_base_field_not_allowed(),
    ASYNC_VALIDATION_NOT_SUPPORTED:
      m.auth_error_base_async_validation_not_supported(),
    VALIDATION_ERROR: m.auth_error_base_validation_error(),
    MISSING_FIELD: m.auth_error_base_missing_field(),
    METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED:
      m.auth_error_base_method_not_allowed_defer_session_required(),
    BODY_MUST_BE_AN_OBJECT: m.auth_error_base_body_must_be_an_object(),
    PASSWORD_ALREADY_SET: m.auth_error_base_password_already_set(),
  };

  return AUTH_ERROR_CODES[code as keyof AuthErrors] as string | undefined;
}
