import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  return NextResponse.json({
    foods: [
      { id: "1", name: "Roti (Chapati)", brand: null, category: "Bread", caloriesPerServing: 120, proteinG: 3.6, carbsG: 20, fatG: 3.7, servingSizeG: 40, servingUnit: "piece" },
      { id: "2", name: "White Rice (Cooked)", brand: null, category: "Grains", caloriesPerServing: 130, proteinG: 2.7, carbsG: 28, fatG: 0.3, servingSizeG: 100, servingUnit: "g" },
      { id: "3", name: "Dal (Toor)", brand: null, category: "Lentils", caloriesPerServing: 150, proteinG: 10, carbsG: 20, fatG: 4, servingSizeG: 150, servingUnit: "katori" },
      { id: "4", name: "Chicken Breast (Grilled)", brand: null, category: "Meat", caloriesPerServing: 200, proteinG: 38, carbsG: 0, fatG: 4.5, servingSizeG: 150, servingUnit: "g" },
    ].filter((f) => !q || f.name.toLowerCase().includes(q.toLowerCase())),
    total: 4,
    has_more: false,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ food_entry: { id: "new-entry", ...body } }, { status: 201 });
}
