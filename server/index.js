const express = require('express');
const cors = require('cors')
const app = express();

const mysql = require('mysql');

app.use(cors())
app.use(express.json())

// create connection
const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'inwentaryzatoramw'
})



// get data from table miejsca
app.get('/dane_miejsca', (req,res)=>{
    db.query("SELECT * FROM miejsca", (err, result)=> {
        if(err)
            console.error(err)
        else
            res.send(result)
    });
})


app.post('/dane_miejsca/create', (req,res) => {
    db.query(`INSERT INTO miejsca (nr_miejsca) VALUES (${req.body.nr_miejsca})`, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting row miejsca');
        } else {
          res.send('Row miejsca inserted successfully');
        }
      });
});

// delete data from table laboranci
app.delete('/dane_miejsca/delete/:id', (req,res)=>{
    const id = req.params.id;
    const sql = `DELETE FROM miejsca WHERE id = ${id}`;
    db.query(sql, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting row miejsca');
      } else {
        res.send('Row miejsca deleted successfully');
      }
    });
});
    




// get data from table rodzaje
app.get('/dane_rodzaje', (req,res)=>{
    db.query("SELECT * FROM rodzaje", (err, result)=> {
        if(err)
            console.error(err)
        else
            res.send(result)
    });
})

app.post('/dane_rodzaje/create', (req,res) => {
    db.query(`INSERT INTO rodzaje (rodzaj) VALUES (${req.body.rodzaj})`, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting row rodzaje');
        } else {
          res.send('Row rodzaje inserted successfully');
        }
      });
});

// delete data from table laboranci
app.delete('/dane_rodzaje/delete/:id', (req,res)=>{
    const id = req.params.id;
    const sql = `DELETE FROM rodzaje WHERE id = ${id}`;
    db.query(sql, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting row rodzaje');
      } else {
        res.send('Row rodzaje deleted successfully');
      }
    });
})





// get data from table uzytkownicy
app.get('/dane_uzytkownicy', (req,res)=>{
    db.query("SELECT * FROM uzytkownicy", (err, result)=> {
        if(err)
            console.error(err)
        else
            res.send(result)
    });
})

app.post('/dane_uzytkownicy/create', (req,res) => {
    db.query(`INSERT INTO uzytkownicy (imie, nazwisko) VALUES (${req.body.imie},${req.body.nazwisko} )`, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting row uzytkownicy');
        } else {
          res.send('Row uzytkownicy inserted successfully');
        }
      });
});

// delete data from table laboranci
app.delete('/dane_uzytkownicy/delete/:id', (req,res)=>{
    const id = req.params.id;
    const sql = `DELETE FROM uzytkownicy WHERE id = ${id}`;
    db.query(sql, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting row uzytkownicy');
      } else {
        res.send('Row uzytkownicy deleted successfully');
      }
    });
})





// get data from table laboranci
app.get('/dane_laboranci', (req,res)=>{
    db.query("SELECT * FROM laboranci", (err, result)=> {
        if(err)
            console.error(err)
        else
            res.send(result)
    });
});

// insert data into table laboranci
app.post('/dane_laboranci/create', (req,res) => {
    db.query(`INSERT INTO laboranci (nr_laboranta) VALUES (${req.body.nr_laboranta})`, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting row laboranci');
        } else {
          res.send('Row laboranci inserted successfully');
        }
      });
});

// delete data from table laboranci
app.delete('/dane_laboranci/delete/:id', (req,res)=>{
    const id = req.params.id;
    const sql = `DELETE FROM laboranci WHERE id = ${id}`;
    db.query(sql, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting row laboranci');
      } else {
        res.send('Row laboranci deleted successfully');
      }
    });
})





