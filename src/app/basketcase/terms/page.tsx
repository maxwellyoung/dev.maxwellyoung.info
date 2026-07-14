import type { Metadata } from "next";
import {
  BasketcaseLegalLayout,
  LegalList,
  LegalSection,
} from "../legal-layout";

export const metadata: Metadata = {
  title: "Basketcase Terms of Service",
  description:
    "Read the terms for using Basketcase, including acceptable use, receipt scanning, price information, account security, and New Zealand governing law.",
};

export default function BasketcaseTermsPage() {
  return (
    <BasketcaseLegalLayout
      eyebrow="Terms of Service"
      title="Terms of Service"
      intro="By using Basketcase, you agree to these terms. Basketcase is governed by New Zealand law."
    >
      <LegalSection title="Service">
        <p>
          Basketcase is a grocery intelligence app that scans grocery receipts,
          tracks household spending, and shows source-labelled price context.
        </p>
      </LegalSection>

      <LegalSection title="Free v1">
        <LegalList
          items={[
            "No subscription is required for launch features.",
            "No trial starts in v1.",
            "No in-app purchase is required for receipt scanning or spending insights.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Acceptable use">
        <LegalList
          items={[
            "Use Basketcase only for lawful personal or household purposes.",
            "Do not upload content that is illegal, harmful, or infringes another person's rights.",
            "Do not attempt to reverse engineer, modify, overload, or abuse the service.",
            "Keep your account credentials secure.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Price information">
        <p>
          Price context may come from receipts, reference datasets, public
          sources, or other observations and may not reflect current shelf
          prices. Always verify prices before making purchasing decisions.
          Basketcase is not affiliated with, endorsed by, or sponsored by any
          supermarket or retailer.
        </p>
      </LegalSection>

      <LegalSection title="Your content and data">
        <p>
          You retain ownership of your personal information and receipt content.
          You allow Basketcase to process that content to provide app features.
          Account and data deletion are handled according to the Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms:{" "}
          <a className="text-foreground underline underline-offset-2" href="mailto:support@basketcase.app">
            support@basketcase.app
          </a>
        </p>
        <p className="text-xs">Last updated: June 2026</p>
      </LegalSection>
    </BasketcaseLegalLayout>
  );
}
