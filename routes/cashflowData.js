
const router = require('express').Router()

module.exports = (db, Data) => {

  router.get("/", (req, res) => {
      Data.find((err, data) => {
        if (err)
          res.send(err);

      let newData = { "data": []}

      data.forEach((element, index, array) => {
        let dataItem = {
          DT_RowId: element['_id'],
          date: element['date'],
          amount: `${element['amount']}`,
          category: element['category'],
          note: element['note']
          }
        newData["data"].push(dataItem)
      })

      res.json(newData);
    });
  });

  router.post("/", (req, res) => {
    let amount = req.body.amount
    let note = req.body.note
    let category = req.body.category

    category.forEach((index) => {
      if ( index != '' ) {
        category = index
      }
    })

    let data = new Data
    data.date = `${(new Date()).getFullYear()}/${(new Date()).getMonth()+1}/${(new Date()).getDate()}`
    data.amount = amount
    data.note = note
    data.category = category

    data.save((err) => {
      if (err)
        res.send(err);

        res.redirect('back');
    });
  })

  router.post("/delete/:id", (req, res) => {
    let id = req.params.id
    db.datas.remove({ _id: id })
  })

  return router

}
