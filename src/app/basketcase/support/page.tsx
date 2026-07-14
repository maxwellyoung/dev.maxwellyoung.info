import type { Metadata } from "next";
import {
  BasketcaseLegalLayout,
  LegalList,
  LegalSection,
} from "../legal-layout";

export const metadata: Metadata = {
  title: "Basketcase Support",
  description:
    "Get help with Basketcase receipt scanning, account access, privacy requests, data deletion, price context, and other grocery-history app questions.",
};

export default function BasketcaseSupportPage() {
  return (
    <BasketcaseLegalLayout
      eyebrow="Support"
      title="Help with receipts, accounts, and privacy."
      intro="Use this page for App Store support, account questions, data requests, or receipt scanning issues."
    >
      <LegalSection title="Common support topics">
        <LegalList
          items={[
            "For receipt scanning, keep the receipt flat, include the full item list and total, and avoid glare or heavy shadows.",
            "Price context is reference information and should be verified before shopping.",
            "Basketcase v1 is free. There is no trial, subscription, or paid tier required for launch features.",
            "Privacy requests can cover access, correction, export, or deletion of account and receipt data.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Support and app questions:{" "}
          <a className="text-foreground underline underline-offset-2" href="mailto:support@basketcase.app">
            support@basketcase.app
          </a>
        </p>
        <p>
          Privacy-specific requests:{" "}
          <a className="text-foreground underline underline-offset-2" href="mailto:privacy@basketcase.app">
            privacy@basketcase.app
          </a>
        </p>
      </LegalSection>
    </BasketcaseLegalLayout>
  );
}
