export default function escapeHtml(str: string) {
  return str
    .replace(/'/g, "&#039;")
		.replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
		.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;");
}
