import HospitalCompareClient from "./HospitalCompareClient";

export const metadata = {
  title: "Vermont Hospital System | HTR Dashboard",
  description: "All 14 Vermont hospitals — financial data, Act 167 status, and side-by-side comparison tool.",
};

export default function VermontHospitalsPage() {
  return <HospitalCompareClient />;
}
