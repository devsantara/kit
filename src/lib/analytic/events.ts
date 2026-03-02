/**
 * Analytics events
 *
 * Uses the `category:object_action` naming convention to ensure consistent and descriptive event naming.
 * - **category**: The context or domain where the event occurred (e.g., `auth`, `account_settings`, `signup_flow`)
 * - **object**: The component, feature, or location involved (e.g., `signup_button`, `pricing_page`)
 * - **action**: The user action or system event that occurred (e.g., `click`, `submit`, `view`, `cancel`)
 *
 * @examples
 * - `account_settings:forgot_password_button_click`
 * - `signup_flow:pricing_page_view`
 * - `registration:sign_up_button_click`
 * - `registration_v2:sign_up_button_click` - version your events
 *
 * @see {@link https://posthog.com/docs/product-analytics/best-practices#2-implement-a-naming-convention}
 */
export enum AnalyticEvent {}
