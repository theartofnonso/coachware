import { noreplyFooterHtml } from "@/lib/resend/copy";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function wrapPlainTextEmailBody(
  introLine: string,
  plainBody: string,
): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#18181b;background:#fafafa">
<div style="max-width:40rem;margin:0 auto">
<p style="margin:0 0 16px;font-size:15px">${escapeHtml(introLine)}</p>
<pre style="margin:0;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,monospace;font-size:13px;line-height:1.5;background:#fff;padding:16px 18px;border-radius:10px;border:1px solid #e4e4e7;color:#27272a">${escapeHtml(plainBody)}</pre>
${noreplyFooterHtml()}
</div>
</body>
</html>`;
}

export function simpleParagraphEmail(htmlParagraph: string): string {
  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#18181b;background:#fafafa">
<div style="max-width:32rem;margin:0 auto;font-size:15px">
${htmlParagraph}
${noreplyFooterHtml()}
</div>
</body>
</html>`;
}
