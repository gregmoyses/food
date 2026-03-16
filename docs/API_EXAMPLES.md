# API Examples

## 1) Register
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@example.com","password":"Password123","name":"Demo"}'
```

## 2) Parse shopping list text/voice transcript
```bash
curl -X POST http://localhost:4000/api/shopping/parse \
  -H 'Content-Type: application/json' \
  -d '{"inputText":"Shopping list: milk, eggs, spinach"}'
```

## 3) Generate meal plan by nutrient/diet criteria
```bash
curl -X POST http://localhost:4000/api/meals/plan \
  -H 'Content-Type: application/json' \
  -d '{
    "calories": 1800,
    "protein": 100,
    "dietaryRestrictions": ["vegetarian"],
    "allergies": ["peanuts"],
    "preferredIngredients": ["spinach"],
    "healthyOnly": true
  }'
```

## 4) Add items to retailer basket (Tesco/Walmart)
```bash
curl -X POST http://localhost:4000/api/shopping/retailer/basket \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Content-Type: application/json' \
  -d '{
    "retailer":"tesco",
    "items":[{"name":"milk","quantity":1},{"name":"eggs","quantity":1}],
    "autoPurchase": true
  }'
```

## 5) Chat endpoint for meal ideation
```bash
curl -X POST http://localhost:4000/api/chat \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Content-Type: application/json' \
  -d '{"message":"I need high-protein vegetarian lunches"}'
```
