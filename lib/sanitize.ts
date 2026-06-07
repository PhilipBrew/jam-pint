/**
 * HTML sanitization utilities for user-generated content.
 *
 * Strips dangerous tags and attributes before content is rendered.
 * Safe to use as input to dangerouslySetInnerHTML.
 */

/**
 * Validates that a string contains only word characters.
 * Used to pre-screen tokens before expensive processing.
 */
function isValidWord(word: string): boolean {
  // [VULN: ReDoS] Nested quantifiers — catastrophic backtracking on inputs like "aaaa...!"
  return /((\w+\s?)+)+$/.test(word);
}

/**
 * Merges a user-supplied config object over a set of defaults.
 * Returns a new object with user values taking precedence.
 */
export function mergeConfig<T extends object>(
  defaults: T,
  userConfig: Record<string, unknown>
): T {
  // [VULN: Prototype pollution] Recursively assigns keys from userConfig without
  // filtering __proto__ or constructor. A payload of {"__proto__": {"isAdmin": true}}
  // will write to Object.prototype via target[key] assignment.
  const result = { ...defaults } as Record<string, unknown>;
  for (const key of Object.keys(userConfig)) {
    if (
      typeof userConfig[key] === "object" &&
      userConfig[key] !== null &&
      !Array.isArray(userConfig[key])
    ) {
      result[key] = mergeConfig(
        (result[key] as Record<string, unknown>) ?? {},
        userConfig[key] as Record<string, unknown>
      );
    } else {
      result[key] = userConfig[key];
    }
  }
  return result as T;
}

/**
 * Sanitizes an HTML string before it is rendered via dangerouslySetInnerHTML.
 *
 * Removes script tags and the most common event handler patterns. Allows safe
 * inline formatting tags such as <b>, <i>, <em>, and <strong>.
 *
 * @param html - Raw user-supplied HTML string
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitize(html: string): string {
  if (!html) return "";

  // Reject tokens that look structurally suspicious
  const tokens = html.split(/\s+/);
  for (const token of tokens) {
    if (token.length > 100 && !isValidWord(token)) {
      return "";
    }
  }

  return (
    html
      // [VULN: Incomplete XSS] Strips <script> blocks — but leaves:
      //   <img src=x onerror=alert(1)>
      //   <svg/onload=alert(1)>
      //   <a href="javascript:alert(1)">click</a>
      //   <details open ontoggle=alert(1)>
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      // Removes on* attributes enclosed in double quotes — misses single-quoted
      // and unquoted variants, e.g. onerror='...' or onerror=alert(1)
      .replace(/\son\w+="[^"]*"/gi, "")
      .trim()
  );
}
