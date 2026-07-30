#!/usr/bin/env bash
#
# Weekly reminder to check the Fly.io balance.
#
# WHY THIS EXISTS
#   Fly.io has no billing cap and no billing alerts (confirmed in their own
#   docs, 2026-07-30). The only protection is looking at the dashboard. This
#   fires a macOS notification once a week so that actually happens.
#
#   Expected cost is ~$5.70/month for one shared-1x-cpu@1024MB machine running
#   24/7. Anything materially above that means the CONFIGURATION changed — a
#   second machine, a bigger machine, another region, or an added Fly service.
#
# INSTALL (once):
#   ./scripts/fly-balance-reminder.sh --install
#
# REMOVE:
#   ./scripts/fly-balance-reminder.sh --uninstall
#
# TEST (fire the notification right now):
#   ./scripts/fly-balance-reminder.sh --test
#
set -euo pipefail

SELF="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
CRON_LINE="14 9 * * 1 $SELF >/dev/null 2>&1"   # Mondays 09:14 local
MARKER="# HTR fly balance reminder"

notify() {
  local title="HTR — check your Fly.io balance"
  local msg="Expected ~\$5.70/mo. Fly has no billing cap, so this is the only check. Open the dashboard."

  osascript -e "display notification \"$msg\" with title \"$title\" sound name \"Glass\"" 2>/dev/null || true

  # Also open the billing page so the reminder is one click from being acted on.
  open "https://fly.io/dashboard/personal/billing" 2>/dev/null || true

  # And leave a trail, in case the notification is missed.
  echo "$(date '+%Y-%m-%d %H:%M')  reminder fired" >> "$HOME/.htr-fly-reminder.log"
}

case "${1:-}" in
  --install)
    if crontab -l 2>/dev/null | grep -qF "$MARKER"; then
      echo "Already installed. Current schedule:"
      crontab -l 2>/dev/null | grep -A1 -F "$MARKER"
      exit 0
    fi
    { crontab -l 2>/dev/null || true; echo "$MARKER"; echo "$CRON_LINE"; } | crontab -
    echo "Installed. Fires Mondays at 09:14 local time."
    echo "Verify with:  crontab -l | grep -A1 'HTR fly'"
    ;;
  --uninstall)
    crontab -l 2>/dev/null | grep -vF "$MARKER" | grep -vF "$SELF" | crontab -
    echo "Removed."
    ;;
  --test)
    notify
    echo "Notification fired (and the billing page should have opened)."
    ;;
  "")
    notify
    ;;
  *)
    echo "usage: $(basename "$0") [--install|--uninstall|--test]" >&2
    exit 2
    ;;
esac
