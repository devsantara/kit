import type { EventMessage } from 'posthog-node';

import type { AnalyticEvent } from '~/lib/analytic/events';
import type { AnalyticProperty } from '~/lib/analytic/properties';

export type AnalyticEventMessage<
  TEvent extends AnalyticEvent & keyof AnalyticProperty,
> = {
  event: TEvent;
  properties: AnalyticProperty[TEvent];
} & Omit<EventMessage, 'event' | 'properties'>;
