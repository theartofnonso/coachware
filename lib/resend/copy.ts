/** Plain-text line appended to every transactional send */
export const NOREPLY_FOOTER_PLAIN =
  "\n\n---\nThis is an automated message. Replies to this address are not monitored.";

/** HTML block for the same (use inside the main content column) */
export function noreplyFooterHtml(): string {
  return `<p style="margin:28px 0 0;font-size:13px;line-height:1.45;color:#737373;border-top:1px solid #e4e4e7;padding-top:16px">This is an automated message. Replies to this address are not monitored.</p>`;
}
