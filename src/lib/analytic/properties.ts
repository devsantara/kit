/**
 * Analytics properties - contextual data attached to events
 *
 * Uses naming conventions to ensure consistent and descriptive property naming.
 * - **object_adjective pattern**: Use descriptive property names (e.g., `user_id`, `item_price`, `member_count`)
 * - **boolean prefixes**: Use `is_` or `has_` for boolean properties (e.g., `is_subscribed`, `has_seen_upsell`)
 * - **temporal suffixes**: For dates/timestamps, include `_date` or `_timestamp` (e.g., `user_creation_date`, `last_login_timestamp`)
 *
 * @examples
 * - `user_id`
 * - `item_price`
 * - `member_count`
 * - `is_subscribed`
 * - `has_seen_upsell`
 * - `last_login_timestamp`
 * - `user_creation_date`
 *
 * @see {@link https://posthog.com/docs/product-analytics/best-practices#2-implement-a-naming-convention}
 */
export interface AnalyticProperty {}
