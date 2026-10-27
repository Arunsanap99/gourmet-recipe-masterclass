/**
 * TastyNest - Curated Food Magazine & Recipe Dataset
 * 20+ Realistic, beautifully detailed culinary recipes with verified video masterclasses
 */

const INITIAL_RECIPES = [
  {
    "id": "butter-chicken-delight",
    "title": "Velvety Murgh Makhani (Butter Chicken)",
    "description": "Tender charred chicken thighs steeped in an aromatic, velvety cashew-tomato gravy kissed with dried fenugreek leaves and smoky garam masala.",
    "cuisine": "Indian",
    "category": "Indian",
    "prepTime": 25,
    "cookTime": 35,
    "servings": 4,
    "calories": 520,
    "difficulty": "Medium",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.95,
    "reviewsCount": 342,
    "author": {
      "name": "Chef Ananya Sharma",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "title": "Master Indian Gastronomy"
    },
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": true,
    "seasonal": false,
    "hasVideo": true,
    "youtubeId": "1JYV4dKe5hg",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=1JYV4dKe5hg",
    "videoUrl": "https://www.youtube-nocookie.com/embed/1JYV4dKe5hg",
    "videoDuration": "12:45",
    "videoChapters": [
      {
        "time": 0,
        "label": "Chicken Cut & Prep"
      },
      {
        "time": 135,
        "label": "Yogurt & Kashmiri Chili Marinade"
      },
      {
        "time": 330,
        "label": "High-Heat Smoky Sear"
      },
      {
        "time": 490,
        "label": "Silk Cashew Tomato Sauce"
      },
      {
        "time": 680,
        "label": "Kasuri Methi & Butter Finish"
      }
    ],
    "tags": [
      "Signature",
      "Comfort Food",
      "Gluten-Free",
      "Rich Gravy"
    ],
    "ingredients": [
      {
        "item": "Boneless Chicken Thighs (cubed)",
        "amount": 750,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "Greek Yogurt (for marinade)",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Ginger-Garlic Paste",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Produce"
      },
      {
        "item": "Kashmiri Red Chili Powder",
        "amount": 1.5,
        "unit": "tbsp",
        "aisle": "Spices"
      },
      {
        "item": "Garam Masala",
        "amount": 1,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Ripe San Marzano Tomatoes (pureed)",
        "amount": 500,
        "unit": "g",
        "aisle": "Produce"
      },
      {
        "item": "Raw Cashews (soaked & blended)",
        "amount": 50,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Grass-fed Butter",
        "amount": 60,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Heavy Cream",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Kasuri Methi (crushed fenugreek)",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Spices"
      },
      {
        "item": "Fresh Cilantro for garnish",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Produce"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate the Chicken",
        "text": "In a mixing bowl, toss chicken cubes with Greek yogurt, ginger-garlic paste, 1 tbsp Kashmiri chili, and a pinch of salt. Rest for at least 30 minutes in refrigerator.",
        "timerMinutes": 30,
        "tip": "Marinating overnight yields the most tender texture."
      },
      {
        "step": 2,
        "title": "Sear to Smoky Char",
        "text": "Heat a heavy skillet with 1 tbsp butter. Pan-sear chicken pieces over high heat for 6-8 minutes until charred on the edges. Remove and set aside.",
        "timerMinutes": 8,
        "tip": "Do not overcrowd skillet; sear in batches if needed."
      },
      {
        "step": 3,
        "title": "Simmer Gravy Base",
        "text": "In the same pan, melt remaining butter. Add pureed tomatoes, cashew cream, and remaining spices. Simmer for 15 minutes on medium-low until oil separates.",
        "timerMinutes": 15,
        "tip": "Strain the tomato puree if you want an ultra-silky restaurant sheen."
      },
      {
        "step": 4,
        "title": "Combine & Infuse",
        "text": "Gently fold in charred chicken pieces and simmer for 10 minutes until chicken is cooked through.",
        "timerMinutes": 10,
        "tip": "Keep heat gentle so cream doesn't curdle."
      },
      {
        "step": 5,
        "title": "Finish with Kasuri Methi & Cream",
        "text": "Swirl in heavy cream and crushed kasuri methi between your palms. Serve smoking hot with garlic butter naan or basmati pilaf.",
        "timerMinutes": 2,
        "tip": "Fenugreek brings that hallmark restaurant aroma!"
      }
    ],
    "nutrition": {
      "calories": 520,
      "protein": 42,
      "carbs": 14,
      "fat": 34,
      "fiber": 3
    },
    "chefTips": [
      "Roast the kasuri methi for 15 seconds in a dry pan before crushing between your palms for heightened aromatics.",
      "Pair with garlic coriander naan and thinly sliced red onions soaked in lemon juice."
    ]
  },
  {
    "id": "authentic-carbonara",
    "title": "Classic Roman Spaghetti Carbonara",
    "description": "The gold standard Roman pasta featuring silky egg yolks, crispy cured guanciale, freshly grated Pecorino Romano, and coarsely cracked black pepper. No cream needed.",
    "cuisine": "Italian",
    "category": "Italian",
    "prepTime": 10,
    "cookTime": 15,
    "servings": 2,
    "calories": 610,
    "difficulty": "Medium",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.98,
    "reviewsCount": 520,
    "author": {
      "name": "Chef Marco Valenti",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "title": "Trastevere Roman Chef"
    },
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": true,
    "seasonal": false,
    "hasVideo": true,
    "youtubeId": "INh6tzqQI0s",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=INh6tzqQI0s",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "10:20",
    "videoChapters": [
      {
        "time": 0,
        "label": "Roman Golden Rules"
      },
      {
        "time": 105,
        "label": "Slow Guanciale Rendering"
      },
      {
        "time": 260,
        "label": "Egg & Pecorino Crema"
      },
      {
        "time": 430,
        "label": "Pasta Water Emulsion"
      },
      {
        "time": 540,
        "label": "Off-Flame Mantecatura"
      }
    ],
    "tags": [
      "Italian Classic",
      "Quick Dinner",
      "Comfort Food",
      "No Cream"
    ],
    "ingredients": [
      {
        "item": "Artisanal Bronze-Cut Spaghetti",
        "amount": 250,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Guanciale (or thick pancetta), cut in lardons",
        "amount": 150,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "Fresh Egg Yolks (farm fresh)",
        "amount": 3,
        "unit": "large",
        "aisle": "Dairy"
      },
      {
        "item": "Whole Egg",
        "amount": 1,
        "unit": "large",
        "aisle": "Dairy"
      },
      {
        "item": "Aged Pecorino Romano (finely grated)",
        "amount": 60,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Parmigiano Reggiano (finely grated)",
        "amount": 20,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Freshly Cracked Tellicherry Black Pepper",
        "amount": 1.5,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Starchy Pasta Water",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Crisp the Guanciale",
        "text": "Place sliced guanciale in a cold skillet and bring to medium heat. Render the fat slowly for 8-10 minutes until golden and crisp. Turn off heat.",
        "timerMinutes": 10,
        "tip": "Never add oil; guanciale releases plenty of flavor-packed fat."
      },
      {
        "step": 2,
        "title": "Boil the Spaghetti",
        "text": "Drop spaghetti into boiling salted water. Cook until 2 minutes shy of al dente.",
        "timerMinutes": 8,
        "tip": "Use less water than usual to create ultra-starchy water."
      },
      {
        "step": 3,
        "title": "Whisk Egg & Cheese Crema",
        "text": "In a ceramic bowl, whisk egg yolks, whole egg, grated Pecorino, Parmigiano, and freshly cracked black pepper into a thick paste.",
        "timerMinutes": 3,
        "tip": "Room temperature eggs emulsify much faster."
      },
      {
        "step": 4,
        "title": "Toss Pasta in Fat",
        "text": "Transfer pasta directly into the warm skillet with guanciale fat. Splash with 3 tbsp pasta water to create a glossy emulsion.",
        "timerMinutes": 2,
        "tip": "Take skillet completely off heat before adding eggs to avoid scrambling."
      },
      {
        "step": 5,
        "title": "Emulsify Off the Flame",
        "text": "Pour in egg-cheese mixture, tossing rapidly with tongs. The residual heat creates an impossibly velvety, creamy sauce. Serve immediately.",
        "timerMinutes": 1,
        "tip": "If too thick, add a spoonful of starchy water."
      }
    ],
    "nutrition": {
      "calories": 610,
      "protein": 29,
      "carbs": 68,
      "fat": 26,
      "fiber": 2
    },
    "chefTips": [
      "Under no circumstances use heavy cream; authentic Roman carbonara achieves luscious creaminess through egg yolk emulsification.",
      "Garnish with extra crispy guanciale and coarse black pepper."
    ]
  },
  {
    "id": "szechuan-kung-pao",
    "title": "Szechuan Kung Pao Chicken with Roasted Peanuts",
    "description": "Crisp wok-tossed chicken breast, mouth-numbing Szechuan peppercorns, dried red chilis, scallions, and toasted peanuts in a sweet, savory, and tangy dark glaze.",
    "cuisine": "Chinese",
    "category": "Chinese",
    "prepTime": 20,
    "cookTime": 10,
    "servings": 3,
    "calories": 460,
    "difficulty": "Medium",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.89,
    "reviewsCount": 210,
    "author": {
      "name": "Chef Wei Zhang",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      "title": "Wok Master & Sichuan Specialist"
    },
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": false,
    "hasVideo": true,
    "youtubeId": "eBAT31s61T8",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=eBAT31s61T8",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "8:50",
    "videoChapters": [
      {
        "time": 0,
        "label": "Velveting Chicken"
      },
      {
        "time": 150,
        "label": "Kung Pao Dark Glaze"
      },
      {
        "time": 285,
        "label": "Wok Hei Chili Flash"
      },
      {
        "time": 435,
        "label": "Glaze & Peanut Crunch"
      }
    ],
    "tags": [
      "Wok Fried",
      "Spicy",
      "High Protein",
      "Crowd Favorite"
    ],
    "ingredients": [
      {
        "item": "Chicken Breast (diced into 1.5cm cubes)",
        "amount": 500,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "Light Soy Sauce",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Shaoxing Rice Wine",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Cornstarch",
        "amount": 1.5,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Szechuan Peppercorns",
        "amount": 1,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Dried Red Sichuan Chilis (seeded & halved)",
        "amount": 12,
        "unit": "whole",
        "aisle": "Produce"
      },
      {
        "item": "Scallions / Spring Onions (white & green parts separated)",
        "amount": 4,
        "unit": "stalks",
        "aisle": "Produce"
      },
      {
        "item": "Minced Garlic & Ginger",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Produce"
      },
      {
        "item": "Roasted Unsalted Peanuts",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Chinkiang Black Vinegar",
        "amount": 1.5,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Toasted Sesame Oil",
        "amount": 1,
        "unit": "tsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Velvet the Chicken",
        "text": "Combine diced chicken with 1 tbsp soy sauce, Shaoxing wine, and cornstarch. Toss well and let stand 15 minutes.",
        "timerMinutes": 15,
        "tip": "Velveting seals moisture inside the lean meat."
      },
      {
        "step": 2,
        "title": "Mix Kung Pao Sauce",
        "text": "In a small cup, stir black vinegar, 1 tbsp soy sauce, 1 tsp sugar, sesame oil, and 1 tsp cornstarch with 2 tbsp water.",
        "timerMinutes": 2,
        "tip": "Have sauce ready; wok cooking is rapid!"
      },
      {
        "step": 3,
        "title": "Sear Aromatics in Wok",
        "text": "Heat wok on high until smoking. Swirl in peanut oil. Add chilis and Sichuan peppercorns; stir-fry for 20 seconds until fragrant.",
        "timerMinutes": 1,
        "tip": "Don't burn the chilis; adjust flame swiftly."
      },
      {
        "step": 4,
        "title": "Wok Toss Chicken",
        "text": "Add chicken in a single layer. Sear for 2 minutes undisturbed, then stir-fry vigorously with garlic, ginger, and scallion whites.",
        "timerMinutes": 4,
        "tip": "Keep wok smoking hot for signature 'wok hei' aroma."
      },
      {
        "step": 5,
        "title": "Glaze and Finish",
        "text": "Pour in prepared sauce. Toss for 1 minute until sauce glazes the chicken. Toss in roasted peanuts and scallion greens. Serve over jasmine rice.",
        "timerMinutes": 2,
        "tip": "Peanuts stay crunchiest when added right before plating."
      }
    ],
    "nutrition": {
      "calories": 460,
      "protein": 44,
      "carbs": 18,
      "fat": 24,
      "fiber": 4
    },
    "chefTips": [
      "Use authentic Chinkiang black vinegar for the subtle smoky acidity unique to Sichuan cooking.",
      "Lightly toast peanuts in a dry skillet before tossing into the wok."
    ]
  },
  {
    "id": "molten-chocolate-lava-cake",
    "title": "Warm Dark Chocolate Molten Lava Cake",
    "description": "Decadent Valrhona 70% dark chocolate mini-cakes with a tender, moist sponge exterior and a luscious, flowing warm ganache center. Dust with cocoa and vanilla bean gelato.",
    "cuisine": "French",
    "category": "Desserts",
    "prepTime": 15,
    "cookTime": 12,
    "servings": 4,
    "calories": 420,
    "difficulty": "Easy",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.97,
    "reviewsCount": 680,
    "author": {
      "name": "Chef Claire Fontaine",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      "title": "French Pastry Artisan"
    },
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": false,
    "seasonal": true,
    "hasVideo": true,
    "youtubeId": "53RSO_o1DX0",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=53RSO_o1DX0",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "7:15",
    "videoChapters": [
      {
        "time": 0,
        "label": "Buttered Ramekin Dusting"
      },
      {
        "time": 110,
        "label": "Melting Valrhona & Butter"
      },
      {
        "time": 220,
        "label": "Folding Chocolate Batter"
      },
      {
        "time": 320,
        "label": "Bake & Molten Center"
      }
    ],
    "tags": [
      "Baking",
      "Chocolate",
      "Indulgence",
      "Date Night"
    ],
    "ingredients": [
      {
        "item": "70% Dark Bittersweet Chocolate",
        "amount": 170,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Unsalted Butter",
        "amount": 115,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Powdered Sugar",
        "amount": 60,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Large Eggs (room temp)",
        "amount": 2,
        "unit": "whole",
        "aisle": "Dairy"
      },
      {
        "item": "Egg Yolks",
        "amount": 2,
        "unit": "whole",
        "aisle": "Dairy"
      },
      {
        "item": "Pure Vanilla Extract",
        "amount": 1,
        "unit": "tsp",
        "aisle": "Pantry"
      },
      {
        "item": "All-Purpose Flour",
        "amount": 35,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Flaky Sea Salt",
        "amount": 0.25,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Dutch Process Cocoa Powder (for ramekins)",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Prep the Ramekins",
        "text": "Preheat oven to 425°F (220°C). Butter four 6-ounce ramekins thoroughly, then dust with cocoa powder, tapping out excess.",
        "timerMinutes": 5,
        "tip": "Properly buttering guarantees effortless unmolding."
      },
      {
        "step": 2,
        "title": "Melt Chocolate & Butter",
        "text": "Melt chopped chocolate and butter in a heatproof bowl set over a pot of simmering water until glossy and smooth.",
        "timerMinutes": 5,
        "tip": "Never let the bottom of the bowl touch the water."
      },
      {
        "step": 3,
        "title": "Whisk Eggs & Sugar",
        "text": "In a separate bowl, whisk whole eggs, egg yolks, powdered sugar, and vanilla until pale and frothy.",
        "timerMinutes": 3,
        "tip": "Whisking incorporates air for a delicate crust."
      },
      {
        "step": 4,
        "title": "Fold Batter",
        "text": "Pour chocolate mixture into egg mixture, then gently fold in flour and salt until just combined.",
        "timerMinutes": 2,
        "tip": "Do not overmix."
      },
      {
        "step": 5,
        "title": "Bake to Perfection",
        "text": "Divide batter evenly. Bake for 12-14 minutes until edges are firm but center is soft and jiggly. Invert onto dessert plates and serve hot.",
        "timerMinutes": 12,
        "tip": "If edges cling, run a thin paring knife gently around rim."
      }
    ],
    "nutrition": {
      "calories": 420,
      "protein": 7,
      "carbs": 36,
      "fat": 28,
      "fiber": 4
    },
    "chefTips": [
      "Serve alongside vanilla bean gelato or fresh raspberries to cut the rich chocolate density.",
      "Can be prepared up to 24 hours in advance and chilled in ramekins before baking."
    ]
  },
  {
    "id": "avocado-poached-egg-toast",
    "title": "Artisanal Avocado Toast with Poached Eggs & Dukkah",
    "description": "Thick-cut grilled sourdough layered with lemon-herb smashed Hass avocado, perfectly runny pasture-raised poached eggs, Egyptian hazelnut dukkah, and chili flakes.",
    "cuisine": "Modern Australian",
    "category": "Breakfast",
    "prepTime": 10,
    "cookTime": 6,
    "servings": 2,
    "calories": 380,
    "difficulty": "Easy",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.92,
    "reviewsCount": 390,
    "author": {
      "name": "Chef Liam Hemsworth",
      "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      "title": "Melbourne Brunch Specialist"
    },
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": false,
    "tags": [
      "Healthy Brunch",
      "Vegetarian",
      "High Fiber",
      "15-Min Breakfast"
    ],
    "ingredients": [
      {
        "item": "Artisan Sourdough Bread (thick slices)",
        "amount": 2,
        "unit": "slices",
        "aisle": "Pantry"
      },
      {
        "item": "Ripe Hass Avocados",
        "amount": 2,
        "unit": "whole",
        "aisle": "Produce"
      },
      {
        "item": "Pasture-Raised Eggs",
        "amount": 2,
        "unit": "large",
        "aisle": "Dairy"
      },
      {
        "item": "Fresh Lemon Juice",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Produce"
      },
      {
        "item": "Extra Virgin Olive Oil",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Egyptian Dukkah (hazelnut & sesame blend)",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Spices"
      },
      {
        "item": "Aleppo Chili Flakes",
        "amount": 0.5,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Microgreens & Radish Slices",
        "amount": 0.25,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Maldon Sea Salt Flakes",
        "amount": 0.5,
        "unit": "tsp",
        "aisle": "Spices"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Sizzle Sourdough",
        "text": "Brush sourdough slices with olive oil and toast on a smoking ridged cast-iron griddle until crisp with charred lines.",
        "timerMinutes": 3,
        "tip": "Cast iron creates unbeatable smoky crust."
      },
      {
        "step": 2,
        "title": "Smash Avocado",
        "text": "In a bowl, coarsely smash avocados with lemon juice, sea salt, and a pinch of black pepper. Keep some texture chunks.",
        "timerMinutes": 2,
        "tip": "Never over-puree; rustic chunks make every bite delightful."
      },
      {
        "step": 3,
        "title": "Poach the Eggs",
        "text": "Bring a small pot of water to a gentle simmer with a drop of vinegar. Swirl water into a whirlpool, gently slide in egg, and poach for 3 minutes.",
        "timerMinutes": 3,
        "tip": "Fresh eggs stay tight in the water without straggly whites."
      },
      {
        "step": 4,
        "title": "Assemble & Garnish",
        "text": "Generously spread avocado over hot toasts. Top each with a poached egg. Shower with dukkah, Aleppo chili, and microgreens.",
        "timerMinutes": 2,
        "tip": "Slice into egg at the table for that satisfying golden yolk pour."
      }
    ],
    "nutrition": {
      "calories": 380,
      "protein": 15,
      "carbs": 32,
      "fat": 22,
      "fiber": 9
    },
    "chefTips": [
      "Dukkah adds a fragrant nutty crunch: toast equal parts hazelnuts, sesame seeds, coriander, and cumin.",
      "Add a smear of goat cheese or whipped feta beneath the avocado for added depth."
    ],
    "hasVideo": true,
    "youtubeId": "GxL9fTvf4go",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=GxL9fTvf4go",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "6:30",
    "videoChapters": [
      {
        "time": 0,
        "label": "Sourdough Griddle Toast"
      },
      {
        "time": 90,
        "label": "Coarse Avocado Mash"
      },
      {
        "time": 180,
        "label": "Vortex Poached Eggs"
      },
      {
        "time": 270,
        "label": "Egyptian Dukkah Sprinkle"
      }
    ]
  },
  {
    "id": "grilled-salmon-quinoa-bowl",
    "title": "Wild Atlantic Salmon with Lemon-Herb Quinoa",
    "description": "Crispy skin Atlantic salmon fillet served over fluffy tricolor quinoa, grilled asparagus spears, ripe cherry tomatoes, and a bright herb salsa verde.",
    "cuisine": "Mediterranean",
    "category": "Healthy Meals",
    "prepTime": 15,
    "cookTime": 15,
    "servings": 2,
    "calories": 490,
    "difficulty": "Easy",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.94,
    "reviewsCount": 410,
    "author": {
      "name": "Dr. Elena Rostova",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      "title": "Integrative Nutritionist & Chef"
    },
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": false,
    "seasonal": true,
    "tags": [
      "Omega-3 Rich",
      "Clean Eating",
      "Heart Healthy",
      "Gluten-Free"
    ],
    "ingredients": [
      {
        "item": "Wild Salmon Fillets (skin on)",
        "amount": 2,
        "unit": "fillets (180g each)",
        "aisle": "Meat"
      },
      {
        "item": "Tricolor Quinoa (rinsed)",
        "amount": 1,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Vegetable or Bone Broth",
        "amount": 2,
        "unit": "cups",
        "aisle": "Pantry"
      },
      {
        "item": "Fresh Asparagus (trimmed)",
        "amount": 1,
        "unit": "bunch",
        "aisle": "Produce"
      },
      {
        "item": "Cherry Tomatoes (halved)",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Italian Parsley & Mint",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Lemon (zest and juice)",
        "amount": 1,
        "unit": "whole",
        "aisle": "Produce"
      },
      {
        "item": "Cold-Pressed Extra Virgin Olive Oil",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Garlic (finely grated)",
        "amount": 1,
        "unit": "clove",
        "aisle": "Produce"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Cook the Quinoa",
        "text": "Simmer rinsed quinoa in vegetable broth with lemon zest and a pinch of salt for 15 minutes. Fluff with fork.",
        "timerMinutes": 15,
        "tip": "Rinsing removes natural bitter saponin coating."
      },
      {
        "step": 2,
        "title": "Whisk Herb Salsa Verde",
        "text": "Finely chop parsley and mint. Whisk with lemon juice, grated garlic, olive oil, salt, and pepper.",
        "timerMinutes": 3,
        "tip": "Prepare fresh right before serving for vibrant green hue."
      },
      {
        "step": 3,
        "title": "Grill Asparagus & Tomatoes",
        "text": "Toss asparagus and tomatoes with olive oil. Sear on a hot grill pan for 5 minutes until tender-crisp.",
        "timerMinutes": 5,
        "tip": "High heat keeps asparagus bright and crunchy."
      },
      {
        "step": 4,
        "title": "Crisp the Salmon Skin",
        "text": "Pat salmon skin dry. Season both sides. Place skin-down in a hot skillet with 1 tsp oil, pressing gently for 4 minutes. Flip and cook 2 minutes more.",
        "timerMinutes": 6,
        "tip": "Pressing down prevents skin from curling up."
      },
      {
        "step": 5,
        "title": "Plate & Drizzle",
        "text": "Spoon quinoa into shallow bowls, arrange grilled asparagus and tomatoes, rest salmon on top, and spoon fragrant salsa verde generously.",
        "timerMinutes": 2,
        "tip": "Salmon is juiciest when cooked to medium with tender flakes."
      }
    ],
    "nutrition": {
      "calories": 490,
      "protein": 46,
      "carbs": 34,
      "fat": 19,
      "fiber": 6
    },
    "chefTips": [
      "Ensure salmon skin is thoroughly dry with a paper towel before it hits the hot pan for glass-shatter crispiness.",
      "Store leftover quinoa for meal prep up to 4 days."
    ],
    "hasVideo": true,
    "youtubeId": "vvKTyETdbpo",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=vvKTyETdbpo",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "9:40",
    "videoChapters": [
      {
        "time": 0,
        "label": "Quinoa Steam & Fluff"
      },
      {
        "time": 140,
        "label": "Crispy Salmon Skin Sear"
      },
      {
        "time": 320,
        "label": "Lemon Herb Salsa Verde"
      },
      {
        "time": 480,
        "label": "Rainbow Bowl Plating"
      }
    ]
  },
  {
    "id": "mumbai-pani-puri",
    "title": "Crispy Mumbai Pani Puri (Gol Gappe)",
    "description": "Golden hollow crispy semolina puris filled with spiced potato-sprouted moong mash, drenched in ice-cold fiery mint-coriander water and sweet date-tamarind chutney.",
    "cuisine": "Indian",
    "category": "Street Food",
    "prepTime": 20,
    "cookTime": 10,
    "servings": 4,
    "calories": 280,
    "difficulty": "Medium",
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": false,
    "rating": 4.96,
    "reviewsCount": 570,
    "author": {
      "name": "Chef Rajesh Kapoor",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      "title": "Mumbai Chaat Pioneer"
    },
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": false,
    "tags": [
      "Street Food Icon",
      "Tangy & Spicy",
      "Vegan",
      "Party Favorite"
    ],
    "ingredients": [
      {
        "item": "Crispy Hollow Puris",
        "amount": 30,
        "unit": "pieces",
        "aisle": "Pantry"
      },
      {
        "item": "Boiled Potatoes (crushed)",
        "amount": 3,
        "unit": "medium",
        "aisle": "Produce"
      },
      {
        "item": "Sprouted Green Moong (boiled)",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Mint Leaves (tightly packed)",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Coriander Leaves",
        "amount": 1.5,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Green Chilis & Ginger",
        "amount": 3,
        "unit": "whole",
        "aisle": "Produce"
      },
      {
        "item": "Black Salt (Kala Namak)",
        "amount": 1.5,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Roasted Cumin Powder",
        "amount": 1.5,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Chaat Masala",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Spices"
      },
      {
        "item": "Tamarind-Date Chutney",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Chilled Mineral Water & Ice Cubes",
        "amount": 4,
        "unit": "cups",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Blend the Teekha Pani",
        "text": "Blend mint, coriander, green chilis, and ginger with 0.5 cup water until super smooth. Strain into a jug.",
        "timerMinutes": 5,
        "tip": "Add ice while blending to preserve stunning emerald color."
      },
      {
        "step": 2,
        "title": "Season the Spicy Water",
        "text": "Stir in chilled water, black salt, chaat masala, roasted cumin, and lemon juice. Chill in fridge.",
        "timerMinutes": 5,
        "tip": "Taste and adjust tanginess with lemon juice."
      },
      {
        "step": 3,
        "title": "Make the Masala Filling",
        "text": "In a bowl, mix crushed boiled potatoes, boiled sprouted moong, black salt, red chili powder, and chopped cilantro.",
        "timerMinutes": 5,
        "tip": "Sprouted moong brings wholesome texture and protein."
      },
      {
        "step": 4,
        "title": "Crack & Fill",
        "text": "Crack a hole in top center of a puri with thumb. Fill with 1 tsp spiced potato-moong mash.",
        "timerMinutes": 2,
        "tip": "Use firm, light tap."
      },
      {
        "step": 5,
        "title": "Pour & Eat in One Bite",
        "text": "Add a drizzle of sweet tamarind chutney, ladle ice-cold mint water to the brim, and pop into your mouth immediately!",
        "timerMinutes": 1,
        "tip": "Must be consumed in one bite for the legendary explosion of flavors!"
      }
    ],
    "nutrition": {
      "calories": 280,
      "protein": 8,
      "carbs": 54,
      "fat": 4,
      "fiber": 7
    },
    "chefTips": [
      "Add tiny boondi (crispy chickpea pearls) directly into the spicy water right before serving for extra crunch.",
      "The secret lies in premium Kala Namak (Himalayan black mineral salt)."
    ],
    "hasVideo": true,
    "youtubeId": "yOobLm_Urpc",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=yOobLm_Urpc",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "8:15",
    "videoChapters": [
      {
        "time": 0,
        "label": "Crispy Puri Frying"
      },
      {
        "time": 120,
        "label": "Fiery Mint-Coriander Teekha Pani"
      },
      {
        "time": 280,
        "label": "Sweet Tamarind Saunth"
      },
      {
        "time": 410,
        "label": "Spiced Potato Stuffing & Assembly"
      }
    ]
  },
  {
    "id": "15min-garlic-butter-shrimp-scampi",
    "title": "15-Minute Garlic Butter Shrimp Scampi",
    "description": "Succulent jumbo tiger shrimp sautéed in fragrant garlic-infused butter, crisp Pinot Grigio, crushed red pepper flakes, fresh lemon zest, and flat-leaf parsley.",
    "cuisine": "Italian-American",
    "category": "Quick Recipes",
    "prepTime": 5,
    "cookTime": 10,
    "servings": 2,
    "calories": 340,
    "difficulty": "Easy",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.96,
    "reviewsCount": 460,
    "author": {
      "name": "Chef Anthony Bell",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      "title": "Seafood & Grill Specialist"
    },
    "image": "https://images.unsplash.com/photo-1559742811-82286364749f?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": false,
    "tags": [
      "15 Minutes",
      "Quick Weeknight",
      "Seafood",
      "Keto Friendly"
    ],
    "ingredients": [
      {
        "item": "Jumbo Raw Shrimp (peeled & deveined, tail on)",
        "amount": 450,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "Extra Virgin Olive Oil",
        "amount": 1.5,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Unsalted Butter",
        "amount": 3,
        "unit": "tbsp",
        "aisle": "Dairy"
      },
      {
        "item": "Garlic (thinly slivered)",
        "amount": 6,
        "unit": "cloves",
        "aisle": "Produce"
      },
      {
        "item": "Dry White Wine (Pinot Grigio or Sauvignon Blanc)",
        "amount": 0.33,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Fresh Lemon Juice & Zest",
        "amount": 1,
        "unit": "lemon",
        "aisle": "Produce"
      },
      {
        "item": "Crushed Red Pepper Flakes",
        "amount": 0.5,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Fresh Flat-Leaf Parsley (chopped)",
        "amount": 0.25,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Crusty Garlic Bread (for dipping)",
        "amount": 4,
        "unit": "slices",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Sauté the Garlic",
        "text": "In a wide skillet, heat olive oil and 1 tbsp butter over medium-low heat. Add sliced garlic and chili flakes; cook gently for 90 seconds until fragrant without browning.",
        "timerMinutes": 2,
        "tip": "Never let garlic brown or it turns bitter."
      },
      {
        "step": 2,
        "title": "Sear the Shrimp",
        "text": "Turn heat to medium-high. Add shrimp in a single layer. Season with sea salt. Cook for 2 minutes on first side until pink.",
        "timerMinutes": 2,
        "tip": "Shrimp cooks exceptionally fast; don't walk away."
      },
      {
        "step": 3,
        "title": "Deglaze with White Wine",
        "text": "Flip shrimp. Pour in white wine and fresh lemon juice. Simmer for 2 minutes while wine reduces by half.",
        "timerMinutes": 2,
        "tip": "Use a wine you would happily drink."
      },
      {
        "step": 4,
        "title": "Swirl Cold Butter",
        "text": "Remove from heat immediately. Swirl in remaining 2 tbsp cold butter until sauce turns glossy and emulsified.",
        "timerMinutes": 1,
        "tip": "Cold butter is the culinary secret to velvety restaurant pan sauces."
      },
      {
        "step": 5,
        "title": "Garnish & Serve",
        "text": "Shower with fresh chopped parsley and lemon zest. Serve immediately with warm crusty sourdough to sop up every drop.",
        "timerMinutes": 1,
        "tip": "Can also be tossed with angel hair pasta."
      }
    ],
    "nutrition": {
      "calories": 340,
      "protein": 36,
      "carbs": 5,
      "fat": 19,
      "fiber": 0.5
    },
    "chefTips": [
      "Pat shrimp thoroughly dry before cooking to ensure a quick sear rather than steaming.",
      "If avoiding alcohol, substitute wine with rich chicken broth and an extra squeeze of fresh lemon."
    ],
    "hasVideo": true,
    "youtubeId": "-oefWiNuxBY",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=-oefWiNuxBY",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "8:05",
    "videoChapters": [
      {
        "time": 0,
        "label": "Jumbo Shrimp High-Heat Sear"
      },
      {
        "time": 130,
        "label": "Pinot Grigio Deglaze"
      },
      {
        "time": 250,
        "label": "Garlic Butter Emulsion"
      },
      {
        "time": 370,
        "label": "Parsley & Lemon Swirl"
      }
    ]
  },
  {
    "id": "shahi-paneer-deluxe",
    "title": "Royal Shahi Paneer with Saffron & Rose Water",
    "description": "Melt-in-the-mouth cottage cheese cubes simmered in a royal Mughlai gravy of soaked cashews, sweet onions, whole cardamom, Kashmiri saffron strands, and a splash of pure rose water.",
    "cuisine": "Indian",
    "category": "Indian",
    "prepTime": 20,
    "cookTime": 25,
    "servings": 4,
    "calories": 440,
    "difficulty": "Medium",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.93,
    "reviewsCount": 312,
    "author": {
      "name": "Chef Sanjeev Mehra",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      "title": "Awadhi Royal Cuisine Specialist"
    },
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": false,
    "seasonal": true,
    "tags": [
      "Mughlai Royal",
      "Vegetarian",
      "Saffron Infused",
      "Dinner Party"
    ],
    "ingredients": [
      {
        "item": "Malai Paneer (cubed)",
        "amount": 400,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Cashews (soaked in warm water)",
        "amount": 50,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Onions (boiled & pureed)",
        "amount": 2,
        "unit": "medium",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Tomato Puree",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Desi Ghee (clarified butter)",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Dairy"
      },
      {
        "item": "Green Cardamom & Cloves",
        "amount": 4,
        "unit": "pods",
        "aisle": "Spices"
      },
      {
        "item": "Kashmiri Saffron Strands",
        "amount": 1,
        "unit": "pinch (soaked in 2 tbsp warm milk)",
        "aisle": "Spices"
      },
      {
        "item": "Heavy Cream",
        "amount": 0.33,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Rose Water / Kewra Water",
        "amount": 0.5,
        "unit": "tsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Infuse Saffron",
        "text": "Steep saffron strands in 2 tbsp warm milk for 15 minutes until glowing orange.",
        "timerMinutes": 15,
        "tip": "Saffron unlocks majestic Mughlai royalty."
      },
      {
        "step": 2,
        "title": "Sauté Aromatics in Ghee",
        "text": "Melt ghee in a handi. Add cardamom and cloves, then add boiled onion paste. Cook until golden for 8 minutes.",
        "timerMinutes": 8,
        "tip": "Boiling onions beforehand removes pungent sulfur."
      },
      {
        "step": 3,
        "title": "Simmer Silky Gravy",
        "text": "Add pureed tomatoes and cashew paste. Simmer on low heat with spices until aromatic and rich.",
        "timerMinutes": 10,
        "tip": "Stir constantly as cashew paste can stick to the base."
      },
      {
        "step": 4,
        "title": "Add Paneer & Royal Touches",
        "text": "Gently add paneer cubes, saffron milk, heavy cream, and rose water. Simmer gently for 4 minutes.",
        "timerMinutes": 4,
        "tip": "Soak paneer in warm salted water for 10 mins prior to cooking."
      }
    ],
    "nutrition": {
      "calories": 440,
      "protein": 22,
      "carbs": 16,
      "fat": 32,
      "fiber": 2
    },
    "chefTips": [
      "Never overcook paneer cubes or they turn rubbery; keep the heat low and gentle."
    ],
    "hasVideo": true,
    "youtubeId": "xqjLvDFZxBs",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=xqjLvDFZxBs",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "11:20",
    "videoChapters": [
      {
        "time": 0,
        "label": "Cashew & Melon Seed Paste"
      },
      {
        "time": 180,
        "label": "Kashmiri Saffron Infusion"
      },
      {
        "time": 350,
        "label": "Velvet Malai Gravy Simmer"
      },
      {
        "time": 530,
        "label": "Golden Paneer & Rose Petals"
      }
    ]
  },
  {
    "id": "wild-mushroom-truffle-risotto",
    "title": "Wild Mushroom & Black Truffle Risotto",
    "description": "Creamy Carnaroli rice slowly coaxed with warm porcini broth, sautéed chanterelles and cremini mushrooms, finished with aged Parmigiano, cultured butter, and black truffle carpaccio.",
    "cuisine": "Italian",
    "category": "Italian",
    "prepTime": 15,
    "cookTime": 30,
    "servings": 3,
    "calories": 480,
    "difficulty": "Hard",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.96,
    "reviewsCount": 290,
    "author": {
      "name": "Chef Marco Valenti",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "title": "Trastevere Roman Chef"
    },
    "image": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": true,
    "hasVideo": true,
    "youtubeId": "Z4_z-8vqp0g",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=Z4_z-8vqp0g",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "9:15",
    "videoChapters": [
      {
        "time": 0,
        "label": "Mushroom Caramelization"
      },
      {
        "time": 160,
        "label": "Tostatura (Rice Toasting)"
      },
      {
        "time": 310,
        "label": "Simmering Broth Ladles"
      },
      {
        "time": 480,
        "label": "Mantecatura & Truffle"
      }
    ],
    "tags": [
      "Fine Dining",
      "Truffle",
      "Vegetarian",
      "Autumn Favorite"
    ],
    "ingredients": [
      {
        "item": "Carnaroli or Arborio Rice",
        "amount": 300,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Dried Porcini Mushrooms (steeped)",
        "amount": 30,
        "unit": "g",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Chanterelle / Cremini Mushrooms",
        "amount": 250,
        "unit": "g",
        "aisle": "Produce"
      },
      {
        "item": "Shallot (finely minced)",
        "amount": 1,
        "unit": "large",
        "aisle": "Produce"
      },
      {
        "item": "Dry White Wine",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Warm Vegetable Broth + Porcini Liquor",
        "amount": 5,
        "unit": "cups",
        "aisle": "Pantry"
      },
      {
        "item": "Cold Unsalted Cultured Butter",
        "amount": 50,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Parmigiano Reggiano (freshly grated)",
        "amount": 75,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Black Truffle Oil or Fresh Truffle Slices",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Sauté Wild Mushrooms",
        "text": "Sauté fresh mushrooms in 1 tbsp butter on high heat until caramelized. Set half aside for plating.",
        "timerMinutes": 6,
        "tip": "Do not salt until golden brown to prevent water release."
      },
      {
        "step": 2,
        "title": "Toast the Rice (Tostatura)",
        "text": "Cook minced shallots in butter until translucent. Add Carnaroli rice, toasting for 3 minutes until grains are pearly translucent.",
        "timerMinutes": 3,
        "tip": "Tostatura creates the starch barrier for perfect al dente texture."
      },
      {
        "step": 3,
        "title": "Deglaze & Simmer (Cottura)",
        "text": "Pour in white wine; let it evaporate. Gradually ladle warm broth one scoop at a time, stirring continuously for 18 minutes.",
        "timerMinutes": 18,
        "tip": "Constant stirring releases amylopectin starch for natural creaminess."
      },
      {
        "step": 4,
        "title": "Mantecatura (The Sacred Finish)",
        "text": "Take pan off heat. Vigorously beat in cold cubed butter and Parmigiano until risotto forms undulating waves (all'onda). Garnish with truffle.",
        "timerMinutes": 3,
        "tip": "Always rest 1 minute covered before dishing out."
      }
    ],
    "nutrition": {
      "calories": 480,
      "protein": 14,
      "carbs": 65,
      "fat": 18,
      "fiber": 4
    },
    "chefTips": [
      "Strain the mushroom soaking liquid through a fine coffee filter to catch any forest grit."
    ]
  },
  {
    "id": "fluffy-blueberry-ricotta-pancakes",
    "title": "Cloud-Light Ricotta Blueberry Pancakes",
    "description": "Extra fluffy soufflé-style ricotta pancakes dotted with bursting organic blueberries, crowned with honeycomb butter and pure Vermont amber maple syrup.",
    "cuisine": "American",
    "category": "Breakfast",
    "prepTime": 15,
    "cookTime": 12,
    "servings": 4,
    "calories": 360,
    "difficulty": "Easy",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.97,
    "reviewsCount": 510,
    "author": {
      "name": "Chef Liam Hemsworth",
      "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      "title": "Melbourne Brunch Specialist"
    },
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": true,
    "seasonal": false,
    "hasVideo": true,
    "youtubeId": "RWD30vY1OGk",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=RWD30vY1OGk",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "6:40",
    "videoChapters": [
      {
        "time": 0,
        "label": "Meringue Whipping"
      },
      {
        "time": 130,
        "label": "Ricotta & Zest Fold"
      },
      {
        "time": 270,
        "label": "Lidded Griddle Steam"
      },
      {
        "time": 350,
        "label": "Stacking & Maple Syrup"
      }
    ],
    "tags": [
      "Weekend Brunch",
      "Fluffy",
      "Kid Friendly",
      "Sweet Breakfast"
    ],
    "ingredients": [
      {
        "item": "Whole Milk Ricotta Cheese (strained)",
        "amount": 250,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Pasture Eggs (separated)",
        "amount": 3,
        "unit": "large",
        "aisle": "Dairy"
      },
      {
        "item": "Whole Milk",
        "amount": 0.75,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "All-Purpose Flour",
        "amount": 150,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Baking Powder",
        "amount": 1.5,
        "unit": "tsp",
        "aisle": "Pantry"
      },
      {
        "item": "Lemon Zest",
        "amount": 1,
        "unit": "tsp",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Blueberries",
        "amount": 1.5,
        "unit": "cups",
        "aisle": "Produce"
      },
      {
        "item": "Pure Maple Syrup & Butter",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Whip the Egg Whites",
        "text": "In a clean glass bowl, whip egg whites with 1 tbsp sugar until stiff, glossy peaks form.",
        "timerMinutes": 4,
        "tip": "Whipped whites provide natural lift without heavy chemical leaveners."
      },
      {
        "step": 2,
        "title": "Mix Ricotta Batter",
        "text": "Whisk egg yolks, ricotta, milk, vanilla, and lemon zest. Fold in flour and baking powder gently.",
        "timerMinutes": 3,
        "tip": "Lemon zest brightens the rich milky ricotta."
      },
      {
        "step": 3,
        "title": "Fold Whites Gently",
        "text": "Gently fold whipped egg whites into batter in three batches using a rubber spatula. Do not deflate.",
        "timerMinutes": 2,
        "tip": "Streaks of white in the batter are completely okay."
      },
      {
        "step": 4,
        "title": "Griddle to Golden Cloud",
        "text": "Spoon 1/3 cup portions onto buttered griddle over medium-low heat. Drop blueberries on top. Flip when bubbles pop and cook 2 minutes.",
        "timerMinutes": 5,
        "tip": "Low and slow prevents burning while allowing pancake to puff tall."
      }
    ],
    "nutrition": {
      "calories": 360,
      "protein": 16,
      "carbs": 42,
      "fat": 14,
      "fiber": 3
    },
    "chefTips": [
      "Use fresh blueberries rather than frozen to prevent purple discoloration in the batter."
    ]
  },
  {
    "id": "dim-sum-crystal-shrimp-dumplings",
    "title": "Cantonese Har Gow (Crystal Shrimp Dumplings)",
    "description": "Translucent pleated dumplings stuffed with crunchy sea shrimp and bamboo shoots, steamed in bamboo baskets and served with chili crunch and sweet soy sauce.",
    "cuisine": "Chinese",
    "category": "Chinese",
    "prepTime": 40,
    "cookTime": 8,
    "servings": 4,
    "calories": 220,
    "difficulty": "Hard",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.91,
    "reviewsCount": 180,
    "author": {
      "name": "Chef Wei Zhang",
      "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      "title": "Wok Master & Sichuan Specialist"
    },
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": false,
    "seasonal": false,
    "tags": [
      "Dim Sum",
      "Dumplings",
      "Gluten-Free Wrapper",
      "Steamed"
    ],
    "ingredients": [
      {
        "item": "Raw Wild Shrimp (coarsely chopped)",
        "amount": 350,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "Wheat Starch",
        "amount": 100,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Tapioca Starch",
        "amount": 30,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Boiling Water",
        "amount": 150,
        "unit": "ml",
        "aisle": "Pantry"
      },
      {
        "item": "Bamboo Shoots (finely diced)",
        "amount": 0.25,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Toasted Sesame Oil & White Pepper",
        "amount": 1,
        "unit": "tsp",
        "aisle": "Spices"
      },
      {
        "item": "Lard or Vegetable Oil",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Prepare Shrimp Filling",
        "text": "Toss chopped shrimp with bamboo shoots, sesame oil, white pepper, and salt. Beat against bowl 20 times for bouncy texture.",
        "timerMinutes": 5,
        "tip": "Beating activates shrimp proteins for that iconic bouncy dim sum bite."
      },
      {
        "step": 2,
        "title": "Scald Dough with Boiling Water",
        "text": "Stir boiling water into starch mixture until translucent dough forms. Knead with oil until supple.",
        "timerMinutes": 6,
        "tip": "Water must be rolling boil to gelatinize the starch."
      },
      {
        "step": 3,
        "title": "Pleat and Steam",
        "text": "Roll into thin translucent discs. Pleat 7-9 times around shrimp filling. Steam over parchment for 6 minutes.",
        "timerMinutes": 6,
        "tip": "Do not over-steam or the delicate crystal skins will tear."
      }
    ],
    "nutrition": {
      "calories": 220,
      "protein": 18,
      "carbs": 26,
      "fat": 4,
      "fiber": 1
    },
    "chefTips": [
      "Rub vegetable oil onto your cleaver blade when pressing wrappers flat."
    ],
    "hasVideo": true,
    "youtubeId": "U1gg3JEW1CQ",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=U1gg3JEW1CQ",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "10:50",
    "videoChapters": [
      {
        "time": 0,
        "label": "Wheat & Tapioca Dough Kneading"
      },
      {
        "time": 210,
        "label": "Chinese Cleaver Dough Flattening"
      },
      {
        "time": 390,
        "label": "12-Pleat Har Gow Technique"
      },
      {
        "time": 520,
        "label": "High-Steam Bamboo Basket"
      }
    ]
  },
  {
    "id": "classic-italian-tiramisu",
    "title": "Traditional Venetian Tiramisù al Mascarpone",
    "description": "Delicate espresso-dipped Savoiardi ladyfingers layered with airy zabaglione mascarpone mousse, dusted with Dutch dark cocoa and Belgian chocolate shavings.",
    "cuisine": "Italian",
    "category": "Desserts",
    "prepTime": 30,
    "cookTime": 0,
    "servings": 8,
    "calories": 390,
    "difficulty": "Medium",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.99,
    "reviewsCount": 840,
    "author": {
      "name": "Chef Claire Fontaine",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      "title": "French Pastry Artisan"
    },
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": false,
    "seasonal": false,
    "tags": [
      "No Bake",
      "Coffee Infused",
      "Italian Classic",
      "Make Ahead"
    ],
    "ingredients": [
      {
        "item": "Italian Savoiardi Ladyfingers",
        "amount": 30,
        "unit": "cookies",
        "aisle": "Pantry"
      },
      {
        "item": "Galbani Mascarpone Cheese (cold)",
        "amount": 500,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Fresh Egg Yolks",
        "amount": 4,
        "unit": "large",
        "aisle": "Dairy"
      },
      {
        "item": "Granulated Sugar",
        "amount": 100,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Heavy Whipping Cream (chilled)",
        "amount": 200,
        "unit": "ml",
        "aisle": "Dairy"
      },
      {
        "item": "Freshly Brewed Strong Espresso",
        "amount": 1.5,
        "unit": "cups",
        "aisle": "Pantry"
      },
      {
        "item": "Marsala Wine or Dark Rum",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Valrhona Dutch Dark Cocoa Powder",
        "amount": 3,
        "unit": "tbsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Whip the Zabaglione Base",
        "text": "Whisk egg yolks and sugar over a gentle double boiler for 6 minutes until thick and pale ribbon forms.",
        "timerMinutes": 6,
        "tip": "Heating gently pasteurizes the eggs safely."
      },
      {
        "step": 2,
        "title": "Fold Mascarpone & Cream",
        "text": "Gently fold chilled mascarpone into cooled egg mixture. Whip heavy cream to soft peaks and fold together.",
        "timerMinutes": 4,
        "tip": "Never over-whip mascarpone or it can split into butter."
      },
      {
        "step": 3,
        "title": "Quick Dip Ladyfingers",
        "text": "Combine espresso and Marsala. Dip ladyfingers for exactly 1 second per side.",
        "timerMinutes": 3,
        "tip": "A fast dip prevents soggy ladyfingers."
      },
      {
        "step": 4,
        "title": "Layer and Chill",
        "text": "Arrange soaked biscuits in baking dish, cover with half the cream, repeat layer, and chill for at least 6 hours. Dust with cocoa before slicing.",
        "timerMinutes": 360,
        "tip": "Tastes even more celestial on day two!"
      }
    ],
    "nutrition": {
      "calories": 390,
      "protein": 7,
      "carbs": 38,
      "fat": 24,
      "fiber": 1.5
    },
    "chefTips": [
      "Dust cocoa powder just before serving so it stays dry, velvety, and matte."
    ],
    "hasVideo": true,
    "youtubeId": "80nghU2Ef2I",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=80nghU2Ef2I",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "8:35",
    "videoChapters": [
      {
        "time": 0,
        "label": "Zabaione Sabayon Whisking"
      },
      {
        "time": 150,
        "label": "Mascarpone Velvet Crema"
      },
      {
        "time": 310,
        "label": "Espresso Savoiardi Dip"
      },
      {
        "time": 440,
        "label": "Dark Cocoa Cloud Dusting"
      }
    ]
  },
  {
    "id": "crispy-baja-fish-tacos",
    "title": "Crispy Baja Fish Tacos with Chipotle Crema",
    "description": "Beer-battered fresh cod fillets fried to golden crispness, nestled in warm white corn tortillas with crunchy shredded purple cabbage, avocado, and smoky chipotle crema.",
    "cuisine": "Mexican",
    "category": "Street Food",
    "prepTime": 20,
    "cookTime": 12,
    "servings": 3,
    "calories": 410,
    "difficulty": "Medium",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.93,
    "reviewsCount": 380,
    "author": {
      "name": "Chef Anthony Bell",
      "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      "title": "Seafood & Grill Specialist"
    },
    "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": true,
    "tags": [
      "Street Tacos",
      "Crispy Fish",
      "Mexican Street Food",
      "Party Food"
    ],
    "ingredients": [
      {
        "item": "Fresh Pacific Cod or Halibut Fillets",
        "amount": 450,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "White Corn Tortillas",
        "amount": 8,
        "unit": "pieces",
        "aisle": "Pantry"
      },
      {
        "item": "Cold Mexican Lager Beer",
        "amount": 1,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "All-Purpose Flour & Cornstarch",
        "amount": 1,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Sour Cream & Mayo (equal parts)",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Chipotle Chili in Adobo Sauce",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Shredded Purple Cabbage & Cilantro",
        "amount": 2,
        "unit": "cups",
        "aisle": "Produce"
      },
      {
        "item": "Lime Wedges",
        "amount": 2,
        "unit": "whole",
        "aisle": "Produce"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Whisk Light Beer Batter",
        "text": "Whisk cold Mexican lager with flour, cornstarch, cumin, and garlic powder until smooth like pancake batter.",
        "timerMinutes": 3,
        "tip": "Ice-cold beer carbonation creates the crunchiest airy batter."
      },
      {
        "step": 2,
        "title": "Whisk Chipotle Crema",
        "text": "Blend sour cream, mayonnaise, minced chipotle in adobo, and fresh lime juice with sea salt.",
        "timerMinutes": 2,
        "tip": "Keep chilled until ready to drizzle."
      },
      {
        "step": 3,
        "title": "Fry Fish until Golden",
        "text": "Dip cod strips into batter. Deep fry in 375°F (190°C) oil for 3-4 minutes until crispy golden amber. Drain on wire rack.",
        "timerMinutes": 5,
        "tip": "Draining on a wire rack prevents soggy bottoms."
      },
      {
        "step": 4,
        "title": "Char Tortillas & Assemble",
        "text": "Char tortillas over open flame. Stack with crunchy cabbage, crispy fish strip, chipotle crema, and fresh cilantro.",
        "timerMinutes": 2,
        "tip": "Serve with plenty of lime wedges to squeeze over hot fish."
      }
    ],
    "nutrition": {
      "calories": 410,
      "protein": 26,
      "carbs": 38,
      "fat": 17,
      "fiber": 4
    },
    "chefTips": [
      "Double-fry or serve immediately so the batter never loses its deafening crunch."
    ],
    "hasVideo": true,
    "youtubeId": "llbtqYVB8nI",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=llbtqYVB8nI",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "9:25",
    "videoChapters": [
      {
        "time": 0,
        "label": "Ice-Cold Beer Batter Whisk"
      },
      {
        "time": 170,
        "label": "Golden Crisp Fish Frying"
      },
      {
        "time": 330,
        "label": "Smoky Chipotle Crema"
      },
      {
        "time": 460,
        "label": "Charred Tortilla Assembly"
      }
    ]
  },
  {
    "id": "mediterranean-chickpea-power-bowl",
    "title": "Mediterranean Spiced Chickpea & Hummus Bowl",
    "description": "Crispy Za'atar roasted chickpeas, silky homemade garlic hummus, Persian cucumbers, Kalamata olives, pickled shallots, heirloom cherry tomatoes, and tahini drizzle.",
    "cuisine": "Mediterranean",
    "category": "Healthy Meals",
    "prepTime": 15,
    "cookTime": 20,
    "servings": 2,
    "calories": 410,
    "difficulty": "Easy",
    "isVegetarian": true,
    "isVegan": true,
    "isGlutenFree": true,
    "rating": 4.88,
    "reviewsCount": 320,
    "author": {
      "name": "Dr. Elena Rostova",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      "title": "Integrative Nutritionist & Chef"
    },
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": false,
    "seasonal": false,
    "tags": [
      "Plant Based",
      "High Fiber",
      "Vegan",
      "Mediterranean Diet"
    ],
    "ingredients": [
      {
        "item": "Organic Chickpeas (rinsed & thoroughly dried)",
        "amount": 400,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Za'atar Spice Blend & Smoked Paprika",
        "amount": 1.5,
        "unit": "tbsp",
        "aisle": "Spices"
      },
      {
        "item": "Silky Hummus",
        "amount": 0.75,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Crisp Persian Cucumbers (sliced)",
        "amount": 2,
        "unit": "whole",
        "aisle": "Produce"
      },
      {
        "item": "Kalamata Olives (pitted)",
        "amount": 0.33,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Heirloom Cherry Tomatoes",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Pure Sesame Tahini",
        "amount": 3,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Fresh Mint & Dill",
        "amount": 0.25,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Warm Pita Bread",
        "amount": 2,
        "unit": "rounds",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roast Crunchy Chickpeas",
        "text": "Toss dried chickpeas with olive oil, Za'atar, and paprika. Roast at 400°F (200°C) for 20 minutes until crackly.",
        "timerMinutes": 20,
        "tip": "Drying chickpeas with a towel is the secret to ultimate crispiness."
      },
      {
        "step": 2,
        "title": "Whisk Lemon Tahini Dressing",
        "text": "Whisk tahini with lemon juice, garlic, and cold ice water until it transforms into a pale, pourable crema.",
        "timerMinutes": 2,
        "tip": "Cold water emulsifies tahini miraculously smooth."
      },
      {
        "step": 3,
        "title": "Assemble the Bowl",
        "text": "Spread a swoosh of hummus in wide bowls. Arrange crispy chickpeas, cucumbers, tomatoes, and olives. Drizzle with tahini and herbs.",
        "timerMinutes": 3,
        "tip": "Serve alongside toasted garlic pita pockets."
      }
    ],
    "nutrition": {
      "calories": 410,
      "protein": 18,
      "carbs": 52,
      "fat": 16,
      "fiber": 14
    },
    "chefTips": [
      "Great for meal prep; keep roasted chickpeas separate so they stay crunchy."
    ],
    "hasVideo": true,
    "youtubeId": "_Fjsg-Z2t6E",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=_Fjsg-Z2t6E",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "7:45",
    "videoChapters": [
      {
        "time": 0,
        "label": "Crispy Zaatar Chickpea Roast"
      },
      {
        "time": 140,
        "label": "Silky Garlic Hummus Swirl"
      },
      {
        "time": 280,
        "label": "Cucumber Sumac Ribbon Salad"
      },
      {
        "time": 380,
        "label": "Lemon Herb Tahini Drizzle"
      }
    ]
  },
  {
    "id": "creamy-tomato-basil-penne",
    "title": "15-Minute Creamy Sun-Dried Tomato & Basil Penne",
    "description": "Al dente penne pasta tossed in a luscious blush sauce of sweet San Marzano tomatoes, garlic, sun-dried tomato pesto, fresh sweet Genovese basil, and grated pecorino.",
    "cuisine": "Italian",
    "category": "Quick Recipes",
    "prepTime": 5,
    "cookTime": 12,
    "servings": 3,
    "calories": 460,
    "difficulty": "Easy",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.9,
    "reviewsCount": 275,
    "author": {
      "name": "Chef Marco Valenti",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "title": "Trastevere Roman Chef"
    },
    "image": "https://images.unsplash.com/photo-1621996346565-e3d5d6281729?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": false,
    "tags": [
      "Under 20 Mins",
      "Vegetarian",
      "Pasta Night",
      "Family Friendly"
    ],
    "ingredients": [
      {
        "item": "Penne Rigate Pasta",
        "amount": 350,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Extra Virgin Olive Oil",
        "amount": 2,
        "unit": "tbsp",
        "aisle": "Pantry"
      },
      {
        "item": "Garlic (finely sliced)",
        "amount": 4,
        "unit": "cloves",
        "aisle": "Produce"
      },
      {
        "item": "Sun-Dried Tomatoes in Olive Oil (sliced)",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Passata (crushed tomato puree)",
        "amount": 400,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Heavy Cream or Mascarpone",
        "amount": 0.33,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Fresh Genovese Basil Leaves",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Parmigiano Reggiano",
        "amount": 50,
        "unit": "g",
        "aisle": "Dairy"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Boil Penne",
        "text": "Boil penne in generously salted water until 1 minute before al dente. Reserve half cup pasta water.",
        "timerMinutes": 9,
        "tip": "Penne rigate ridges capture creamy sauce gorgeously."
      },
      {
        "step": 2,
        "title": "Simmer Tomato Blush Sauce",
        "text": "Sauté garlic and sliced sun-dried tomatoes in oil for 2 minutes. Pour in passata and simmer 5 minutes, then stir in cream.",
        "timerMinutes": 7,
        "tip": "Sun-dried tomatoes add intense umami sweetness."
      },
      {
        "step": 3,
        "title": "Toss with Basil & Cheese",
        "text": "Toss drained pasta and splash of water into sauce. Remove from heat, fold in torn fresh basil and grated Parmigiano.",
        "timerMinutes": 2,
        "tip": "Tear basil with your fingers to avoid bruising the herb."
      }
    ],
    "nutrition": {
      "calories": 460,
      "protein": 15,
      "carbs": 64,
      "fat": 16,
      "fiber": 5
    },
    "chefTips": [
      "Substitute coconut cream for a naturally vegan blush sauce."
    ],
    "hasVideo": true,
    "youtubeId": "ePdy2YSxfS0",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=ePdy2YSxfS0",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "6:50",
    "videoChapters": [
      {
        "time": 0,
        "label": "Aromatic Garlic & Shallot Sauté"
      },
      {
        "time": 110,
        "label": "Sun-Dried Tomato Puree & Cream"
      },
      {
        "time": 240,
        "label": "Al Dente Penne Mantecatura"
      },
      {
        "time": 340,
        "label": "Torn Sweet Basil & Parmigiano"
      }
    ]
  },
  {
    "id": "hyderabadi-dum-biryani",
    "title": "Royal Hyderabadi Dum Mutton Biryani",
    "description": "Layers of fragrant long-grain aged basmati rice and succulent mutton marinated in yogurt and spices, sealed with dough and slow-cooked over low embers with mint and brown onions.",
    "cuisine": "Indian",
    "category": "Indian",
    "prepTime": 40,
    "cookTime": 50,
    "servings": 6,
    "calories": 680,
    "difficulty": "Hard",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.98,
    "reviewsCount": 780,
    "author": {
      "name": "Chef Sanjeev Mehra",
      "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      "title": "Awadhi Royal Cuisine Specialist"
    },
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": true,
    "seasonal": false,
    "tags": [
      "Royal Feast",
      "Biryani Special",
      "Slow Cooked Dum",
      "Aromatic"
    ],
    "ingredients": [
      {
        "item": "Tender Mutton or Lamb Pieces",
        "amount": 800,
        "unit": "g",
        "aisle": "Meat"
      },
      {
        "item": "Aged Basmati Rice (soaked for 30m)",
        "amount": 500,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Biryani Onions (Birista / crispy fried)",
        "amount": 1.5,
        "unit": "cups",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Mint & Coriander (chopped)",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Whisked Yogurt",
        "amount": 1,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Ginger-Garlic Paste",
        "amount": 2.5,
        "unit": "tbsp",
        "aisle": "Produce"
      },
      {
        "item": "Desi Ghee",
        "amount": 4,
        "unit": "tbsp",
        "aisle": "Dairy"
      },
      {
        "item": "Whole Spices (star anise, mace, shahi jeera)",
        "amount": 1,
        "unit": "tbsp",
        "aisle": "Spices"
      },
      {
        "item": "Saffron dissolved in warm rose milk",
        "amount": 0.25,
        "unit": "cup",
        "aisle": "Spices"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Marinate the Meat",
        "text": "Marinate meat overnight with yogurt, ginger-garlic paste, half fried onions, mint, raw papaya paste, and biryani spices.",
        "timerMinutes": 60,
        "tip": "Raw papaya acts as an all-natural tenderizer."
      },
      {
        "step": 2,
        "title": "Par-Boil the Rice (70%)",
        "text": "Boil water with whole spices and salt. Cook basmati rice until 70% done (firm core). Drain quickly.",
        "timerMinutes": 6,
        "tip": "Rice finishes cooking in the dum steam."
      },
      {
        "step": 3,
        "title": "Dum Layering",
        "text": "Layer marinated meat in a heavy copper bottom pot. Spread aromatic rice on top. Garnish with saffron milk, ghee, mint, and fried onions.",
        "timerMinutes": 5,
        "tip": "Drizzle ghee generously for glossy grains."
      },
      {
        "step": 4,
        "title": "Seal and Slow Cook (Dum)",
        "text": "Seal lid with wheat flour dough. Cook 15 mins on high, then 35 mins on very low flame over a tawa.",
        "timerMinutes": 50,
        "tip": "The steam trap preserves every drop of aroma."
      }
    ],
    "nutrition": {
      "calories": 680,
      "protein": 48,
      "carbs": 62,
      "fat": 28,
      "fiber": 4
    },
    "chefTips": [
      "Always let the biryani rest for 10 minutes after turning off the heat before breaking the seal."
    ],
    "hasVideo": true,
    "youtubeId": "d4LZnYlP_0M",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=d4LZnYlP_0M",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "14:30",
    "videoChapters": [
      {
        "time": 0,
        "label": "Kacchi Yakhni Marinade"
      },
      {
        "time": 240,
        "label": "70% Fragrant Rice Parboil"
      },
      {
        "time": 460,
        "label": "Saffron Milk & Barista Layering"
      },
      {
        "time": 680,
        "label": "Atta Dough Seal & Slow Dum"
      }
    ]
  },
  {
    "id": "creamy-tuscan-salmon",
    "title": "Creamy Tuscan Garlic Butter Salmon",
    "description": "Pan-seared crisp skin Atlantic salmon fillet swimming in a velvety garlic parmesan cream with sweet sun-dried tomatoes and baby spinach.",
    "cuisine": "Italian",
    "category": "Healthy Meals",
    "prepTime": 10,
    "cookTime": 15,
    "servings": 2,
    "calories": 480,
    "difficulty": "Easy",
    "isVegetarian": false,
    "isVegan": false,
    "isGlutenFree": true,
    "rating": 4.95,
    "reviewsCount": 388,
    "author": {
      "name": "Chef Elena Rostova",
      "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      "title": "Piedmont Gastronomy Fellow"
    },
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "trending": true,
    "seasonal": true,
    "hasVideo": true,
    "youtubeId": "ZQnI9IT476Y",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=ZQnI9IT476Y",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "8:10",
    "videoChapters": [
      {
        "time": 0,
        "label": "Salmon Skin Crisping"
      },
      {
        "time": 195,
        "label": "Garlic & Tomato Reduction"
      },
      {
        "time": 330,
        "label": "Parmesan Cream & Spinach"
      },
      {
        "time": 440,
        "label": "Nestle Salmon & Serve"
      }
    ],
    "tags": [
      "25-Minute Dinner",
      "Keto",
      "High Protein",
      "Gluten-Free"
    ],
    "ingredients": [
      {
        "item": "Fresh Atlantic Salmon Fillets",
        "amount": 2,
        "unit": "fillets (200g each)",
        "aisle": "Meat"
      },
      {
        "item": "Sun-Dried Tomatoes in Oil",
        "amount": 0.5,
        "unit": "cup",
        "aisle": "Pantry"
      },
      {
        "item": "Fresh Baby Spinach",
        "amount": 3,
        "unit": "cups",
        "aisle": "Produce"
      },
      {
        "item": "Minced Garlic",
        "amount": 5,
        "unit": "cloves",
        "aisle": "Produce"
      },
      {
        "item": "Heavy Cream",
        "amount": 0.75,
        "unit": "cup",
        "aisle": "Dairy"
      },
      {
        "item": "Parmigiano Reggiano (grated)",
        "amount": 50,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "White Wine or Veg Broth",
        "amount": 0.25,
        "unit": "cup",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Sear the Salmon",
        "text": "Sear seasoned salmon in olive oil for 5 minutes skin-side down until golden. Flip and cook 3 minutes. Set aside.",
        "timerMinutes": 8,
        "tip": "Get pan smoking hot before adding fish."
      },
      {
        "step": 2,
        "title": "Sauté Aromatics",
        "text": "In the same pan, cook garlic and sun-dried tomatoes for 1 minute until fragrant.",
        "timerMinutes": 1,
        "tip": "Use the oil from the sun-dried tomato jar for extra flavor."
      },
      {
        "step": 3,
        "title": "Simmer Cream & Greens",
        "text": "Deglaze with white wine, pour in heavy cream and Parmigiano. Add spinach and simmer until wilted.",
        "timerMinutes": 5,
        "tip": "Lower heat to avoid breaking the cream sauce."
      },
      {
        "step": 4,
        "title": "Nestle Salmon Back",
        "text": "Nestle salmon back into simmering sauce, spooning cream over fillets before serving with lemon wedges.",
        "timerMinutes": 2,
        "tip": "Serve hot immediately."
      }
    ],
    "nutrition": {
      "calories": 480,
      "protein": 42,
      "carbs": 8,
      "fat": 31,
      "fiber": 2
    },
    "chefTips": [
      "Pair with crusty sourdough or cauliflower mash for low-carb bliss."
    ]
  },
  {
    "id": "pan-seared-gnocchi",
    "title": "Pan-Seared Potato Gnocchi with Sage Butter",
    "description": "Golden crisp potato gnocchi sautéed in foaming browned butter with crispy whole sage leaves, toasted hazelnuts, and grated aged pecorino.",
    "cuisine": "Italian",
    "category": "Quick Recipes",
    "prepTime": 5,
    "cookTime": 15,
    "servings": 2,
    "calories": 410,
    "difficulty": "Easy",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.88,
    "reviewsCount": 245,
    "author": {
      "name": "Chef Marco Valenti",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      "title": "Trastevere Roman Chef"
    },
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": false,
    "hasVideo": true,
    "youtubeId": "5kUo1dCzHOI",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=5kUo1dCzHOI",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "6:20",
    "videoChapters": [
      {
        "time": 0,
        "label": "Direct Pan-Sear Gnocchi"
      },
      {
        "time": 165,
        "label": "Brown Butter & Crispy Sage"
      },
      {
        "time": 290,
        "label": "Hazelnuts & Pecorino Toss"
      }
    ],
    "tags": [
      "20-Minute",
      "Vegetarian",
      "Brown Butter",
      "Comfort Food"
    ],
    "ingredients": [
      {
        "item": "Fresh Potato Gnocchi",
        "amount": 400,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "European Unsalted Butter",
        "amount": 60,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Fresh Sage Leaves",
        "amount": 16,
        "unit": "leaves",
        "aisle": "Produce"
      },
      {
        "item": "Toasted Hazelnuts (coarsely chopped)",
        "amount": 30,
        "unit": "g",
        "aisle": "Pantry"
      },
      {
        "item": "Pecorino Romano (grated)",
        "amount": 40,
        "unit": "g",
        "aisle": "Dairy"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Pan-Sear Gnocchi Dry",
        "text": "Add gnocchi straight to a hot buttered skillet without boiling first. Cook for 8 minutes until exterior is blistered and crisp.",
        "timerMinutes": 8,
        "tip": "Never boil store-bought gnocchi; pan-searing keeps the inside fluffy and outside crunchy!"
      },
      {
        "step": 2,
        "title": "Brown the Butter & Sage",
        "text": "Push gnocchi to the side. Melt butter and drop in sage leaves. Swirl until butter foams nutty brown and sage turns shatteringly crisp.",
        "timerMinutes": 4,
        "tip": "Watch closely; browned butter turns burned butter quickly."
      },
      {
        "step": 3,
        "title": "Toss with Hazelnuts & Pecorino",
        "text": "Toss gnocchi through the brown butter, hazelnuts, and grated cheese. Dish out onto warm plates.",
        "timerMinutes": 2,
        "tip": "Squeeze a few drops of lemon juice to balance the rich butter."
      }
    ],
    "nutrition": {
      "calories": 410,
      "protein": 12,
      "carbs": 54,
      "fat": 18,
      "fiber": 3
    },
    "chefTips": [
      "Pan-searing gnocchi without pre-boiling is a revelation in home cooking."
    ]
  },
  {
    "id": "beetroot-goat-cheese-galette",
    "title": "Roasted Beetroot & Goat Cheese Galette",
    "description": "Rustic French free-form butter galette filled with ruby roasted beetroot discs, creamy chèvre crumble, caramelized onions, and a honeyed thyme drizzle.",
    "cuisine": "French",
    "category": "Healthy Meals",
    "prepTime": 20,
    "cookTime": 25,
    "servings": 4,
    "calories": 360,
    "difficulty": "Medium",
    "isVegetarian": true,
    "isVegan": false,
    "isGlutenFree": false,
    "rating": 4.91,
    "reviewsCount": 195,
    "author": {
      "name": "Chef Claire Fontaine",
      "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      "title": "French Pastry Artisan"
    },
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "trending": true,
    "seasonal": true,
    "hasVideo": true,
    "youtubeId": "rSu43d_0pJQ",
    "youtubeWatchUrl": "https://www.youtube.com/watch?v=rSu43d_0pJQ",
    "videoUrl": "videos/cooking-demo.mp4",
    "videoDuration": "11:05",
    "videoChapters": [
      {
        "time": 0,
        "label": "Rolling Flaky Pastry"
      },
      {
        "time": 200,
        "label": "Caramelized Onion Layer"
      },
      {
        "time": 370,
        "label": "Beetroot Discs & Chèvre"
      },
      {
        "time": 570,
        "label": "Rustic Pleat & Oven Bake"
      }
    ],
    "tags": [
      "Patisserie",
      "Vegetarian",
      "Autumn Feast",
      "French Rustic"
    ],
    "ingredients": [
      {
        "item": "All-Butter Puff Pastry or Shortcrust Sheet",
        "amount": 1,
        "unit": "sheet",
        "aisle": "Dairy"
      },
      {
        "item": "Roasted Beetroots (peeled & thinly sliced)",
        "amount": 3,
        "unit": "medium",
        "aisle": "Produce"
      },
      {
        "item": "Creamy French Goat Cheese (Chèvre)",
        "amount": 150,
        "unit": "g",
        "aisle": "Dairy"
      },
      {
        "item": "Caramelized Yellow Onions",
        "amount": 1,
        "unit": "cup",
        "aisle": "Produce"
      },
      {
        "item": "Fresh Thyme Sprigs",
        "amount": 4,
        "unit": "sprigs",
        "aisle": "Produce"
      },
      {
        "item": "Wildflower Honey",
        "amount": 1.5,
        "unit": "tbsp",
        "aisle": "Pantry"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "title": "Roll Pastry",
        "text": "Roll pastry sheet onto parchment paper into a 12-inch circle.",
        "timerMinutes": 3,
        "tip": "Keep pastry chilled until ready to shape."
      },
      {
        "step": 2,
        "title": "Spread Onions & Beets",
        "text": "Spread caramelized onions leaving a 2-inch border. Overlap sliced beetroots in concentric circles. Crumble goat cheese over top.",
        "timerMinutes": 5,
        "tip": "Season beets with sea salt and cracked pepper."
      },
      {
        "step": 3,
        "title": "Pleat and Bake",
        "text": "Fold pastry border over filling, pleating gently. Brush crust with egg wash. Bake at 400°F (200°C) for 25 minutes until golden.",
        "timerMinutes": 25,
        "tip": "Bake on a preheated baking sheet for a crisp bottom."
      },
      {
        "step": 4,
        "title": "Drizzle Honey & Thyme",
        "text": "Remove from oven, drizzle with wildflower honey and scatter fresh thyme. Serve warm or at room temperature.",
        "timerMinutes": 2,
        "tip": "Wonderful with a crisp green arugula salad."
      }
    ],
    "nutrition": {
      "calories": 360,
      "protein": 11,
      "carbs": 38,
      "fat": 19,
      "fiber": 4
    },
    "chefTips": [
      "Can also be made with roasted butternut squash in the winter."
    ]
  }
];

