import type { ToolId } from "@/types/tool-lead";

/**
 * Stable key for session unlock state: changes when the underlying result changes.
 */
export function stableToolResultContentKey(
  tool: ToolId,
  payload: unknown,
): string {
  try {
    const str = JSON.stringify(payload);
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i);
      h |= 0;
    }
    return `${tool}:${h}`;
  } catch {
    return `${tool}:fallback`;
  }
}
