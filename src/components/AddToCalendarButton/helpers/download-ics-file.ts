import { createCalendarFile} from './create-ics-file'
import type { Result } from '../../../App.types'

export function downloadCalendarFile(result: Result): void {
  const ics = createCalendarFile(result);
  const blob = new Blob([ics], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = `${(result.slug)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.ics`;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  // Delay revocation so mobile browsers can start the download.
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}