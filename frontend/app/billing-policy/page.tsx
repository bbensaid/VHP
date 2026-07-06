import Link from "next/link";
import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Subscription, Billing & Refund Policy | HTR",
  description:
    "How HTR subscriptions are billed, renewed, cancelled, and refunded across the Student, Subscriber, Professional, and Team plans.",
};

export default function BillingPolicyPage() {
  return (
    <LegalPage title="Subscription, Billing & Refund Policy">
      <h2>Plans</h2>
      <p>
        HTR offers the following subscriptions. Prices shown are as published at checkout and are
        subject to change.
      </p>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Monthly</th>
            <th>Yearly (per month)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Student</td>
            <td>$19</td>
            <td>$15</td>
          </tr>
          <tr>
            <td>Subscriber</td>
            <td>$29</td>
            <td>$23</td>
          </tr>
          <tr>
            <td>Professional</td>
            <td>$99</td>
            <td>$79</td>
          </tr>
          <tr>
            <td>Team</td>
            <td>$23 / seat</td>
            <td>$18.42 / seat</td>
          </tr>
        </tbody>
      </table>

      <h2>Billing</h2>
      <p>
        Subscriptions are billed in advance via Stripe on a recurring basis (monthly or annually)
        until cancelled. By subscribing you authorize recurring charges to your payment method.
      </p>

      <h2>Auto-renewal</h2>
      <p>
        Subscriptions renew automatically at the end of each term at the then-current rate. We will
        provide renewal notice where required by law.
      </p>

      <h2>Cancellation</h2>
      <p>
        You may cancel anytime from your{" "}
        <Link href="/account/billing">account billing page</Link> or the Stripe customer portal.
        Cancellation stops future renewals; you retain access through the end of the current paid
        term.
      </p>

      <h2>Refunds</h2>
      <p>
        All fees are non-refundable except where required by law. If you believe you were charged in
        error, contact{" "}
        <a href="mailto:hello@htr.com" className="text-brand-policy hover:underline">
          hello@htr.com
        </a>
        .
      </p>

      <h2>Price changes</h2>
      <p>We may change prices; changes apply to the next renewal term with notice.</p>

      <h2>Taxes</h2>
      <p>Prices exclude applicable taxes unless stated.</p>

      <h2>Team plans</h2>
      <p>
        Team administrators are responsible for seat management and for their members&rsquo;
        compliance with the <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
