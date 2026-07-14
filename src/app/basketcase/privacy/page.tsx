import type { Metadata } from "next";
import {
  BasketcaseLegalLayout,
  LegalList,
  LegalSection,
} from "../legal-layout";

export const metadata: Metadata = {
  title: "Basketcase Privacy Policy",
  description:
    "Learn how Basketcase collects, uses, stores, and protects account details, grocery receipts, price history, and support information in New Zealand.",
};

export default function BasketcasePrivacyPage() {
  return (
    <BasketcaseLegalLayout
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="Basketcase treats receipt and household spending data as personal information. This policy explains what we collect, how we use it, and how to contact us."
    >
      <LegalSection title="Information we collect">
        <LegalList
          items={[
            "Account details needed for sign-in and support.",
            "Receipt images and extracted receipt details such as store, date, items, prices, and totals.",
            "Household, category, spending, and price-history records created in the app.",
            "Technical diagnostics needed to keep the app reliable and secure.",
          ]}
        />
      </LegalSection>

      <LegalSection title="How we use information">
        <LegalList
          items={[
            "To scan receipts and turn them into searchable grocery history.",
            "To show spending patterns, trends, and source-labelled price context.",
            "To maintain account security, storage, sync, support, and abuse prevention.",
            "To improve Basketcase using aggregated or anonymized information where appropriate.",
          ]}
        />
      </LegalSection>

      <LegalSection title="What we do not do">
        <LegalList
          items={[
            "We do not sell personal information.",
            "We do not share individual receipt data with advertisers.",
            "We do not claim supermarket affiliation or endorsement.",
            "We do not request location permission in the v1 iPhone launch.",
          ]}
        />
      </LegalSection>

      <LegalSection title="Storage and services">
        <p>
          Basketcase uses managed services such as Supabase for authentication,
          database, and receipt-image storage, and Apple services for app
          distribution and account authentication where used. Information is
          protected with access controls and encrypted transport.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Under the New Zealand Privacy Act 2020, you can ask to access,
          correct, export, or delete personal information we hold about you. You
          can use the in-app settings where available or contact us directly.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Privacy requests:{" "}
          <a className="text-foreground underline underline-offset-2" href="mailto:privacy@basketcase.app">
            privacy@basketcase.app
          </a>
        </p>
        <p className="text-xs">Last updated: June 2026</p>
      </LegalSection>
    </BasketcaseLegalLayout>
  );
}
