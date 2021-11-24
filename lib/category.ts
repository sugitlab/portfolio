export type CategoryType = "Tech" | "LifeHack" | "Other";
export function getCategoryColor(category: CategoryType): string {
  switch (category) {
    case "Tech":
      return "bg-blue-500";
    case "LifeHack":
      return "bg-green-500";
    case "Other":
    default:
      return "bg-gray-500";
  }
}
