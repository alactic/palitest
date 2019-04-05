const axios = require('axios')
const mealList = [];
exports.PostMeal = function (req, res) {
    req.body['ids'].forEach(async (id) => {
        try {
            const meal = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (meal) {
                mealList.push(meal['data'])
                if(mealList.length === 3 ) {
                    let minidMeal = 0;
                    const mealsWithIngredents = [];
                    mealList.forEach(val => {
                        let ingredents = [];
                        val['meals'].forEach(value => {
                            idMeal = value['idMeal'];
                            for(const name in value) {
                                if(name.match(/strIngredient/gi)){
                                    if(value[name] && value[name] !== '') {
                                        ingredents.push(value[name]);
                                    }
                                }
                            }
                        });
                        mealsWithIngredents.push({id: idMeal, ingredents:ingredents.length });
                        let count = Number.POSITIVE_INFINITY;
                        mealsWithIngredents.forEach(ingredent => {
                            const ingredientCount = ingredent['ingredents'];
                            if (ingredientCount < count) {
                                count = ingredientCount;
                                minidMeal = ingredent['id'];
                            }
                        });
                        ingredents = [];
                    })
                    res.status(200).json({id: minidMeal});
                }
            }
        } catch (e) {
            res.status(400).send(e)
        }
    });
};

