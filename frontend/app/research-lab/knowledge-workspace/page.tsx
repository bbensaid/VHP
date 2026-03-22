import KnowledgeWorkspaceClient from './KnowledgeWorkspaceClient'

export const metadata = {
  title: 'Knowledge & Workspace | HTR Research Lab',
  description: 'Access the CEA evidence library, CMMI model tracker, workforce models, innovation leaderboard, and your research workspace.',
}

export default function KnowledgeWorkspacePage() {
  return <KnowledgeWorkspaceClient />
}
