import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    recipes: [
      { id: "1", title: "Paneer Tikka Bowl", cuisineType: "North Indian", prepTimeMin: 15, cookTimeMin: 20, caloriesPerServing: 380, proteinG: 28, rating: 4.5, difficulty: "easy" },
      { id: "2", title: "Masala Oats", cuisineType: "Indian Fusion", prepTimeMin: 5, cookTimeMin: 10, caloriesPerServing: 220, proteinG: 8, rating: 4.2, difficulty: "easy" },
      { id: "3", title: "Grilled Chicken Salad", cuisineType: "Continental", prepTimeMin: 10, cookTimeMin: 15, caloriesPerServing: 320, proteinG: 35, rating: 4.6, difficulty: "easy" },
      { id: "4", title: "Moong Dal Cheela", cuisineType: "North Indian", prepTimeMin: 10, cookTimeMin: 15, caloriesPerServing: 180, proteinG: 12, rating: 4.3, difficulty: "easy" },
    ],
    pagination: { total: 4, page: 1, limit: 20 },
  });
}
