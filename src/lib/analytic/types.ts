import type { AnalyticEvent } from '~/lib/analytic/events';
import type { AnalyticProperty } from '~/lib/analytic/properties';

/**
 * Props for capturing an analytics event.
 *
 * Conditionally requires `properties` based on whether the event has a
 * corresponding entry in `AnalyticProperty`. If the event is mapped, `properties`
 * is required and typed accordingly; otherwise `properties` is not allowed.
 *
 * @template TEvent - The analytic event type being captured.
 * @template TOthers - Additional options to merge into the props (e.g. PostHog `CaptureOptions`).
 */
export type AnalyticCaptureEventProps<
  TEvent extends AnalyticEvent,
  TOthers extends {} = {},
> = TEvent extends keyof AnalyticProperty
  ? { event: TEvent; properties: AnalyticProperty[TEvent] } & TOthers
  : { event: TEvent; properties?: undefined } & TOthers;
