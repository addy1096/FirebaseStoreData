window.addEventListener("DOMContentLoaded", function () {
  console.log("Ready!");

  const form = document.getElementById("form");
  const firstNameEl = document.getElementById("firstName");
  const lastNameEl = document.getElementById("lastName");
  const usersEl = document.getElementById("users");
  const db = firebase.firestore();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (firstNameEl.value && lastNameEl.value) {
      addUser(firstNameEl.value, lastNameEl.value);
    }
  });

  function addUser(first, last) {
    console.log(first, last);
    db.collection("Users")
      .add({
        firstName: first,
        lastName: last,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log("Document added with ID:", docRef.id);
        getUsers();
      })
      .catch((err) => console.log("err", err));
  }

    function getUsers() {
      db.collection("Users")
        .orderBy("timestamp")
        .get()
        .then((querySnapshot) => {
          let output = "";
          querySnapshot.forEach((doc) => {
            output += `<li>${doc.data().firstName} ${doc.data().lastName}</li>`;
          });
          console.log("output", output);
          usersEl.innerHTML = output;
        })
        .catch((err) => console.log("err", err));
    }
    getUsers();

  db.collection("Users")
    .orderBy("timestamp")
    .onSnapshot(function (querySnapshot) {
      let output = "";
      querySnapshot.forEach((doc) => {
        output += `<li>${doc.data().firstName} ${doc.data().lastName}</li>`;
      });
      console.log("output", output);
      usersEl.innerHTML = output;
    });
});
