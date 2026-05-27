import {
  Shield, Cpu, Coins, HeartPulse, Scale, Settings,
  Lock, ShieldCheck, BellRing, Fingerprint, FunctionSquare,
  FlaskConical, Pill, Stethoscope, Receipt, Code2, FileText,
  ArrowLeftRight, TrendingUp, TrendingDown, BarChart3,
  Building, ListChecks, Heart, MessageCircle, Users,
  Globe, Wifi, MapPin, Laptop2, Truck,
} from "lucide-react";
import type { ConceptsGridBlock } from "@/types/course";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "ti-shield": Shield, "ti-cpu": Cpu, "ti-coin": Coins,
  "ti-heart-rate-monitor": HeartPulse, "ti-scale": Scale, "ti-settings": Settings,
  "ti-lock": Lock, "ti-shield-check": ShieldCheck, "ti-bell-ringing": BellRing,
  "ti-fingerprint": Fingerprint, "ti-math-function": FunctionSquare,
  "ti-flask": FlaskConical, "ti-pill": Pill, "ti-stethoscope": Stethoscope,
  "ti-receipt": Receipt, "ti-code": Code2, "ti-file-text": FileText,
  "ti-arrows-exchange": ArrowLeftRight, "ti-trending-up": TrendingUp,
  "ti-trending-down": TrendingDown, "ti-chart-bar": BarChart3,
  "ti-building": Building, "ti-list-check": ListChecks, "ti-heart": Heart,
  "ti-message-circle": MessageCircle, "ti-users": Users,
  "ti-globe": Globe, "ti-wifi-off": Wifi, "ti-map-pin": MapPin,
  "ti-device-laptop": Laptop2, "ti-truck": Truck,
  "ti-building-hospital": Building, "ti-package": FileText, "ti-percentage": Coins,
};

export function ConceptsGridRenderer({ block }: { block: ConceptsGridBlock }) {
  return (
    <div className="space-y-3">
      {block.heading && (
        <h3 className="text-lg font-semibold text-slate-900">{block.heading}</h3>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(block.items ?? []).map((item, i) => {
          const Icon = ICON_MAP[item.icon] ?? Shield;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-slate-400 shrink-0" />
                <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-7">{item.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
