const DEFAULT_LIBRARY = [
  { name: 'Greek Yogurt Bowl', calories: 400, protein: 30, tags: ['vegetarian', 'healthy'], ingredients: ['greek yogurt', 'berries', 'chia seeds'] },
  { name: 'Chickpea Spinach Curry', calories: 550, protein: 24, tags: ['vegan', 'vegetarian', 'healthy'], ingredients: ['chickpeas', 'spinach', 'tomato'] },
  { name: 'Tofu Stir Fry', calories: 500, protein: 32, tags: ['vegan', 'vegetarian', 'healthy'], ingredients: ['tofu', 'broccoli', 'brown rice'] },
  { name: 'Lentil Soup', calories: 350, protein: 20, tags: ['vegan', 'vegetarian', 'healthy'], ingredients: ['lentils', 'carrots', 'celery'] },
  { name: 'Egg White Omelette', calories: 300, protein: 28, tags: ['vegetarian', 'healthy'], ingredients: ['egg whites', 'spinach', 'onion'] }
];

function filterMeals(library, criteria) {
  const restrictions = (criteria.dietaryRestrictions || []).map((x) => x.toLowerCase());
  const allergies = (criteria.allergies || []).map((x) => x.toLowerCase());
  const preferred = (criteria.preferredIngredients || []).map((x) => x.toLowerCase());

  return library.filter((meal) => {
    const lowerIngredients = meal.ingredients.map((i) => i.toLowerCase());

    const passesRestrictions = restrictions.every((restriction) => meal.tags.includes(restriction));
    const avoidsAllergies = allergies.every((allergy) => !lowerIngredients.includes(allergy));
    const containsPreferred = preferred.length === 0 || preferred.some((pref) => lowerIngredients.includes(pref));

    return passesRestrictions && avoidsAllergies && containsPreferred;
  });
}

function buildMealPlan(criteria, library = DEFAULT_LIBRARY) {
  const targetCalories = criteria.calories || 1800;
  const targetProtein = criteria.protein || 100;
  const healthyOnly = criteria.healthyOnly !== false;

  const filtered = filterMeals(
    healthyOnly ? library.filter((m) => m.tags.includes('healthy')) : library,
    criteria
  );

  if (!filtered.length) {
    throw new Error('No meals found for the provided criteria');
  }

  const mealPlan = [];
  let calories = 0;
  let protein = 0;
  while (calories < targetCalories || protein < targetProtein) {
    const nextMeal = filtered[(mealPlan.length + filtered.length) % filtered.length];
    mealPlan.push(nextMeal);
    calories += nextMeal.calories;
    protein += nextMeal.protein;

    if (mealPlan.length > 8) break;
  }

  const shoppingList = Array.from(
    new Set(mealPlan.flatMap((m) => m.ingredients.map((ingredient) => ingredient.toLowerCase())))
  ).map((name) => ({ name, quantity: 1 }));

  return {
    targets: { calories: targetCalories, protein: targetProtein },
    totals: { calories, protein },
    meals: mealPlan,
    shoppingList
  };
}

module.exports = { buildMealPlan };
