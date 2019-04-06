const axios = require('axios')
exports.PostMeal = (req, res) => {
    const mealList = [];
    req.body['ids'].forEach(async (id) => {
        try {
            const meal = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (meal) {
                mealList.push(meal['data'])
                if(mealList.length === req.body['ids']['length'] ) {
                    const mealsWithIngredents = [];
                    mealList.forEach(val => {
                        let ingredents = [];
                        let idMeal = 0;
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
                        mealsWithIngredents.push({idMeal, ingredents});
                    });
                    const minIngredients = mealsWithIngredents.reduce((x, y) => (x['ingredents']['length'] > y['ingredents']['length'])? y : x);
                    res.status(200).json({id: minIngredients['idMeal']});
                }
            }
        } catch (e) {
            res.status(400).send(e)
        }
    });
};

