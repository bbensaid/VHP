import type { ContentBlock } from "@/types/course";
import { TextBlockRenderer } from "./content-blocks/TextBlock";
import { VideoBlockRenderer } from "./content-blocks/VideoBlock";
import { AudioSlotRenderer } from "./content-blocks/AudioSlotBlock";
import { ConceptsGridRenderer } from "./content-blocks/ConceptsGrid";
import { TimelineBlockRenderer } from "./content-blocks/TimelineBlock";
import { CalloutBlockRenderer } from "./content-blocks/CalloutBlock";
import { KeyStatBlockRenderer } from "./content-blocks/KeyStatBlock";
import { ComparisonTableRenderer } from "./content-blocks/ComparisonTable";
import { GlossaryBlockRenderer } from "./content-blocks/GlossaryBlock";

export function ContentBlockRenderer({
  block,
  lessonId,
  onAudioUpload,
}: {
  block: ContentBlock;
  lessonId: string;
  onAudioUpload?: (file: File, slotKey: string) => Promise<string>;
}) {
  switch (block.type) {
    case "text":           return <TextBlockRenderer block={block} />;
    case "heading": {
      const Tag = (`h${block.level ?? 2}`) as "h2" | "h3" | "h4";
      const cls = block.level === 3 ? "text-lg font-semibold text-slate-900 mt-6 mb-2"
                : block.level === 4 ? "text-base font-semibold text-slate-800 mt-4 mb-1"
                : "text-xl font-bold text-slate-900 mt-8 mb-3";
      return <Tag className={cls}>{block.text}</Tag>;
    }
    case "video":          return <VideoBlockRenderer block={block} />;
    case "audio_slot":     return <AudioSlotRenderer block={block} lessonId={lessonId} onUpload={onAudioUpload} />;
    case "concepts_grid":  return <ConceptsGridRenderer block={block} />;
    case "timeline":       return <TimelineBlockRenderer block={block} />;
    case "callout":        return <CalloutBlockRenderer block={block} />;
    case "key_stat":       return <KeyStatBlockRenderer block={block} />;
    case "comparison_table": return <ComparisonTableRenderer block={block} />;
    case "glossary_terms": return <GlossaryBlockRenderer block={block} />;
    default:               return null;
  }
}