const CATEGORIES_DATA = [
  {
    "id": "Indian",
    "name": "Indian Cuisine",
    "count": 4,
    "description": "Rich curries, royal biryanis, aromatic gravies, and tandoori classics infused with authentic spices.",
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80",
    "badge": "Aromatic & Rich"
  },
  {
    "id": "Italian",
    "name": "Italian Delicacies",
    "count": 4,
    "description": "Handcrafted pasta, wood-fired pizzas, creamy risottos, and indulgent Venetian desserts.",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    "badge": "Authentic & Rustic"
  },
  {
    "id": "Chinese",
    "name": "Chinese Wok & Dim Sum",
    "count": 3,
    "description": "Sizzling Sichuan stir-fries, crystal dim sum, fiery chilis, and savory noodles.",
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    "badge": "Wok Hei Flavour"
  },
  {
    "id": "Desserts",
    "name": "Artisan Desserts",
    "count": 3,
    "description": "Lava cakes, traditional tiramisu, fruit tarts, and gourmet sweet treats.",
    "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    "badge": "Sweet Perfection"
  },
  {
    "id": "Breakfast",
    "name": "Morning & Brunch",
    "count": 3,
    "description": "Golden avocado toasts, fluffy pancakes, smoothie bowls, and poached eggs.",
    "image": "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
    "badge": "Fresh Start"
  },
  {
    "id": "Healthy Meals",
    "name": "Healthy & Clean Eating",
    "count": 3,
    "description": "Nutrient-packed grain bowls, wild salmon, fiber-rich salads, and clean dinners.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    "badge": "Nourish & Glow"
  },
  {
    "id": "Street Food",
    "name": "Global Street Food",
    "count": 3,
    "description": "Mumbai chaat, Baja fish tacos, crispy bites, and market-stall favorites.",
    "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    "badge": "Bold & Vibrant"
  },
  {
    "id": "Quick Recipes",
    "name": "Quick & Under 20 Mins",
    "count": 3,
    "description": "Lightning-fast gourmet dinners, 15-minute scampi, quick pasta, and simple wonders.",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    "badge": "Fast & Delicious"
  }
];
