import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy | HTR",
  description:
    "HTR's privacy policy — how we collect, use, and protect your data as a subscriber or visitor to the Health Transformation Review platform.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This Privacy Policy explains how HTR Health, LLC (&ldquo;HTR&rdquo;) collects, uses, and
        shares information when you use the Health Transformation Review platform. It is intended for
        users in the United States.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account information you provide:</strong> name, email address, organization,
          profession, and role.
        </li>
        <li>
          <strong>Subscription/payment information:</strong> processed by Stripe; we receive billing
          status and limited transaction data, not full card numbers.
        </li>
        <li>
          <strong>Usage and content data:</strong> account activity, courses accessed, saved items,
          notes, AI Analyst queries, and similar.
        </li>
        <li>
          <strong>Technical data:</strong> IP address, device/browser information, and
          diagnostic/error data (via Sentry).
        </li>
        <li>
          <strong>Cookies and similar technologies:</strong> see our Cookie Notice below.
        </li>
      </ul>

      <h2>2. How We Use Information</h2>
      <p>
        To provide and improve the Service; create and manage accounts; deliver courses,
        certifications, and the email digest you opt into; process subscriptions and payments;
        respond to support requests; ensure security and prevent abuse; and comply with law.
      </p>

      <h2>3. AI Features</h2>
      <p>
        When you use AI-assisted features, your queries are sent to third-party AI model providers to
        generate responses. <strong>Do not enter personal health information about identifiable
        patients or other sensitive personal data into AI features.</strong>
      </p>

      <h2>4. How We Share Information</h2>
      <p>
        We share information with service providers (subprocessors) that operate the Service on our
        behalf, under contract: <strong>Supabase</strong> (database/auth/hosting),{" "}
        <strong>Stripe</strong> (payments), <strong>Sanity</strong> (content management),{" "}
        <strong>Sentry</strong> (error monitoring), and <strong>AI model providers</strong> (AI
        features). We may also share to comply with law, enforce our Terms, or in a business
        transfer. <strong>We do not sell your personal information.</strong>
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain information for as long as your account is active and as needed for legitimate
        business and legal purposes. You may request deletion as described below.
      </p>

      <h2>6. Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational safeguards. No method of
        transmission or storage is 100% secure.
      </p>

      <h2>7. Your California Privacy Rights (CCPA/CPRA)</h2>
      <p>
        If you are a California resident, you have the right to know what personal information we
        collect, to access and delete it, to correct it, and to not be discriminated against for
        exercising these rights. We do not sell or &ldquo;share&rdquo; personal information for
        cross-context behavioral advertising. To exercise your rights, contact{" "}
        <a href="mailto:privacy@htr.com" className="text-brand-policy hover:underline">
          privacy@htr.com
        </a>
        . We will verify your request consistent with law.
      </p>

      <h2>8. Children</h2>
      <p>
        The Service is not directed to children under 18, and we do not knowingly collect information
        from them.
      </p>

      <h2>9. Changes</h2>
      <p>We will post updates with a new &ldquo;Last updated&rdquo; date.</p>

      <h2>10. Contact</h2>
      <p>
        Privacy questions or data requests?{" "}
        <a href="mailto:privacy@htr.com" className="text-brand-policy hover:underline">
          privacy@htr.com
        </a>
        .
      </p>

      <hr />

      <h2>Cookie Notice</h2>
      <p>HTR uses cookies and similar technologies to operate the Service:</p>
      <ul>
        <li>
          <strong>Strictly necessary:</strong> authentication/session (via Supabase), security, and
          core functionality. These cannot be disabled.
        </li>
        <li>
          <strong>Functional:</strong> remembering preferences.
        </li>
        <li>
          <strong>Analytics/performance:</strong> measuring site performance and diagnosing errors.
        </li>
      </ul>
      <p>
        We do not use cookies to sell your personal information or for cross-context behavioral
        advertising. You can control cookies through your browser settings; disabling necessary
        cookies may break the Service.
      </p>
    </LegalPage>
  );
}