// get data from table rekordy
app.get('/dane_rekordy/data', (req, res)=>{
    let query = 'SELECT re.* FROM rekordy AS re '+
				'LEFT JOIN laboranci AS l on l.id = re.laborant_id '+
				'LEFT JOIN miejsca AS m on m.id = re.miejsce_id '+
				'LEFT JOIN rodzaje AS r on r.id = re.rodzaj_id '+
				'LEFT JOIN uzytkownicy AS u on u.id = re.uzytkownik_id ' ;

	// let query = 'SELECT re.* FROM rekordy AS re '
    let conditions = [];

	// add conditions which are filled
    if(req.query.laborant_id) conditions.push(`re.laborant_id = ${req.query.laborant_id} `);
    if(req.query.ilosc) conditions.push(`re.ilosc = ${req.query.ilosc}`);
    if(req.query.miejsce_id) conditions.push(`re.miejsce_id = ${req.query.miejsce_id}`);
    if(req.query.nazwa) conditions.push(`re.nazwa LIKE '%${req.query.nazwa}%'`);
    if(req.query.nr_inwentarzowy) conditions.push(`re.nr_inwentarzowy = ${req.query.nr_inwentarzowy}`);
    if(req.query.uzytkownik_id) conditions.push(`re.uzytkownik_id = ${req.query.uzytkownik_id}`);
    if(req.query.rodzaj_id) conditions.push(`re.rodzaj_id = ${req.query.rodzaj_id}`);
    if(req.query.typ) conditions.push(`re.typ = ${req.query.typ}`);
    if(req.query.wybrakowanie) conditions.push(`re.wybrakowanie = ${req.query.wybrakowanie}`);

	// if there are conditions add them, else don't
    if(conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

	// set order of displaying
	if(req.query.order){
        switch(req.query.orderAsc){
          	case 'true':
				query += ` ORDER BY ${req.query.order} ASC`
          	break;

          	case 'false':
				query += ` ORDER BY ${req.query.order} DESC`
          	break;

          	default:
          	break;
        }
    }

    // add limit to the query
	query += ` LIMIT ${req.query.page*30} OFFSET ${(req.query.page-1)*30}`;

    // return query response from database
    db.query(query , (err, result)=> {
        if(err)
			console.error(err)
        else{
            res.send(result)
		}
    });
})




app.get('/dane_rekordy/print_table', (req, res)=>{
    let query = 'SELECT re.id, l.nr_laboranta, re.ilosc, m.nr_miejsca, re.nazwa, re.nr_inwentarzowy, u.imie, u.nazwisko, r.rodzaj, re.typ, re.wybrakowanie '+
				'FROM rekordy AS re '+
				'LEFT JOIN laboranci AS l on l.id = re.laborant_id '+
				'LEFT JOIN miejsca AS m on m.id = re.miejsce_id '+
				'LEFT JOIN rodzaje AS r on r.id = re.rodzaj_id '+
				'LEFT JOIN uzytkownicy AS u on u.id = re.uzytkownik_id ' ;

	// let query = 'SELECT re.* FROM rekordy AS re '
    let conditions = [];

	// add conditions which are filled
    if(req.query.laborant_id) conditions.push(`re.laborant_id = ${req.query.laborant_id} `);
    if(req.query.ilosc) conditions.push(`re.ilosc = ${req.query.ilosc}`);
    if(req.query.miejsce_id) conditions.push(`re.miejsce_id = ${req.query.miejsce_id}`);
    if(req.query.nazwa) conditions.push(`re.nazwa LIKE '%${req.query.nazwa}%'`);
    if(req.query.nr_inwentarzowy) conditions.push(`re.nr_inwentarzowy = ${req.query.nr_inwentarzowy}`);
    if(req.query.uzytkownik_id) conditions.push(`re.uzytkownik_id = ${req.query.uzytkownik_id}`);
    if(req.query.rodzaj_id) conditions.push(`re.rodzaj_id = ${req.query.rodzaj_id}`);
    if(req.query.typ) conditions.push(`re.typ = ${req.query.typ}`);
    if(req.query.wybrakowanie) conditions.push(`re.wybrakowanie = ${req.query.wybrakowanie}`);

	// if there are conditions add them, else don't
    if(conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

	// set order of displaying
	if(req.query.order){
        switch(req.query.orderAsc){
          	case 'true':
				query += ` ORDER BY ${req.query.order} ASC`
          	break;

          	case 'false':
				query += ` ORDER BY ${req.query.order} DESC`
          	break;

          	default:
          	break;
        }
    }

    // add limit to the query
	query += ` LIMIT ${req.query.page*30} OFFSET ${(req.query.page-1)*30}`;

    // return query response from database
    db.query(query , (err, result)=> {
        if(err)
			console.error(err)
        else{
            res.send(result)
		}
    });
})



// return count of rows in rekordy
app.get('/dane_rekordy/count_rekordy', (req,res)=>{
    let query = `SELECT COUNT(*) as countRekordy FROM rekordy`;

    let conditions = [];

    // add conditions which are filled
    if(req.query.laborant_id) conditions.push(`laborant_id = ${req.query.laborant_id} `);
    if(req.query.ilosc) conditions.push(`ilosc = ${req.query.ilosc}`);
    if(req.query.miejsce_id) conditions.push(`miejsce_id = ${req.query.miejsce_id}`);
    if(req.query.nazwa) conditions.push(`nazwa LIKE '%${req.query.nazwa}%'`);
    if(req.query.nr_inwentarzowy) conditions.push(`nr_inwentarzowy = ${req.query.nr_inwentarzowy}`);
    if(req.query.uzytkownik_id) conditions.push(`uzytkownik_id = ${req.query.uzytkownik_id}`);
    if(req.query.rodzaj_id) conditions.push(`rodzaj_id = ${req.query.rodzaj_id}`);
    if(req.query.typ) conditions.push(`typ = ${req.query.typ}`);
    if(req.query.wybrakowanie) conditions.push(`wybrakowanie = ${req.query.wybrakowanie}`);

    // if there are conditions add them, else don't
    if(conditions.length > 0) query += " WHERE " + conditions.join(" AND ");

    // return query response from database
    db.query(query , (err, result)=> {
        if(err)
            console.error(err)
        else``
            res.send(result)
    });
});

// update rekordy
app.put('/dane_rekordy/update/:id', (req,res) => {
    const id = req.params.id;
    const sql = 'UPDATE rekordy SET ? WHERE id = ?';
    const data = 
    db.query(sql,[req.body, id],(error) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error updating row rekordy');
        } else {
            res.send('Row rekordy updated successfully');
        }
    })
})

