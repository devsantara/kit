import * as React from 'react';
import { action } from 'storybook/actions';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/ui/components/core/accordion';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Core/Accordion',
  component: Accordion,

  argTypes: {
    type: {
      options: ['single', 'multiple'],
      control: { type: 'select' },
    },
  },
};

export default meta;

export const SingleOpen: StoryObj<typeof Accordion> = {
  args: {
    type: 'single',
    defaultValue: 'features',
    collapsible: true,
    onValueChange: action('onValueChange'),
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="features">
          <AccordionTrigger>Product Features</AccordionTrigger>
          <AccordionContent>
            Discover advanced features designed to enhance productivity, streamline your workflow, and deliver superior results for teams of all sizes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="pricing">
          <AccordionTrigger>Pricing & Plans</AccordionTrigger>
          <AccordionContent>
            Explore our transparent pricing models and find the perfect plan for your organization, with options for startups to large enterprises.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Customer Support</AccordionTrigger>
          <AccordionContent>
            Reach out to our dedicated support team 24/7 via chat, email, or phone—we&apos;re always here to help you succeed.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const MultipleOpen: StoryObj<typeof Accordion> = {
  args: {
    type: 'multiple',
    defaultValue: ['features', 'support'],
    onValueChange: action('onValueChange'),
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="features">
          <AccordionTrigger>Core Features</AccordionTrigger>
          <AccordionContent>
            Powerful tools to automate tasks and drive efficiency across your team.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="integrations">
          <AccordionTrigger>Integrations</AccordionTrigger>
          <AccordionContent>
            Seamlessly connect with Slack, GitHub, Figma, and 50+ other platforms.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Technical Support</AccordionTrigger>
          <AccordionContent>
            Enjoy priority response and dedicated onboarding assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const PreventCollapsible: StoryObj<typeof Accordion> = {
  args: {
    type: 'single',
    collapsible: false,
    defaultValue: 'features',
    onValueChange: action('onValueChange'),
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="features">
          <AccordionTrigger>Core Features</AccordionTrigger>
          <AccordionContent>
            Powerful tools to automate tasks and drive efficiency across your team.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="integrations">
          <AccordionTrigger>Integrations</AccordionTrigger>
          <AccordionContent>
            Seamlessly connect with Slack, GitHub, Figma, and 50+ other platforms.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="support">
          <AccordionTrigger>Technical Support</AccordionTrigger>
          <AccordionContent>
            Enjoy priority response and dedicated onboarding assistance.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const Disabled: StoryObj<typeof Accordion> = {
  args: {
    type: 'single',
    defaultValue: 'general',
    disabled: true,
  },
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionItem value="general">
          <AccordionTrigger>General Info</AccordionTrigger>
          <AccordionContent>
            Get an overview of our platform&apos;s mission and vision.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="roadmap">
          <AccordionTrigger>2025 Roadmap (Coming Soon)</AccordionTrigger>
          <AccordionContent>
            Future product updates and timelines will appear here.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};
