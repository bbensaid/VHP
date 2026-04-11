import { verifyCertification } from "@/lib/db/academy";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { CheckCircle, XCircle, Award, Shield } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ hash: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hash } = await params;
  const cert = await verifyCertification(hash);
  if (!cert) {
    return { title: "Certificate Not Found | HTR" };
  }
  return {
    title: `Certificate Verified: ${cert.cert_name} | HTR`,
    description: `This certificate was issued by the Health Transformation Review Academy.`,
  };
}

export default async function VerifyCertPage({ params }: Props) {
  const { hash } = await params;
  const cert = await verifyCertification(hash);

  if (!cert) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 shadow-sm p-10 text-center">
          <XCircle size={56} className="mx-auto text-red-400 mb-4" />
          <h1 className="text-2xl font-black text-slate-900 mb-2">Certificate Not Found</h1>
          <p className="text-slate-500 text-sm mb-6">
            This verification link is invalid or the certificate has been revoked.
            If you believe this is an error, contact{" "}
            <a href="mailto:support@healthtransformationreview.com" className="text-indigo-600 hover:underline">
              support@healthtransformationreview.com
            </a>.
          </p>
          <Link
            href="/"
            className="inline-block text-sm font-bold text-indigo-600 border border-indigo-200 rounded-xl px-5 py-2.5 hover:bg-indigo-50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Fetch the holder's name from profiles
  const { data: profile } = await dbAdmin
    .from("profiles")
    .select("full_name")
    .eq("id", cert.user_id)
    .single();

  const holderName = profile?.full_name ?? "Certificate Holder";
  const isExpired = cert.expires_at ? new Date(cert.expires_at) < new Date() : false;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        {/* Validity badge */}
        <div className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold mb-6 w-fit mx-auto ${
          isExpired
            ? "bg-amber-100 text-amber-700"
            : "bg-emerald-100 text-emerald-700"
        }`}>
          {isExpired
            ? <><XCircle size={16} /> Certificate Expired</>
            : <><CheckCircle size={16} /> Certificate Verified</>
          }
        </div>

        {/* Certificate card */}
        <div className="bg-white rounded-2xl border-2 border-indigo-200 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-8 py-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award size={24} className="text-indigo-200" />
              <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">
                Health Transformation Review Academy
              </span>
            </div>
            <h2 className="text-white text-lg font-black">Certificate of Completion</h2>
          </div>

          {/* Body */}
          <div className="px-8 py-8 text-center">
            <p className="text-slate-500 text-sm mb-2">This certifies that</p>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 mb-3">{holderName}</h1>
            <p className="text-slate-500 text-sm mb-2">has successfully completed</p>
            <p className="text-xl font-black text-indigo-700 mb-6">{cert.cert_name}</p>

            <div className="flex justify-center gap-6 text-sm text-slate-500 border-t border-slate-100 pt-6">
              <div>
                <div className="font-bold text-slate-900">
                  {new Date(cert.issued_at).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </div>
                <div className="text-xs uppercase tracking-wider mt-0.5">Date Issued</div>
              </div>
              {cert.expires_at && (
                <>
                  <div className="w-px bg-slate-200" />
                  <div>
                    <div className={`font-bold ${isExpired ? "text-amber-600" : "text-slate-900"}`}>
                      {new Date(cert.expires_at).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </div>
                    <div className="text-xs uppercase tracking-wider mt-0.5">Expiration</div>
                  </div>
                </>
              )}
              <div className="w-px bg-slate-200" />
              <div>
                <div className="font-bold text-slate-900 capitalize">{cert.cert_type}</div>
                <div className="text-xs uppercase tracking-wider mt-0.5">Type</div>
              </div>
            </div>
          </div>

          {/* Verification footer */}
          <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Shield size={12} />
            <span>Verification ID: <code className="font-mono text-slate-600">{hash}</code></span>
          </div>
        </div>

        {cert.cert_url && (
          <div className="text-center mt-6">
            <a
              href={cert.cert_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm transition-colors"
            >
              Download Certificate PDF
            </a>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-6">
          Verified by{" "}
          <Link href="/" className="text-indigo-600 hover:underline">
            Health Transformation Review
          </Link>
        </p>
      </div>
    </div>
  );
}