app.post('/dane_rekordy/create', (req,res) => {
    let sql;
    const { laborant_id, ilosc, nazwa, nr_inwentarzowy, rodzaj_id, typ, wybrakowanie, uzytkownik_id, miejsce_id } = req.body;

    if (uzytkownik_id && miejsce_id) {
        sql = `INSERT INTO rekordy (laborant_id, ilosc, miejsce_id, nazwa, nr_inwentarzowy, uzytkownik_id, rodzaj_id, typ, wybrakowanie) `
        + `VALUES (${laborant_id}, ${ilosc}, ${miejsce_id}, '${nazwa}', '${nr_inwentarzowy}', ${uzytkownik_id}, ${rodzaj_id}, ${typ}, ${wybrakowanie})`;
    } 
    else if (uzytkownik_id && !miejsce_id) {
        sql = `INSERT INTO rekordy (laborant_id, ilosc, nazwa, nr_inwentarzowy, uzytkownik_id, rodzaj_id, typ, wybrakowanie) `
        + `VALUES (${laborant_id}, ${ilosc}, '${nazwa}', '${nr_inwentarzowy}', ${uzytkownik_id}, ${rodzaj_id}, ${typ}, ${wybrakowanie})`;
    } 
    else if (!uzytkownik_id && miejsce_id) {
        sql = `INSERT INTO rekordy (laborant_id, ilosc, miejsce_id, nazwa, nr_inwentarzowy, rodzaj_id, typ, wybrakowanie) `
        + `VALUES (${laborant_id}, ${ilosc}, ${miejsce_id}, '${nazwa}', '${nr_inwentarzowy}', ${rodzaj_id}, ${typ}, ${wybrakowanie})`;
    } 
    else {
        sql = `INSERT INTO rekordy (laborant_id, ilosc, nazwa, nr_inwentarzowy, rodzaj_id, typ, wybrakowanie) `
        + `VALUES (${laborant_id}, ${ilosc}, '${nazwa}', '${nr_inwentarzowy}', ${rodzaj_id}, ${typ}, ${wybrakowanie})`;
    }

    db.query(sql, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send('Error inserting row rekordy');
        } else {
          res.send('Row rekordy inserted successfully');
        }
      });
});

app.delete('/dane_rekordy/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM rekordy WHERE id = ${id}`;
    db.query(sql, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting row rekordy');
      } else {
        res.send('Row deleted successfully rekordy');
      }
    });
  })





// run server
app.listen(3001, ()=> {
    console.log("Your server is running!");
})