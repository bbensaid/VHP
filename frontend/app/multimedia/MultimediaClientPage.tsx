import React from "react";
"use client";

import HubPageTemplate from "@/components/templates/HubPageTemplate";
import {
  MicrophoneIcon,
  FilmIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";

interface MultimediaClientPageProps {
  podcastsTab: React.ReactNode;
  videosTab: React.ReactNode;
  libraryTab: React.ReactNode;
}

export default function MultimediaClientPage({
  podcastsTab,
  videosTab,
  libraryTab,
}: MultimediaClientPageProps) {
  const tabs = [
    { id: "podcasts", label: "HTR Podcast Network", icon: <MicrophoneIcon className="w-5 h-5"/>, content: podcastsTab },
    { id: "videos", label: "Video Briefings", icon: <FilmIcon className="w-5 h-5"/>, content: videosTab },
    { id: "library", label: "Full Multimedia Library", icon: <RectangleStackIcon className="w-5 h-5"/>, content: libraryTab },
  ];

  return (
    <HubPageTemplate
      badgeLabel="Audio & Video Hub"
      title="HTR Multimedia"
      subtitle="Podcasts, Video Briefings, and the Full Media Library"
      tabs={tabs}
    />
  );
}