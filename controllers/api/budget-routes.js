const router = require('express').Router();
const { Budget, User, BudgetCategory } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all budgets
router.get('/', async (req, res) => {
    try {
      const budgetData = await Budget.findAll({
        include: [{ model: User }, { model: BudgetCategory }],
      });
      res.status(200).json(budgetData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Added a route to get data to diaply budget goals for a user
router.get('/goals', withAuth, async (req, res) => {
  
  try {

    //Get current budgets goals for the user

      const budgetData = await Budget.findAll({ where: { user_id: req.session.user_id },
        attributes:['category_id','amount','date_created'] 
      });
  
  
       //Get the User Data
       const userData = await User.findByPk(req.session.user_id, {
        attributes:  ['name'] 
      });
      const user = userData.get({plain:true})
  

      // Get Budget cateories
      const nameData = await BudgetCategory.findAll({
        attributes: ['category'],
      });
      const names = nameData.map((name) => name.get({ plain: true }));
    
      const budgets = budgetData.map((budget) => budget.get({ plain: true }));
     
      //add category_name to the data send to goals.handlebar for displaying
      budgets.forEach((budget) => {
        budget.category_name = names[budget.category_id - 1].category;
      });
      
      //call the goals.handlebar to display
      res.render('goals', {
        budgets, user,
        logged_in: true,
      });

  } catch (err) {
    res.status(500).json(err);
  }

});

// Get a single budget
router.get('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const budgetData = await Budget.findByPk(req.params.id, {
      include: [{ model: User }, { model: BudgetCategory }],
    });

    if (!budgetData) {
      res.status(404).json({ message: 'No budget found with that id!' });
      return;
    }
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Create a budget
router.post('/', withAuth, async (req, res) => {
  try {
    const budgetData = await Budget.create({
        amount: req.body.amount,
        category_id: req.body.category,
        user_id: req.session.user_id
    });

    if(!budgetData){
      res.status(404).json({ message: 'New budget goal creation failed' });
      return;
    }


    res.status(200).json(budgetData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a budget
router.put('/:id', withAuth, async (req, res) => {
    try {
      const budgetData = await Budget.update({amount: req.body.amount}, {
        where: {
          category_id: req.params.id,
          user_id: req.session.user_id
        },
        individualHooks: true
      });
      if (!budgetData[0]) {
        res.status(404).json({ message: 'No budget with this category and user!' });
        return;
      }
      res.status(200).json(budgetData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Delete a budget
router.delete('/:id', withAuth, async (req, res) => {
  try {
   
    const budgetData = await Budget.destroy({
      where: {
        amount: req.body.amount,
        category_id: req.params.id,
        user_id: req.session.user_id
      },
    });
    if (!budgetData) {
      res.status(404).json({ message: 'No budget with this category and user!' });
      return;
    }
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
