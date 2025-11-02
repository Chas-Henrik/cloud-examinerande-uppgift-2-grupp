export function formatDate(createdAt : string): string {
  
  return new Date(createdAt).toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
  });
}
