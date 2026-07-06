import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Disclaimer | HTR",
  description:
    "Health-content disclaimer for the Health Transformation Review platform. Educational and informational use only — not medical, legal, or financial advice.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <h2>Educational purpose only</h2>
      <p>
        Health Transformation Review provides educational and informational content about U.S.
        healthcare policy, economics, operations, and clinical systems. It is intended for healthcare
        professionals, policy advocates, students, and the general public for professional education
        and general information only.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Nothing on the Service — including the book, courses, analyses, dashboards, AI-generated
        output, or any other content — constitutes medical, clinical, legal, financial, tax,
        regulatory, or other professional advice, and it is not a substitute for the judgment of a
        qualified professional or for an individualized professional relationship.{" "}
        <strong>
          Do not use the Service to diagnose or treat any patient or to make clinical, legal, or
          financial decisions without independent professional verification.
        </strong>
      </p>

      <h2>Not a medical device</h2>
      <p>
        The Service is not intended to diagnose, treat, cure, or prevent any disease and is not a
        medical device.
      </p>

      <h2>No outcomes guaranteed</h2>
      <p>
        Healthcare policy and data change rapidly. We strive for accuracy and cite sources, but
        content may become outdated or contain errors. AI features may produce inaccurate or
        incomplete information. Always verify against primary sources.
      </p>

      <h2>Your responsibility</h2>
      <p>
        You are solely responsible for how you use the Service and for any decisions you make based
        on it. To the fullest extent permitted by law, HTR disclaims liability for actions taken in
        reliance on the Service.
      </p>
    </LegalPage>
  );
}
