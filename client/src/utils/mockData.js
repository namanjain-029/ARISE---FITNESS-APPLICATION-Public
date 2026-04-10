// Mock data matching the openapi.yaml schemas

export const mockUser = {
    id: "usr-12345",
    name: "Naman",
    email: "naman@gmail.com",
    age: 28,
    weight: 75.5,
    height: 180,
    goal: "gain",
    createdAt: "2023-01-15T08:00:00Z",
    updatedAt: "2023-10-20T10:30:00Z"
};

export const mockWorkouts = [
    {
        id: "w-1",
        userId: "usr-12345",
        type: "running",
        duration: 45,
        caloriesBurned: 420.5,
        date: new Date().toISOString().split('T')[0],
        notes: "Felt great, pushed the pace on the last mile.",
        createdAt: new Date().toISOString()
    },
    {
        id: "w-2",
        userId: "usr-12345",
        type: "gym",
        duration: 60,
        caloriesBurned: 350,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        notes: "Upper body day",
        createdAt: new Date(Date.now() - 86400000).toISOString()
    }
];

export const mockMeals = [
    {
        id: "m-1",
        userId: "usr-12345",
        foodName: "Oatmeal with Berries",
        calories: 320,
        protein: 10,
        carbs: 55,
        fats: 6,
        mealType: "breakfast",
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    },
    {
        id: "m-2",
        userId: "usr-12345",
        foodName: "Grilled Chicken Salad",
        calories: 450,
        protein: 40,
        carbs: 20,
        fats: 15,
        mealType: "lunch",
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    }
];

export const mockWaterLogs = [
    {
        id: "wl-1",
        userId: "usr-12345",
        amountMl: 500,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    },
    {
        id: "wl-2",
        userId: "usr-12345",
        amountMl: 750,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    }
];

export const mockGoals = [
    {
        id: "g-1",
        userId: "usr-12345",
        goalType: "water_intake",
        targetValue: 3000,
        currentValue: 1250,
        deadline: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: "g-2",
        userId: "usr-12345",
        goalType: "workout_days",
        targetValue: 4,
        currentValue: 2,
        deadline: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const mockSummary = {
    date: new Date().toISOString().split('T')[0],
    caloriesConsumed: 2150,
    caloriesBurned: 640,
    netCalories: 1510,
    waterMl: 1250,
    workoutsToday: 1,
    streak: 5
};

export const mockTrends = {
    period: "weekly",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    caloriesConsumed: [2100, 2250, 2000, 2400, 2150, 2600, 2300],
    caloriesBurned: [450, 0, 600, 400, 0, 800, 500],
    waterMl: [2500, 2000, 3000, 2800, 2200, 3200, 2500],
    workouts: [1, 0, 1, 1, 0, 1, 1]
};
