var amount = 0;
var chart;
var dps = [];

var firebaseConfig = {
  apiKey: "AIzaSyD3FC_NNJxXk1FbK0ZSTVrisUUZzhLTOU8",
  authDomain: "kyodomkyororoot.firebaseapp.com",
  databaseURL: "https://kyodomkyororoot.firebaseio.com",
  projectId: "kyodomkyororoot",
  storageBucket: "kyodomkyororoot.appspot.com",
  messagingSenderId: "608389911451",
  appId: "1:608389911451:web:54a69013b9bd8806"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function buttonClicked() {
  let amount = Number(document.getElementById("amount").value);
  let time = (new Date).getTime();

  dps.push({ 
    y: amount,
    x: new Date(time),
  });

  db.collection("banking_data").add({
    Amountperdate: amount,
    date_added: time
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      
      chart.render();
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });

}

window.onload = function () {
  console.log("loading database");

  db.collection("banking_data").get().then((results) => {
    dps = results.docs.map(doc => {
      let target = Object.assign({}, { 
        y: doc.data().Amountperdate,
        x: new Date(doc.data().date_added),
      });
      console.log(target);
      return target;
    });

    chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Money Saved"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    });

    chart.render();
  });

}